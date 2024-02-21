import * as Types from "@/lib/types";
import { z } from "zod";

type TaskType = z.infer<typeof Types.TaskValidation>;

export class TaskValidation {
  async create({
    title,
    projectId,
    completed,
  }: {
    title: string;
    projectId: string;
    completed: boolean;
  }): Promise<TaskType> {
    return Types.TaskValidation.pick({
      completed: true,
      projectId: true,
      title: true,
    }).parse({ title, projectId, completed });
  }

  async update({
    id,
    title,
    completed,
  }: {
    id: string;
    title: string;
    completed: boolean;
  }): Promise<Pick<TaskType, "completed" | "title">> {
    return Types.TaskValidation.pick({ title: true, completed: true }).parse({
      title,
      completed,
    });
  }

  async deleteById({ id }: { id: string }): Promise<Pick<TaskType, "id">> {
    return Types.TaskValidation.pick({ id: true }).parse({ id });
  }

  async selectById(id: string): Promise<Pick<TaskType, "id">> {
    return Types.TaskValidation.pick({ id: true }).parse({ id });
  }

  async selectByProjectId(projectId: string): Promise<Pick<TaskType, "id">> {
    return Types.ProjectValidation.pick({ id: true }).parse({
      id: projectId,
    });
  }
}
