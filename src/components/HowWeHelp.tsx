import { SiteConfig } from '@/lib/types';

interface HowWeHelpProps {
  config: SiteConfig;
}

export default function HowWeHelp({ config }: HowWeHelpProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures you get the support you need quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.how_we_help.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-700">{config.stats.cases_handled}</div>
            <div className="text-gray-600">Cases Handled</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-700">{config.stats.success_rate}</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-700">
              {config.stats.support_availability}
            </div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-700">{config.stats.legal_experts}</div>
            <div className="text-gray-600">Legal Experts</div>
          </div>
        </div>
      </div>
    </section>
  );
}
