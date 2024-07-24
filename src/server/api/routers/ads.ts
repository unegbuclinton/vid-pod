import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adsRouter = createTRPCRouter({
  createAds: publicProcedure
    .input(
      z.object({
        company: z.string(),
        url: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ads.create({
        data: {
          company: input.company,
          url: input.url,
          name: input.name,
        },
      });
    }),

  getAllAds: publicProcedure.query(async ({ ctx }) => {
    const allAds = await ctx.db.ads.findMany({
      select: {
        company: true,
        id: true,
        name: true,
        url: true,
      },
    });
    const groupedAds = allAds.reduce(
      (acc, ad) => {
        if (!acc[ad.company]) {
          acc[ad.company] = [];
        }

        acc[ad.company]!.push({
          name: ad.name,
          url: ad.url,
        });

        return acc;
      },
      {} as Record<string, { name: string; url: string }[]>,
    );
    return groupedAds;
  }),

  //   getAdMarkersByEpisode: publicProcedure
  //     .input(z.object({ id: z.number() }))
  //     .query(async ({ input, ctx }) => {
  //       const adMarkers = await ctx.db.adMarker.findMany({
  //         where: { episodeId: input.id },
  //       });
  //       return adMarkers;
  //     }),

  //   getAllMarkers: publicProcedure.query(async ({ ctx }) => {
  //     const adMarkers = await ctx.db.adMarker.findMany({
  //       include: {
  //         episode: true,
  //       },
  //     });
  //     return adMarkers;
  //   }),

  //   deleteMarker: publicProcedure
  //     .input(z.object({ id: z.number() }))
  //     .mutation(async ({ ctx, input }) => {
  //       return ctx.db.adMarker.delete({
  //         where: {
  //           id: input.id,
  //         },
  //       });
  //     }),

  //   updateMarker: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.number(),
  //         episodeId: z.number().optional(),
  //         adMarkerType: z.enum(["Auto", "Static", "A/B"]).optional(),
  //       }),
  //     )
  //     .mutation(async ({ ctx, input }) => {
  //       try {
  //         const updatedMarker = await ctx.db.adMarker.update({
  //           where: {
  //             id: input.id,
  //           },
  //           data: {
  //             episodeId: input.episodeId,
  //             adMarkerType: input.adMarkerType,
  //           },
  //         });

  //         return updatedMarker;
  //       } catch (error) {
  //         throw new Error(`Failed to update marker with ID ${input.id}.`);
  //       }
  //     }),
});
