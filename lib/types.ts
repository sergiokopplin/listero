import { z } from "zod";

export const Task = z.object({
  id: z.number().optional(),
  completed: z.boolean(),
  title: z.string(),
  projectId: z.number(),
});

export const Project = z.object({
  title: z.string(),
});
