import { SiteConfig } from '@/lib/types';

interface ServiceDetailsProps {
  config: SiteConfig;
}

export default function ServiceDetails({ config }: ServiceDetailsProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {config.detailed_services.map((service, index) => (
          <div key={service.id} id={service.id} className={`${index !== 0 ? 'mt-24' : ''}`}>
            {/* Service Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">{service.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* What We Offer */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">What We Offer:</h3>
                <ul className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-blue-700 mt-0.5 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  {service.how_it_works.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
