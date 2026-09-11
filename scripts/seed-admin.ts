/**
 * Promote a user to admin by email.
 *
 * Usage: npm run seed:admin
 *
 * The user must already exist in auth (e.g. signed in once with Google).
 * Change ADMIN_EMAIL below to seed a different account.
 */
import { createClient } from "@supabase/supabase-js";
import { cred } from "../lib/cred";

// ── set the admin email here ──────────────────────────────────────────────
const ADMIN_EMAIL = "rameshadhikari579@gmail.com";
// ─────────────────────────────────────────────────────────────────────────

async function seedAdmin() {
  const url = cred.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = cred.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing Supabase URL or service role key in lib/cred.ts");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const email = ADMIN_EMAIL.trim().toLowerCase();
  console.log(`Seeding admin for: ${email}`);

  // 1. Prefer an existing public.users row
  const { data: existing, error: findError } = await supabase
    .from("users")
    .select("id, email, name, role")
    .ilike("email", email)
    .maybeSingle();

  if (findError) {
    console.error("Failed to look up public.users:", findError.message);
    process.exit(1);
  }

  if (existing) {
    if (existing.role === "admin") {
      console.log(`Already admin: ${existing.email} (${existing.id})`);
      return;
    }

    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update({ role: "admin", updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select("id, email, name, role")
      .single();

    if (updateError) {
      console.error("Failed to promote user:", updateError.message);
      process.exit(1);
    }

    console.log(`Promoted to admin: ${updated.email} (${updated.id})`);
    return;
  }

  // 2. Not in public.users — find them in auth.users and create the row
  const { data: authList, error: authError } =
    await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (authError) {
    console.error("Failed to list auth users:", authError.message);
    process.exit(1);
  }

  const authUser = authList.users.find(
    (u) => (u.email || "").toLowerCase() === email
  );

  if (!authUser) {
    console.error(
      `No user found for ${email}.\n` +
        `Sign in once with Google using that email, then run: npm run seed:admin`
    );
    process.exit(1);
  }

  const metadata = authUser.user_metadata || {};
  const { data: created, error: insertError } = await supabase
    .from("users")
    .upsert(
      {
        id: authUser.id,
        google_id: authUser.id,
        email: authUser.email,
        name: metadata.full_name || metadata.name || email.split("@")[0],
        avatar_url: metadata.avatar_url || metadata.picture || null,
        role: "admin",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("id, email, name, role")
    .single();

  if (insertError) {
    console.error("Failed to create admin user row:", insertError.message);
    process.exit(1);
  }

  console.log(`Created admin: ${created.email} (${created.id})`);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
