import { SiteConfig } from '@/lib/types';

interface MissionProps {
  config: SiteConfig;
}

export default function Mission({ config }: MissionProps) {
  // Check if about data exists
  if (!config.about?.mission || !config.about?.values) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600">Mission content is loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mission Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{config.about.mission.title}</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>{config.about.mission.description}</p>
              <p>{config.about.mission.vision}</p>
              <p>{config.about.mission.goal}</p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Our Values</h3>
            <div className="space-y-6">
              {config.about.values.map((value, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold text-blue-700 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
