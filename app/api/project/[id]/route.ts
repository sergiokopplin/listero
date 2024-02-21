import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";
import { ProjectValidation } from "@/lib/validation/project-validation";
import { LogPrismaRepository } from "@/lib/db/repository/log-repository";

const repository = new ProjectPrismaRepository();
const logRepository = new LogPrismaRepository();
const validation = new ProjectValidation();

export async function GET(_: Request, context: { params: { id: string } }) {
  try {
    const data = context.params.id;
    await validation.selectById(data);
    const selected = await repository.selectById(data);
    if (!selected) return notFound();
    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    const data = context.params.id;
    await validation.deleteById(data);
    const deleted = await repository.deleteById(data);
    if (!deleted) return notFound();
    await logRepository.create({
      action: "DELETE",
      entityId: data,
      entityType: "PROJECT",
    });
    return ok(deleted);
  } catch (error) {
    log(error);
    return serverError();
  }
}
