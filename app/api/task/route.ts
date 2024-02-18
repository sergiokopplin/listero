import { ok, serverError } from "@/lib/http-response";
import { prisma } from "@/lib/prisma";
import { Task } from "@/lib/types";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const parsed = Task.parse(await req.json());
    const created = await prisma.task.create({
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
