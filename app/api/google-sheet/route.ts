// app/api/google-sheet/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";

function getServiceAccountCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set.");
  }
  return JSON.parse(raw) as {
    client_email: string;
    private_key: string;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, message, company } = body as {
      name?: string;
      phone?: string;
      service?: string;
      message?: string;
      company?: string; // honeypot
    };

    // If the honeypot field is filled, it's almost certainly a bot.
    // Return success without writing anything, so the bot doesn't learn to adapt.
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { ok: false, error: "A valid phone number is required." },
        { status: 400 },
      );
    }
    if (!service?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Please select a service." },
        { status: 400 },
      );
    }

    const { client_email, private_key } = getServiceAccountCredentials();

    const auth = new google.auth.JWT({
      email: client_email,
      key: private_key, // already a real multi-line string after JSON.parse — no manual replace needed
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E", // adjust the tab name if yours isn't "Sheet1"
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name.trim(),
            phone.trim(),
            service.trim(),
            (message ?? "").trim(),
            new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
