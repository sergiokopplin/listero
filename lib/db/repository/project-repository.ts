import { Project } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ProjectType = z.infer<typeof Project>;

export class ProjectPrismaRepository {
  async selectById(id: string): Promise<ProjectType | null> {
    const parsed = Project.pick({ id: true }).parse({
      id: Number(id),
    });
    const selected = await prisma.project.findFirst({
      where: {
        id: parsed.id,
      },
    });

    if (!selected) return null;
    return selected;
  }
}
