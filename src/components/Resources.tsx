import Link from 'next/link';
import { SiteConfig } from '@/lib/types';

interface ResourcesProps {
  config: SiteConfig;
}

export default function Resources({ config }: ResourcesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cybersecurity Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest cyber threats and learn how to protect yourself online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{resource.title}</h3>
              <p className="text-gray-600 mb-6">{resource.description}</p>
              <Link
                href={resource.link}
                className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
