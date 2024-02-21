import { z } from "zod";

export const Task = z.object({
  id: z.string().optional(),
  completed: z.boolean(),
  title: z.string(),
  projectId: z.string(),
});

export const Project = z.object({
  id: z.string().optional(),
  title: z.string(),
});
