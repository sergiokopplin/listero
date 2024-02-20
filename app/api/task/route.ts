import { TaskPrismaRepository } from "@/lib/db/repository/task-repository";
import { ok, created, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";

const repository = new TaskPrismaRepository();

export async function POST(req: Request) {
  try {
    const create = await repository.create(await req.json());
    return created(create);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const updated = await repository.update(await req.json());
    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function DELETE(req: Request) {
  try {
    await repository.deleteById(await req.json());
    return ok({});
  } catch (error) {
    log(error);
    return serverError();
  }
}
