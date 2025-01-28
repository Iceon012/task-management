import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DashboardPage from "./portal/dashboard/page"

export default async function Page() {
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }
  
  return <DashboardPage />
}

