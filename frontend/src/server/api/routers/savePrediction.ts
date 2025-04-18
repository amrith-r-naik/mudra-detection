import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const savePredictionRouter = createTRPCRouter({
  save: publicProcedure
    .input(
      z.object({
        userId: z.string(), // ID of the user making the prediction
        result: z.string(), // Prediction result (e.g., class name or label)
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, result } = input;

      // Save the prediction to the database
      const prediction = await ctx.db.prediction.create({
        data: {
          userId,
          result,
        },
      });

      return prediction;
    }),
});
