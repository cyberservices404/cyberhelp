import { getSiteConfig } from '@/lib/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportForm from '@/components/ReportForm';

export default function ReportPage() {
  const config = getSiteConfig();

  return (
    <>
      <Header config={config} />

      {/* Page Header */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Report Cyber Crime</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Report your cyber fraud incident securely and get expert guidance through the
              resolution process.
            </p>
          </div>
        </div>
      </section>

      { /* Report Form */}
      <ReportForm />

      <Footer config={config} />
    </>
  );
}
