import { ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const allTasks = await prisma.task.findMany();
    return ok(allTasks);
  } catch (error) {
    log(error);
    return serverError();
  }
}
