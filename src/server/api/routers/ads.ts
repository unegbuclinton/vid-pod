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
});
