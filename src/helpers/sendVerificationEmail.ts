import { resend } from "@/lib/resend";

import VerificationEmail from "../../components/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
        success: true,
        message: 'Verification email sent'
    }
  } catch (emailError) {
    console.log("Error sending verifiation email", emailError);
    return {
      success: false,
      message: "Error sending verification email",
    };
  }
}
