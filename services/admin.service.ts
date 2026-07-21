"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminStats() {
  const supabase = await createClient();

  // Get total counts
  const { count: userCount } = await supabase.from("users").select("*", { count: "exact", head: true });
  const { count: propertyCount } = await supabase.from("properties").select("*", { count: "exact", head: true });
  const { count: blogCount } = await supabase.from("blogs").select("*", { count: "exact", head: true });
  const { count: messageCount } = await supabase.from("messages").select("*", { count: "exact", head: true });

  // Get recent activity
  const { data: recentUsers } = await supabase
    .from("users")
    .select("id, name, email, avatar_url, created_at, is_blocked")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentProperties } = await supabase
    .from("properties")
    .select("id, title, location, price_per_month, image_urls, is_active")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentBlogs } = await supabase
    .from("blogs")
    .select("id, title, author_id, created_at, is_published, users(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  // Chart data: past 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString();

  const [propData, userData, blogData, msgData] = await Promise.all([
    supabase.from("properties").select("created_at").gte("created_at", sixMonthsAgoStr),
    supabase.from("users").select("created_at").gte("created_at", sixMonthsAgoStr),
    supabase.from("blogs").select("created_at").gte("created_at", sixMonthsAgoStr),
    supabase.from("messages").select("created_at").gte("created_at", sixMonthsAgoStr)
  ]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIdx = new Date().getMonth();
  
  const chartLabels: string[] = [];
  for (let i = 5; i >= 0; i--) {
      let m = currentMonthIdx - i;
      if (m < 0) m += 12;
      chartLabels.push(months[m]);
  }

  const chartData = {
      labels: chartLabels,
      properties: Array(6).fill(0),
      users: Array(6).fill(0),
      blogs: Array(6).fill(0),
      messages: Array(6).fill(0),
  };

  const processData = (data: { created_at: string }[] | null, targetArray: number[]) => {
      if (!data) return;
      data.forEach(item => {
          const mIdx = new Date(item.created_at).getMonth();
          const labelIdx = chartLabels.indexOf(months[mIdx]);
          if (labelIdx !== -1) {
              targetArray[labelIdx]++;
          }
      });
  };

  processData(propData.data, chartData.properties);
  processData(userData.data, chartData.users);
  processData(blogData.data, chartData.blogs);
  processData(msgData.data, chartData.messages);

  return {
    counts: {
      users: userCount || 0,
      properties: propertyCount || 0,
      blogs: blogCount || 0,
      messages: messageCount || 0,
    },
    activities: {
      users: recentUsers || [],
      properties: recentProperties || [],
      blogs: recentBlogs || [],
    },
    chartData
  };
}

export async function getAllUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*, properties(id), blogs(id)")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function blockUser(userId: string, isBlocked: boolean, reason?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update({ 
      is_blocked: isBlocked, 
      blocked_reason: isBlocked ? reason : null,
      updated_at: new Date().toISOString()
    })
    .eq("id", userId);
  
  if (error) throw error;
  return data;
}

export async function deleteUser(userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);
  
  if (error) throw error;
  return true;
}

export async function getUserDetails(userId: string) {
  const supabase = await createClient();
  
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) throw userError;

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", userId);

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", userId);

  return {
    ...user,
    properties: properties || [],
    blogs: blogs || []
  };
}

export async function getPlatformAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("name, phone_number, email, avatar_url")
    .eq("role", "admin")
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getLoggedInUserStatus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("is_blocked, blocked_reason, role")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data;
}
