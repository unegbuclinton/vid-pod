import { date, z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const episodeRouter = createTRPCRouter({
  createEpisode: publicProcedure
    .input(z.object({ url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.episode.create({
        data: {
          url: input.url,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }),

  getEpisodes: publicProcedure.query(async ({ ctx }) => {
    const episodes = await ctx.db.episode.findMany({
      include: {
        adMarkers: true,
      },
    });

    return episodes;
  }),
  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),

  // all_posts: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findMany();
  // }),
});
