"use server";

import { revalidatePath } from "next/cache";
import { createTeamOrderInquiry } from "@/lib/teamOrders";

export async function submitTeamOrderAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const organization = String(formData.get("organization") || "").trim();
  const contactName = String(formData.get("contactName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const sport = String(formData.get("sport") || "").trim();
  const rosterSize = String(formData.get("rosterSize") || "").trim();

  if (!organization || !contactName || !email || !sport || !rosterSize) {
    return { success: false, message: "Please fill in all required fields." };
  }

  createTeamOrderInquiry({
    organization,
    contactName,
    email,
    phone: String(formData.get("phone") || ""),
    sport,
    rosterSize,
    targetDate: String(formData.get("targetDate") || ""),
    currentSupplier: String(formData.get("currentSupplier") || ""),
    message: String(formData.get("message") || ""),
  });

  revalidatePath("/admin/team-orders");
  return {
    success: true,
    message: "Thanks — we'll follow up within 2 business days with next steps and, where relevant, a sample timeline.",
  };
}
