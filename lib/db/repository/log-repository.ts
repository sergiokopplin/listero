import { Log } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export class LogPrismaRepository {
  async create({ action, entityId, entityType }: Log): Promise<any> {
    console.log(action, entityId, entityType);
    return await prisma.auditLog.create({
      data: {
        action,
        entityId,
        entityType,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return await prisma.auditLog.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }
}
