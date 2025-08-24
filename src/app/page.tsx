import { getSiteConfig } from '@/lib/config';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ReportForm';
import Services from '@/components/Services';
import HowWeHelp from '@/components/HowWeHelp';
import Testimonials from '@/components/Testimonials';
import Resources from '@/components/Resources';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  const config = getSiteConfig();

  return (
    <div className="min-h-screen bg-white">
      <Header config={config} />
      <Hero config={config} />
      <ContactForm/>
      <Services config={config} />
      <HowWeHelp config={config} />
      <Testimonials config={config} />
      <Resources config={config} />
      <CTA config={config} />
      <Footer config={config} />
    </div>
  );
}
