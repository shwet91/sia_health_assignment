import { NextResponse } from "next/server";
import * as crypto from "crypto";

// In real apps: replace with a database connection (MongoDB, Postgres, etc.)
const FAKE_DB: any[] = [];

// Encryption setup (use env vars in production!)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "12345678901234567890123456789012"; // 32 chars
const IV_LENGTH = 16;

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ 1. Validate required fields
    const { name, email, phoneNo, age, gender, answers } = body;
    if (!name || !email || !answers) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ 2. Sanitize (basic example)
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    // ✅ 3. Encrypt sensitive fields
    const encryptedPhone = phoneNo ? encrypt(phoneNo) : null;
    const encryptedEmail = encrypt(cleanEmail);

    // ✅ 4. Save securely (here: push to fake DB, replace with real DB call)
    const record = {
      name: cleanName,
      email: encryptedEmail,
      phoneNo: encryptedPhone,
      age,
      gender,
      answers,
      createdAt: new Date(),
    };
    FAKE_DB.push(record);

    console.log("Saved record:", record); // For debugging only, remove in production

    // ✅ 5. Return success
    return NextResponse.json({ success: true, message: "Data securely saved!" }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
