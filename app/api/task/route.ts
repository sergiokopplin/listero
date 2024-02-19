import { ok, created, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Task } from "@/lib/types";

// TODO: move to repository

export async function POST(req: Request) {
  try {
    const parsed = Task.parse(await req.json());
    const create = await prisma.task.create({
      data: parsed,
    });

    return created(create);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const parsed = Task.pick({ id: true, title: true, completed: true }).parse(
      await req.json()
    );
    const updated = await prisma.task.update({
      where: {
        id: parsed.id,
      },
      data: parsed,
    });

    return ok(updated);
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
