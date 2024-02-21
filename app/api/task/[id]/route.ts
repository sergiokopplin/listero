import { TaskPrismaRepository } from "@/lib/db/repository/task-repository";
import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { TaskValidation } from "@/lib/validation/task-validation";

const repository = new TaskPrismaRepository();
const validation = new TaskValidation();

export async function GET(_: Request, context: { params: { id: string } }) {
  try {
    const data = context.params.id;

    await validation.selectByProjectId(data);
    const selected = await repository.selectById(data);

    if (!selected) return notFound();
    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
