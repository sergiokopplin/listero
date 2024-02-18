import { ok, serverError } from "@/lib/http-response";
import { log } from "@/lib/log";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const parsed = Project.parse(await req.json());
    const created = await prisma.project.create({
      data: parsed,
    });

    return ok(created);
  } catch (error) {
    log(error);
    return serverError();
  }
}
