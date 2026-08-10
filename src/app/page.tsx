import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Community from "@/components/Community";
import Marketplace from "@/components/Marketplace";
import Safety from "@/components/Safety";
import Fees from "@/components/Fees";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TabProvider } from "@/components/TabProvider";
import TabSection from "@/components/TabSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <TabProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TabSection tab="group">
          <Community />
        </TabSection>
        <TabSection tab="account">
          <Marketplace />
        </TabSection>
        <TabSection tab="middleman">
          <Process />
          <Safety />
          <Fees />
          <Contact />
        </TabSection>
      </main>
      <Footer />
    </TabProvider>
  );
}
