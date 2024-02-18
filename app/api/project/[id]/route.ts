import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";
import { ProjectPrismaRepository } from "@/lib/db/repository/project-repository";

const repository = new ProjectPrismaRepository();

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

export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    const deleted = await repository.deleteById(context.params.id);
    if (!deleted) return notFound();
    return ok(deleted);
  } catch (error) {
    log(error);
    return serverError();
  }
}
