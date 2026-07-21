import { redirect } from "next/navigation";

export default function DashboardIndex() {
  redirect("/user/dashboard/overview");
}
