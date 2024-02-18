import { z } from "zod";

export const Task = z.object({
  completed: z.boolean(),
  title: z.string(),
});
