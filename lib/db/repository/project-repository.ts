import { Project } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export class ProjectPrismaRepository {
  async create({ title }: { title: string }): Promise<Project | null> {
    const created = await prisma.project.create({
      data: {
        title,
      },
    });

    return created;
  }

  async update({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): Promise<Project | null> {
    const updated = await prisma.project.update({
      where: {
        id,
      },
      data: { id, title },
    });
    return updated;
  }

  async selectById(id: string): Promise<Project | null> {
    const selected = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!selected) return null;
    return selected;
  }

  async deleteById(id: string): Promise<Project | null> {
    await prisma.task.deleteMany({
      where: {
        projectId: id,
      },
    });
    const selectedProject = await prisma.project.delete({
      where: {
        id,
      },
    });

    if (!selectedProject) return null;
    return selectedProject;
  }

  async findAll(): Promise<Project[] | null> {
    return await prisma.project.findMany();
  }
}
