import { LogPrismaRepository } from "@/lib/db/repository/log-repository";
import { TaskPrismaRepository } from "@/lib/db/repository/task-repository";
import { ok, created, serverError, notFound } from "@/lib/http-response";
import { log } from "@/lib/log";
import { TaskValidation } from "@/lib/validation/task-validation";

const repository = new TaskPrismaRepository();
const logRepository = new LogPrismaRepository();
const validation = new TaskValidation();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await validation.create(data);
    const create = await repository.create(data);
    if (!create) return notFound();
    await logRepository.create({
      action: "CREATE",
      entityId: create.id,
      entityType: "TASK",
    });
    return created(create);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    await validation.update(data);
    const updated = await repository.update(data);
    if (!updated) return notFound();
    await logRepository.create({
      action: "UPDATE",
      entityId: updated.id,
      entityType: "TASK",
    });
    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}
