import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";

// TODO: move to repository

export async function GET(
  _: Request,
  context: { params: { projectId: string } }
) {
  try {
    const parsed = Project.pick({ id: true }).parse({
      id: Number(context.params.projectId),
    });
    const selected = await prisma.task.findMany({
      where: {
        projectId: parsed.id,
      },
    });

    if (!selected) {
      return notFound();
    }

    return ok(selected);
  } catch (error) {
    log(error);
    return serverError();
  }
}
