import { getSiteConfig } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetails from '@/components/ServiceDetails';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function ServicesPage() {
  const config = getSiteConfig();

  return (
    <>
      <Header config={config} />

      {/* Page Header */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide comprehensive assistance to help you navigate through cyber fraud incidents
              and ensure your rights are protected.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <ServiceDetails config={config} />

      {/* FAQ Section */}
      <FAQ config={config} />

      {/* CTA Section */}
      <CTA config={config} />

      <Footer config={config} />
    </>
  );
}
