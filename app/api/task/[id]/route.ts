import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Task } from "@/lib/types";

// TODO: move to repository

export async function GET(_: Request, context: { params: { id: number } }) {
  try {
    const parsed = Task.pick({ id: true }).parse({
      id: Number(context.params.id),
    });
    const selected = await prisma.task.findFirst({
      where: {
        id: parsed.id,
      },
    });

    if (!selected) {
      return notFound();
    }

    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
