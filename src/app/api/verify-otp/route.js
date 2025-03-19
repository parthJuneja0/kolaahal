import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        if (!otpStorage[email]) {
            return NextResponse.json({ error: "OTP expired or invalid" }, { status: 400 });
        }

        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

        if (hashedOtp === otpStorage[email].hash && Date.now() < otpStorage[email].expiresAt) {
            delete otpStorage[email]; // Remove OTP after verification
            return NextResponse.json({ message: "OTP verified, login successful" }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
    }
}