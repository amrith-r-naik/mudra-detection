// src/server/api/routers/predict.ts
import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const predictRouter = createTRPCRouter({
  classify: publicProcedure
    .input(
      z.object({
        imageUrl: z.string(), // Base64 string
      }),
    )
    .mutation(async ({ input }) => {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({ image: input.imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = (await res.json()) as { class: string; confidence: number };
      return data;
    }),
});
