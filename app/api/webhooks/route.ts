import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { UserSchema } from "@/lib/definitions";
import { keysToCamel } from "@/lib/utils";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    // Parse user data
    const transformedEventData = keysToCamel(evt.data);
    const parseResult = UserSchema.safeParse(transformedEventData);
    if (!parseResult.success) {
      console.error(
        "Error: Event data does not match UserSchema:",
        parseResult.error
      );
      return new Response("Error: Zod data parsing error", {
        status: 400,
      });
    }

    const {
      id,
      username,
      emailAddresses: [{ emailAddress }],
    } = parseResult.data;

    // Create user in db
    try {
      await sql`
        INSERT INTO users (user_id, username, email)
        VALUES (${id}, ${username}, ${emailAddress})
      `;
    } catch (error) {
      console.error("Error: Could not create user in db:", error);
      return new Response("Error: Database error creating user", {
        status: 400,
      });
    }

    // Create default user tasks
    try {
      const date = new Date().toISOString();

      await sql`
        INSERT INTO user_tasks (user_id, task_id, date, completed)
        SELECT ${id}, id, ${date}, false
        FROM tasks;
      `;
    } catch (error) {
      console.error("Error: Could not create user tasks in db:", error);
      return new Response("Error: Database error creating user tasks", {
        status: 400,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
