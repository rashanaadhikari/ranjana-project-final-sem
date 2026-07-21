-- ============================================================
-- SS Rental – Admin RLS Policies
-- Run this in your Supabase SQL Editor to enable Admin Dashboard data visibility
-- ============================================================

-- 1. Create a helper function to safely check for admin status without recursion
-- We use SECURITY DEFINER so that the function runs with the privileges of the creator
CREATE OR REPLACE FUNCTION authorize_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update Users Table Policies
-- Existing policy: "Users can view own data"
-- New policy: "Admins can view and manage all users"
CREATE POLICY "Admins can view all users" ON users 
  FOR SELECT TO authenticated USING (authorize_admin());

CREATE POLICY "Admins can update all users" ON users 
  FOR UPDATE TO authenticated USING (authorize_admin());

CREATE POLICY "Admins can delete all users" ON users 
  FOR DELETE TO authenticated USING (authorize_admin());


-- 3. Update Properties Table Policies
-- Allow admins to see even inactive properties
CREATE POLICY "Admins can view all properties" ON properties 
  FOR SELECT TO authenticated USING (authorize_admin());

CREATE POLICY "Admins can manage all properties" ON properties 
  FOR ALL TO authenticated USING (authorize_admin());


-- 4. Update Blogs Table Policies
-- Allow admins to see unpublished blogs
CREATE POLICY "Admins can view all blogs" ON blogs 
  FOR SELECT TO authenticated USING (authorize_admin());

CREATE POLICY "Admins can manage all blogs" ON blogs 
  FOR ALL TO authenticated USING (authorize_admin());

-- 5. Verification: List current policies (Optional)
-- SELECT * FROM pg_policies WHERE schemaname = 'public';
