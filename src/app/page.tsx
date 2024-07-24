import { HydrateClient } from "@/trpc/server";
import Navbar from "./_components/navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";
import Footer from "./_components/footer/Footer";
import VideoContent from "./_components/videoContent/VideoContent";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <VideoContent />
        </div>
        <Footer />
        <Toaster />
      </main>
    </HydrateClient>
  );
}
