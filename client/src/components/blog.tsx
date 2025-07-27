import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const blogPosts = [
  {
    title: "How to Convert MOV to MP4 Online",
    description: "Step-by-step guide to converting MOV files to MP4 format with quality optimization and compression settings.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
  },
  {
    title: "AI-Powered Audio Enhancement",
    description: "Learn how our AI algorithms reduce noise, enhance clarity, and optimize your audio files automatically.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
  },
  {
    title: "OCR and Text Extraction from PDFs",
    description: "Extract text from scanned documents and images using our advanced OCR technology with 99% accuracy.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
  }
];

const faqs = [
  {
    question: "Is SwiftFormat really free?",
    answer: "Yes, SwiftFormat is completely free to use with no hidden fees, subscriptions, or limits on file conversions. We believe in democratizing access to file conversion tools."
  },
  {
    question: "How secure is my data?",
    answer: "Your files are processed securely and automatically deleted from our servers after conversion. We use encrypted connections and never store your personal data permanently."
  },
  {
    question: "What file formats do you support?",
    answer: "We support 50+ file formats including videos (MP4, MOV, AVI), audio (MP3, WAV, OGG), documents (PDF, DOCX, TXT), images (JPG, PNG, WebP), and data formats (CSV, JSON, XML)."
  }
];

export default function Blog() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="blog" className="py-20 bg-gray-50" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="blog-heading" className="text-3xl md:text-4xl font-bold text-swift-gray mb-4">
            Knowledge Base & How-To Guides
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how to get the most out of SwiftFormat with our comprehensive guides and frequently asked questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-swift-gray mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <button className="text-swift-teal font-medium hover:text-swift-teal-dark transition-colors duration-200">
                    Read More <ArrowRight className="w-4 h-4 ml-1 inline" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-swift-gray mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button 
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-swift-teal rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-swift-gray">{faq.question}</h4>
                    <ChevronDown 
                      className={`text-swift-teal transform transition-transform duration-200 w-5 h-5 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`} 
                      aria-hidden="true" 
                    />
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
