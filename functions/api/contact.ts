export interface Env {
  RESEND_API_KEY: string;
}

type PagesContext = {
  request: Request;
  env: Env;
};

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildLeadEmail = ({
  name,
  email,
  message,
  submittedAt,
  source,
}: {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  source: string;
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const safeSubmittedAt = escapeHtml(submittedAt);
  const safeSource = escapeHtml(source);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f5f0e0;color:#14201a;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fbf7ea;border:2px solid #14201a;border-radius:12px;box-shadow:6px 6px 0 #14201a;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px 20px;border-bottom:2px solid #14201a;background:#f8f1dc;">
                <img src="https://krishmishra.pages.dev/og-image.svg" alt="Krish Mishra Portfolio" width="120" style="display:block;max-width:120px;height:auto;margin-bottom:18px;">
                <h1 style="margin:0;font-size:26px;line-height:1.2;color:#14201a;">New Lead from Krish Mishra Portfolio</h1>
                <p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:#5a5f5a;">A visitor submitted the contact form.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a5f5a;">Name</p>
                <p style="margin:0 0 22px;font-size:18px;line-height:1.5;color:#14201a;">${safeName}</p>

                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a5f5a;">Email</p>
                <p style="margin:0 0 22px;font-size:18px;line-height:1.5;color:#14201a;"><a href="mailto:${safeEmail}" style="color:#e85d3a;text-decoration:none;">${safeEmail}</a></p>

                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a5f5a;">Project Details</p>
                <div style="margin:0 0 24px;padding:18px;background:#f5f0e0;border:1.5px solid #14201a;border-radius:8px;font-size:16px;line-height:1.7;color:#14201a;">${safeMessage}</div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d8cfb8;padding-top:18px;">
                  <tr>
                    <td style="padding:0 0 10px;">
                      <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a5f5a;">Submitted at</p>
                      <p style="margin:0;font-size:14px;color:#14201a;">${safeSubmittedAt}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a5f5a;">Source</p>
                      <p style="margin:0;font-size:14px;color:#14201a;">${safeSource}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const onRequestGet = async () => {
  return json({ success: false, error: "Method not allowed" }, { status: 405 });
};

const handleContactRequest = async (request: Request, env: Env) => {
  try {
    if (request.method !== "POST") {
      return json({ success: false, error: "Method not allowed" }, { status: 405 });
    }

    if (!env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return json(
        { success: false, error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      return json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const source = new URL(request.url).hostname;
    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["krishmishra4444@gmail.com"],
        reply_to: email,
        subject: "New Lead from Krish Mishra Portfolio",
        html: buildLeadEmail({ name, email, message, submittedAt, source }),
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error("Resend API error:", err);
      return json(
        { success: false, error: err || "Failed to send message" },
        { status: resendRes.status }
      );
    }

    return json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
};

export const onRequestPost = async ({ request, env }: PagesContext) =>
  handleContactRequest(request, env);

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/contact") {
      return json({ success: false, error: "Not found" }, { status: 404 });
    }

    return handleContactRequest(request, env);
  },
};
