import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  Search,
  FileUp,
  BookOpen,
} from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">DocuMind AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/auth/sign-in"
              className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/sign-up"
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20" />

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-purple-300 to-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300 to-cyan-500 rounded-full blur-3xl opacity-20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-24 md:pt-28 md:pb-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Understand Your Documents with
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {" "}
                    AI
                  </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[600px]">
                  DocuMind AI helps you extract insights, answer questions, and
                  understand complex documents through the power of artificial
                  intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Link
                    to="/auth/sign-up"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-lg"
                  >
                    Start for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-6 rounded-2xl shadow-xl">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl opacity-80 blur-xl" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-80 blur-xl" />
                  <div className="relative bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">DocuMind Chat</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ask anything about your documents
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                        What are the key findings in the Q4 financial report?
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-sm">
                        The Q4 financial report shows a 15% increase in revenue
                        compared to Q3, with the new product line contributing
                        to 30% of this growth. Operating expenses decreased by
                        7% due to the implementation of cost-saving measures.
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                        Can you summarize the executive summary?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Document Intelligence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Extract insights, answer questions, and understand your
                documents with AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 border border-purple-200 dark:border-purple-800 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-4">
                  <FileUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Upload PDF and DOCX files for AI processing
                </p>
                <p className="text-sm">
                  Easily upload your documents in various formats including PDF
                  and DOCX. Our system processes them instantly for immediate
                  analysis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Chat with Documents
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Have natural conversations about your content
                </p>
                <p className="text-sm">
                  Interact with your documents through a chat interface. Ask
                  questions, request explanations, and get instant responses
                  based on your document content.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/40 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Q&A Engine</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Get precise answers to your specific questions
                </p>
                <p className="text-sm">
                  Our advanced Q&A system extracts precise answers from your
                  documents. Perfect for research, studying, or quickly finding
                  information in lengthy documents.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Summaries</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Get concise summaries of lengthy documents
                </p>
                <p className="text-sm">
                  Save time with AI-generated summaries of your documents. Get
                  the key points and insights without reading through pages of
                  content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How DocuMind Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our AI-powered platform makes document understanding simple
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-md relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">
                  Upload Your Documents
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply drag and drop your PDF or DOCX files into our secure
                  platform. Your documents are encrypted and processed
                  immediately.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-md relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">
                  AI Processes Content
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced AI analyzes your documents, understanding the
                  content, context, and relationships between information.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-md relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">
                  Interact & Get Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat with your documents, ask questions, get summaries, and
                  extract the information you need in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Document Experience?
                  </h2>
                  <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Join thousands of professionals who are saving time and
                    gaining deeper insights with DocuMind AI.
                  </p>
                  <Link
                    to="/auth/sign-up"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 transition-all"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Have questions about DocuMind AI? Our team is here to help you
                  get the most out of your documents.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        support@documind.ai
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Send us a message
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[120px]"
                          placeholder="Your message"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold">DocuMind AI</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Intelligent document processing powered by AI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DocuMind AI. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
