import { created, notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";
import { ProjectValidation } from "@/lib/validation/project-validation";
import { LogPrismaRepository } from "@/lib/db/repository/log-repository";

const repository = new ProjectPrismaRepository();
const logRepository = new LogPrismaRepository();
const validation = new ProjectValidation();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await validation.create(data);
    const create = await repository.create(data);
    await logRepository.create({
      action: "CREATE",
      entityId: create.id,
      entityType: "PROJECT",
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
      entityType: "PROJECT",
    });
    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}
