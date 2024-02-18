import { ok, serverError } from "@/lib/http-response";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/types";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const parsed = Project.parse(await req.json());
    const created = await prisma.project.create({
      data: parsed,
    });

    return ok(created);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    } else {
      console.log(error);
    }

    return serverError();
  }
}
