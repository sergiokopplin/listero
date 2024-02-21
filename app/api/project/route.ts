import { created, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";
import { ProjectValidation } from "@/lib/validation/project-validation";

const repository = new ProjectPrismaRepository();
const validation = new ProjectValidation();

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
    const updated = await repository.update(data);
    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}
