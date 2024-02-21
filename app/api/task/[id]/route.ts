import { TaskPrismaRepository } from "@/lib/db/repository/task-repository";
import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";

const repository = new TaskPrismaRepository();

export async function GET(_: Request, context: { params: { id: string } }) {
  try {
    const selected = await repository.selectById(context.params.id);
    if (!selected) return notFound();
    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
