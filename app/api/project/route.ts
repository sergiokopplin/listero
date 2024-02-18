import { created, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";

const repository = new ProjectPrismaRepository();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const create = await repository.create(data);
    return created(create);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const updated = await repository.update(data);
    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}
