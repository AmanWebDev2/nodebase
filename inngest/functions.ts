import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetch the video
    await step.sleep("wait-a-moment", "5s");

    // Transcribe the video
    await step.sleep("wait-a-moment", "5s");

    // AI
    await step.sleep("wait-a-moment", "8s");

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow from inngest",
        },
      });
    });
  }
);
