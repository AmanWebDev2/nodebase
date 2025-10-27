import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

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

const google = createGoogleGenerativeAI();
const anthropic = createAnthropic();
const openai = createOpenAI();

export const execute = inngest.createFunction(
  {
    id: "executre-ai",
  },
  {
    event: "execute/ai",
  },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "you are a helpful assistant",
        prompt: "what is 2+2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-5"),
        system: "you are a helpful assistant",
        prompt: "what is 2+2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-opus-4-1"),
        system: "you are a helpful assistant",
        prompt: "what is 2+2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
