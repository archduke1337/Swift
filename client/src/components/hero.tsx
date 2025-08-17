import { Rocket, PlayCircle } from "lucide-react";

export default function Hero() {
  const scrollToConverter = () => {
    const element = document.getElementById('converter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-gradient-to-br from-swift-teal-50 via-white to-swift-teal-50 dark:from-swift-teal-900 dark:via-swift-teal-800 dark:to-swift-teal-900 py-20" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            <span className="text-gradient">Fast, Free, AI-Powered</span>
            <span className="text-swift-teal-600 dark:text-swift-teal-300 block mt-2">File Converter</span>
          </h1>
          <p className="text-xl text-swift-teal-700 dark:text-swift-teal-200 mb-8 max-w-3xl mx-auto animate-slideUp">
            Convert videos, audio, documents, and data formats instantly. No software downloads, no limits, just lightning-fast conversions powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToConverter}
              className="button-hover bg-gradient-to-r from-swift-teal-500 to-swift-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <Rocket className="w-5 h-5 mr-2 inline animate-bounce-slow" aria-hidden="true" />
              Start Converting Now
            </button>
            <button className="glass-effect button-hover text-swift-teal-600 dark:text-swift-teal-300 px-8 py-4 rounded-lg font-semibold text-lg">
              <PlayCircle className="w-5 h-5 mr-2 inline" aria-hidden="true" />
              See How It Works
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="card-hover p-4 rounded-lg">
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="text-swift-teal-600 dark:text-swift-teal-300">File Formats</div>
            </div>
            <div className="card-hover p-4 rounded-lg">
              <div className="text-3xl font-bold text-gradient">100%</div>
              <div className="text-swift-teal-600 dark:text-swift-teal-300">Free to Use</div>
            </div>
            <div className="card-hover p-4 rounded-lg">
              <div className="text-3xl font-bold text-gradient">⚡</div>
              <div className="text-swift-teal-600 dark:text-swift-teal-300">Lightning Fast</div>
            </div>
            <div className="card-hover p-4 rounded-lg">
              <div className="text-3xl font-bold text-gradient">🔒</div>
              <div className="text-swift-teal-600 dark:text-swift-teal-300">Secure & Private</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
