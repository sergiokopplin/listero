import { Project } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ProjectType = z.infer<typeof Project>;

// TODO: remove validation from repository

export class ProjectPrismaRepository {
  async create({ title }: { title: string }): Promise<ProjectType | null> {
    const parsed = Project.parse({ title });
    const created = await prisma.project.create({
      data: parsed,
    });

    return created;
  }

  async update({
    id,
    title,
  }: {
    id: number;
    title: string;
  }): Promise<ProjectType | null> {
    const parsed = Project.pick({ id: true, title: true }).parse({ id, title });
    const updated = await prisma.project.update({
      where: {
        id: parsed.id,
      },
      data: parsed,
    });
    return updated;
  }

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

  async deleteById(id: string): Promise<ProjectType | null> {
    const parsed = Project.pick({ id: true }).parse({
      id: Number(id),
    });
    await prisma.task.deleteMany({
      where: {
        projectId: parsed.id,
      },
    });
    const selectedProject = await prisma.project.delete({
      where: {
        id: parsed.id,
      },
    });

    if (!selectedProject) return null;
    return selectedProject;
  }
}
