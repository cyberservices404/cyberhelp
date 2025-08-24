import { SiteConfig } from '@/lib/types';

interface PartnershipsProps {
  config: SiteConfig;
}

export default function Partnerships({ config }: PartnershipsProps) {
  // Check if partnerships data exists
  if (!config.about?.partnerships || config.about.partnerships.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partnerships & Affiliations</h2>
          <p className="text-gray-600">Partnership information is loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partnerships & Affiliations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading organizations and authorities to ensure comprehensive
            support for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.about.partnerships.map((partnership, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{partnership.title}</h3>
              <p className="text-gray-600">{partnership.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
