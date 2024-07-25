import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adMarkerRouter = createTRPCRouter({
  createNewMarker: publicProcedure
    .input(
      z.object({
        episodeId: z.string(),
        adMarkerType: z.enum(["Auto", "Static", "A/B"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.adMarker.create({
        data: {
          adMarkerType: input.adMarkerType,
          episodeId: input.episodeId,
        },
      });
    }),

  getAdMarkersByEpisode: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const adMarkers = await ctx.db.adMarker.findMany({
        where: { episodeId: input.id },
      });
      return adMarkers;
    }),

  getAllMarkers: publicProcedure.query(async ({ ctx }) => {
    const adMarkers = await ctx.db.adMarker.findMany({
      include: {
        episode: true,
      },
    });
    return adMarkers;
  }),

  deleteMarker: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.adMarker.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateMarker: publicProcedure
    .input(
      z.object({
        id: z.string(),
        episodeId: z.string().optional(),
        adMarkerType: z.enum(["Auto", "Static", "A/B"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedMarker = await ctx.db.adMarker.update({
          where: {
            id: input.id,
          },
          data: {
            episodeId: input.episodeId,
            adMarkerType: input.adMarkerType,
          },
        });

        return updatedMarker;
      } catch (error) {
        throw new Error(`Failed to update marker with ID ${input.id}.`);
      }
    }),
});
