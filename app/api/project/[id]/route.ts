import { notFound, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";

export async function GET(_: Request, context: { params: { id: number } }) {
  try {
    const parsed = Project.pick({ id: true }).parse({
      id: Number(context.params.id),
    });
    const selected = await prisma.project.findFirst({
      where: {
        id: parsed.id,
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
