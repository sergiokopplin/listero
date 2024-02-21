import { z } from "zod";

export interface Task {
  id?: string;
  completed: boolean;
  title: string;
  projectId: string;
}

export const TaskValidation = z.object({
  id: z.string().optional(),
  completed: z.boolean(),
  title: z.string(),
  projectId: z.string(),
});

export interface Project {
  id?: string;
  title: string;
}

export const ProjectValidation = z.object({
  id: z.string().optional(),
  title: z.string(),
});
