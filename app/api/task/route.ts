import { TaskPrismaRepository } from "@/lib/db/repository/task-repository";
import { ok, created, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { TaskValidation } from "@/lib/validation/task-validation";

const repository = new TaskPrismaRepository();
const validation = new TaskValidation();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await validation.create(data);

    return created(await repository.create(data));
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    await validation.update(data);

    return ok(await repository.update(data));
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    await validation.deleteById(data);
    await repository.deleteById(data);

    return ok({});
  } catch (error) {
    log(error);
    return serverError();
  }
}
