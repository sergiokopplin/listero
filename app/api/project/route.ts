import { created, ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const parsed = Project.parse(await req.json());
    const create = await prisma.project.create({
      data: parsed,
    });

    return created(create);
  } catch (error) {
    log(error);
    return serverError();
  }
}

export async function PUT(req: Request) {
  try {
    const parsed = Project.pick({ id: true, title: true }).parse(
      await req.json()
    );
    const updated = await prisma.project.update({
      where: {
        id: parsed.id,
      },
      data: parsed,
    });

    return ok(updated);
  } catch (error) {
    log(error);
    return serverError();
  }
}
