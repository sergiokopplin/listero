import { LogPrismaRepository } from "@/lib/db/repository/log-repository";
import { ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";

const repository = new LogPrismaRepository();

export async function GET() {
  try {
    const selected = await repository.findAll();
    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
