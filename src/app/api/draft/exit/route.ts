import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const mode = await draftMode();
  mode.disable();
  redirect("/");
}
