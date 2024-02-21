import { Project, Task } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type TaskType = z.infer<typeof Task>;

export class TaskPrismaRepository {
  async create({
    title,
    projectId,
    completed,
  }: {
    title: string;
    projectId: string;
    completed: boolean;
  }): Promise<TaskType | null> {
    const parsed = Task.pick({
      completed: true,
      projectId: true,
      title: true,
    }).parse({ title, projectId, completed });
    return await prisma.task.create({
      data: parsed,
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
  }): Promise<TaskType | null> {
    const parsed = Task.pick({ title: true, completed: true }).parse({
      title,
      completed,
    });
    return await prisma.task.update({
      where: {
        id: id,
      },
      data: parsed,
    });
  }

  async deleteById({ id }: { id: string }): Promise<TaskType | null> {
    const parsed = Task.pick({ id: true }).parse({ id });
    return await prisma.task.delete({
      where: {
        id: parsed.id,
      },
    });
  }

  async selectById(id: string): Promise<TaskType | null> {
    const parsed = Task.pick({ id: true }).parse({ id });
    return await prisma.task.findFirst({
      where: {
        id: parsed.id,
      },
    });
  }

  async selectByProjectId(projectId: string): Promise<TaskType[] | null> {
    const parsed = Project.pick({ id: true }).parse({
      id: projectId,
    });
    return await prisma.task.findMany({
      where: {
        projectId: parsed.id,
      },
    });
  }
}
