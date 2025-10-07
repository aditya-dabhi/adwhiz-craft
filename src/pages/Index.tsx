import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sparkles, BarChart3, Target, Zap, Eye } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-5xl px-8 py-12">
        {/* Hero Section */}
        <section className="text-center py-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            AdWhiz
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Self-serve campaign creation for SMBs
          </p>
        </section>

        {/* Action Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <Link
            to="/ad-generator"
            className="group p-8 rounded-xl border-2 border-border hover:border-primary bg-card hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  Ad Generator →
                </h2>
                <p className="text-muted-foreground">
                  Create professional Instagram ads in 3 easy steps. Choose your platform, generate variants, and publish instantly.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/analytics"
            className="group p-8 rounded-xl border-2 border-border hover:border-primary bg-card hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                  Analytics →
                </h2>
                <p className="text-muted-foreground">
                  Track your campaign performance with plain-English insights and actionable suggestions for improvement.
                </p>
              </div>
            </div>
          </Link>
        </section>

        {/* How It Works */}
        <section className="py-12 px-8 rounded-xl bg-muted/30 border">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-2">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">1. Choose + Brand</h3>
              <p className="text-sm text-muted-foreground">
                Select your platform and provide brand details like website URL and Instagram handle
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mb-2">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">2. Generate & Preview</h3>
              <p className="text-sm text-muted-foreground">
                AI creates multiple variants for each location. Review and select your favorites
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-2">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">3. Publish & Track</h3>
              <p className="text-sm text-muted-foreground">
                Publish to Instagram and monitor performance with actionable insights
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t mt-16">
        Prototype • React + Vite + Tailwind • Lovable ready
      </footer>
    </div>
  );
};

export default Index;
