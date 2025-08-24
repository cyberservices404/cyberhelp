import React from 'react';
import { AlertTriangle, ExternalLink, Shield, BookOpen, Users, Phone } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const config = getSiteConfig();
  const resources = config.resources_page;

  return (
    <>
      <Header config={config} />
      
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{resources.hero.title}</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {resources.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Educational Materials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="h-12 w-12 text-blue-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {resources.educational_materials.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {resources.educational_materials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.educational_materials.resources.map((resource: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
                >
                  Read More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cyber Threats Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {resources.cyber_threats.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {resources.cyber_threats.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {resources.cyber_threats.alerts.map((alert: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg border-l-4 border-red-500 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
                        {alert.type}
                      </span>
                      <span className="text-sm text-gray-500">Published: {alert.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{alert.title}</h3>
                    <p className="text-gray-600 mb-4">{alert.description}</p>
                    <a
                      href={alert.link}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                    >
                      Learn more about this threat
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Reporting Channels Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-blue-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {resources.reporting_channels.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {resources.reporting_channels.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resources.reporting_channels.channels.map((channel: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
                >
                  Visit Portal
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Security Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-blue-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {resources.security_tips.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {resources.security_tips.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.security_tips.categories.map((category: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                <ol className="space-y-3">
                  {category.tips.map((tip: any, tipIndex: number) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="bg-blue-700 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {tipIndex + 1}
                      </span>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="h-12 w-12 text-blue-700 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">{resources.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{resources.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {resources.cta.buttons.map((button: any, index: number) => (
              <a
                key={index}
                href={button.link}
                className={`px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                  button.variant === 'primary'
                    ? 'bg-white text-blue-900 hover:bg-blue-50'
                    : 'border-2 border-white text-white hover:bg-white hover:text-blue-900'
                }`}
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </section>
      </div>
      
      <Footer config={config} />
    </>
  );
}
