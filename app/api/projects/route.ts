import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";
import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";

const repository = new ProjectPrismaRepository();

export async function GET() {
  try {
    const selected = await repository.findAll();
    if (!selected) return notFound();
    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
