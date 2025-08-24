import Link from 'next/link';
import Image from 'next/image';
import { SiteConfig } from '@/lib/types';

interface HeroProps {
  config: SiteConfig;
}

export default function Hero({ config }: HeroProps) {
  return (
    <section className="bg-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{config.site.tagline}</h1>
            <p className="text-xl mb-8 text-blue-100">{config.site.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/report"
                className="bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Report an Incident
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-700 transition-colors text-center"
              >
                Contact Support
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{config.stats.success_rate}</div>
                <div className="text-blue-200">Successful Case Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{config.stats.cases_handled}</div>
                <div className="text-blue-200">Cases Handled</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1588058365815-c96ac30ee30f?w=600&auto=format&fit=crop&q=80"
              alt="Cybersecurity Protection"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
