"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">FORMATDISC</div>
          <Link 
            href="/"
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Launch Simulator
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Validate Your Startup
          <br />
          <span className="text-yellow-300">Before You Build</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
          AI-powered MVP simulation tool that delivers instant financial projections, 
          risk analysis, and GO/NO-GO verdict in under 3 seconds.
        </p>
        <Link 
          href="/"
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-xl"
        >
          Get Started Free →
        </Link>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Enterprise Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="Financial Projections"
            description="Automated 12-month revenue forecasting with OPEX/CAC models, profit curves, and MRR calculations."
            icon="💰"
          />
          <FeatureCard 
            title="Risk Analysis"
            description="Confidence scoring (0-100) with factor-level risk breakdown and Monte-Carlo variation simulation."
            icon="📊"
          />
          <FeatureCard 
            title="Growth Modeling"
            description="Customer acquisition trajectory, ARPU projections, and break-even point calculation."
            icon="📈"
          />
          <FeatureCard 
            title="GO/NO-GO Verdict"
            description="Deterministic scoring with actionable suggestions and rationale for decision-making."
            icon="✅"
          />
          <FeatureCard 
            title="PDF Export"
            description="Board-ready investor reports with projection charts and business model breakdown."
            icon="📄"
          />
          <FeatureCard 
            title="Instant Results"
            description="Full analysis generated in under 3 seconds with local-first evaluation."
            icon="⚡"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Validate Your Idea?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join entrepreneurs and investors using data-driven insights
        </p>
        <Link 
          href="/"
          className="inline-block bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transition shadow-xl"
        >
          Start Simulation Now
        </Link>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-white/70">
        <p className="mb-2">© 2024 FORMATDISC, vl. Mladen Gertner</p>
        <p>Zagreb, Croatia | info@formatdisc.hr | +385 91 542 1014</p>
        <p className="mt-4">
          <a href="https://www.formatdisc.hr" className="hover:text-white transition">
            www.formatdisc.hr
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}
