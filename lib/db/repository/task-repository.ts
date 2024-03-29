import { Task } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export class TaskPrismaRepository {
  async create({
    title,
    projectId,
    completed,
  }: {
    title: string;
    projectId: string;
    completed: boolean;
  }): Promise<(Task & { id: string }) | null> {
    const selected = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!selected) return null;
    return await prisma.task.create({
      data: {
        title,
        projectId,
        completed,
      },
    });
  }

  async update({
    id,
    title,
    completed,
  }: {
    id: string;
    title: string;
    completed: boolean;
  }): Promise<(Task & { id: string }) | null> {
    return await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        id,
        title,
        completed,
      },
    });
  }

  async deleteById(id: string): Promise<Task | null> {
    const selected = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!selected) return null;

    return await prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async selectById(id: string): Promise<Task | null> {
    return await prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async selectByProjectId(projectId: string): Promise<Task[] | null> {
    return await prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }
}
