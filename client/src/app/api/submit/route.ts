import { NextResponse } from "next/server";
import * as crypto from "crypto";

const FAKE_DB: any[] = [];

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

function encrypt(text: string) {
  if (!ENCRYPTION_KEY) return;

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phoneNo, age, gender, answers } = body;
    if (!name || !email || !answers) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("sata received :" , body)

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    const encryptedPhone = phoneNo ? encrypt(phoneNo) : null;
    const encryptedEmail = encrypt(cleanEmail);

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

    console.log("this is saved in db :" , record)

    return NextResponse.json(
      { success: true, message: "Data securely saved!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
