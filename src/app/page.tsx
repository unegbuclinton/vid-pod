import { HydrateClient } from "@/trpc/server";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import VideoContent from "./_components/videoContent/VideoContent";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";

export default async function Home() {
  const SideBar = React.lazy(() => import("./_components/sidebar/Sidebar"));
  return (
    <HydrateClient>
      <main>
        <Navbar />
        <div className="flex">
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar />
          </Suspense>
          <VideoContent />
        </div>
        <Footer />
        <Toaster />
      </main>
    </HydrateClient>
  );
}
