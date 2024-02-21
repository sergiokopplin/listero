import * as Types from "@/lib/types";
import { z } from "zod";

type ProjectType = z.infer<typeof Types.ProjectValidation>;

export class ProjectValidation {
  async create({
    title,
  }: {
    title: string;
  }): Promise<Pick<ProjectType, "title">> {
    return Types.ProjectValidation.parse({ title });
  }

  async update({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): Promise<Pick<ProjectType, "id" | "title">> {
    return Types.ProjectValidation.pick({ id: true, title: true }).parse({
      id,
      title,
    });
  }

  async selectById(id: string): Promise<Pick<ProjectType, "id">> {
    return Types.ProjectValidation.pick({ id: true }).parse({ id });
  }

  async deleteById(id: string): Promise<Pick<ProjectType, "id">> {
    return Types.ProjectValidation.pick({ id: true }).parse({ id });
  }
}
