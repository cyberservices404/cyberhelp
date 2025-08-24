import { Metadata } from 'next';
import { getSiteConfig } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// @ts-ignore
import Mission from '@/components/Mission';
// @ts-ignore
import Team from '@/components/Team';
// @ts-ignore
import Partnerships from '@/components/Partnerships';
// @ts-ignore
import AboutTestimonials from '@/components/AboutTestimonials';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'About Us - CyberHelp Desk',
  description: 'Learn about our mission, team, and commitment to helping victims of cyber fraud.',
};

export default function AboutPage() {
  const config = getSiteConfig();

  // Error handling for missing about data
  if (!config.about) {
    return (
      <>
        <Header config={config} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-gray-600">Content is being loaded...</p>
          </div>
        </div>
        <Footer config={config} />
      </>
    );
  }

  return (
    <>
      <Header config={config} />

      {/* Page Header */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Learn about our mission, team, and commitment to helping victims of cyber fraud.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Mission config={config} />

      {/* Team Section */}
      <Team config={config} />

      {/* Partnerships Section */}
      <Partnerships config={config} />

      {/* Client Testimonials */}
      <AboutTestimonials config={config} />

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Us?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our expert team is ready to assist you with any cyber fraud related concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </a>
            <a
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer config={config} />
    </>
  );
}
