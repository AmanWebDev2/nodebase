import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    console.log(ctx);
    return prisma.account.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "aman@supamakers.com",
      },
    });
    return {
      success: true,
      message: "Job queued",
    };
  }),
  testAi: baseProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
