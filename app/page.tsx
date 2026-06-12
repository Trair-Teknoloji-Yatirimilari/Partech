import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Layers from "@/components/sections/Layers";
import HeatSim from "@/components/sections/HeatSim";
import Exploded from "@/components/sections/Exploded";
import Performance from "@/components/sections/Performance";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Layers />
      <HeatSim />
      <Exploded />
      <Performance />
      <Contact />
      <Footer />
    </main>
  );
}
