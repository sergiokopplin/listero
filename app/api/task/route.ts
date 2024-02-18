import { ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Task } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const parsed = Task.parse(await req.json());
    const created = await prisma.task.create({
      data: parsed,
    });

    return ok(created);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function DELETE(req: Request) {
  try {
    const parsed = Task.pick({ id: true }).parse(await req.json());
    const deleted = await prisma.task.delete({
      where: {
        id: parsed.id,
      },
    });

    return ok({ deleted: deleted.id });
  } catch (error) {
    log(error);
    return serverError();
  }
}
