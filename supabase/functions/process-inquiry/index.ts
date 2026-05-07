// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  try {
    const payload = await req.json();
    const { record } = payload;

    if (!record) {
      throw new Error("No record found in payload");
    }

    console.log("Processing inquiry for:", record.email);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mashbere <onboarding@resend.dev>",
        to: ["aphouseaphouse@gmail.com", "info@Jameesfood.com"],
        subject: `New Equipment Inquiry: ${record.equipment_interest}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h1 style="color: #708238;">New Equipment Inquiry</h1>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Customer Name:</strong> ${record.name}</p>
            <p><strong>Company:</strong> ${record.company || 'N/A'}</p>
            <p><strong>Email:</strong> ${record.email}</p>
            <p><strong>Phone:</strong> ${record.phone}</p>
            <p><strong>Equipment Interest:</strong> ${record.equipment_interest}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
              <strong>Message:</strong><br/>
              ${record.message || 'No message provided'}
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log("Resend API response:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error processing inquiry:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
