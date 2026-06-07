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
        subject: "New message from portfolio",
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
               <p><strong>Email:</strong> ${escapeHtml(email)}</p>
               <p><strong>Message:</strong></p>
               <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
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
