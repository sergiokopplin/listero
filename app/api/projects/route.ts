import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const selected = await prisma.project.findMany();

    if (!selected) {
      return notFound();
    }

    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
