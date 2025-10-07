import { Header } from "@/components/Header";
import { KPI } from "@/components/KPI";
import { WatermarkOverlay } from "@/components/WatermarkOverlay";

interface MockAd {
  id: string;
  city: string;
  imageUrl: string;
  caption: string;
  impressions: number;
  clicks: number;
  ctr: string;
  insight: string;
  suggestion: string;
}

const MOCK_ADS: MockAd[] = [
  {
    id: "1",
    city: "Mumbai",
    imageUrl: "https://picsum.photos/seed/mumbai-analytics/400",
    caption: "Celebrate Mumbai with our festive collection ✨ #Mumbai #Brand",
    impressions: 12500,
    clicks: 875,
    ctr: "7.0%",
    insight: "Your Mumbai post is resonating due to festive colors and clear CTA. The bright palette matches local celebration preferences.",
    suggestion: "Try adding a limited-time urgency element (e.g., '24hrs only') to boost conversions further.",
  },
  {
    id: "2",
    city: "Delhi",
    imageUrl: "https://picsum.photos/seed/delhi-analytics/400",
    caption: "Delhi's choice for premium quality 🎯 #Delhi #Brand",
    impressions: 9800,
    clicks: 490,
    ctr: "5.0%",
    insight: "Delhi audience engages well with premium positioning. However, the busy background may reduce text legibility on mobile.",
    suggestion: "Try a cleaner background for Delhi to improve legibility and maintain focus on the product.",
  },
  {
    id: "3",
    city: "Bengaluru",
    imageUrl: "https://picsum.photos/seed/bangalore-analytics/400",
    caption: "Tech meets tradition in Bengaluru 💫 #Bengaluru #Brand",
    impressions: 15200,
    clicks: 1140,
    ctr: "7.5%",
    insight: "Bengaluru's tech-savvy audience loves the modern-traditional blend. High engagement from 25-34 age group.",
    suggestion: "Consider A/B testing with more minimalist designs to appeal to the startup crowd even more.",
  },
  {
    id: "4",
    city: "Hyderabad",
    imageUrl: "https://picsum.photos/seed/hyderabad-analytics/400",
    caption: "Hyderabad's new favorite destination 🌟 #Hyderabad #Brand",
    impressions: 8600,
    clicks: 602,
    ctr: "7.0%",
    insight: "Strong performance in Hyderabad with balanced CTR. The cultural elements resonate well with local sentiment.",
    suggestion: "Add more specific Hyderabadi cultural references (e.g., Charminar motifs) to increase local connection.",
  },
  {
    id: "5",
    city: "Chennai",
    imageUrl: "https://picsum.photos/seed/chennai-analytics/400",
    caption: "Chennai's heritage, our passion ❤️ #Chennai #Brand",
    impressions: 7400,
    clicks: 518,
    ctr: "7.0%",
    insight: "Chennai audience appreciates the heritage angle. Traditional color schemes perform better here than modern palettes.",
    suggestion: "Emphasize family values and tradition more explicitly to align with Chennai's cultural preferences.",
  },
  {
    id: "6",
    city: "Pune",
    imageUrl: "https://picsum.photos/seed/pune-analytics/400",
    caption: "Pune loves our new collection! 🎉 #Pune #Brand",
    impressions: 6200,
    clicks: 434,
    ctr: "7.0%",
    insight: "Pune shows steady engagement. The youthful energy in the creative appeals to the student demographic.",
    suggestion: "Add student discount mentions or campus delivery options to tap into Pune's large student population.",
  },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-5xl px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Campaign Analytics</h1>
          <p className="text-muted-foreground">
            Track performance and get actionable insights for your ads
          </p>
        </div>

        <section className="space-y-8">
          <div className="rounded-xl border shadow-sm p-6 bg-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-primary rounded-full" />
              Instagram Campaigns
            </h2>

            <div className="space-y-8">
              {MOCK_ADS.map((ad) => (
                <article
                  key={ad.id}
                  className="p-6 rounded-xl border bg-muted/30 space-y-4"
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-6">
                    {/* Thumbnail */}
                    <div 
                      className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ userSelect: "none" }}
                    >
                      <img
                        src={ad.imageUrl}
                        alt={`Ad for ${ad.city}`}
                        draggable={false}
                        className="w-full h-full object-cover select-none"
                        style={{ userSelect: "none", pointerEvents: "none" }}
                      />
                      <WatermarkOverlay />
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{ad.city}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {ad.caption}
                        </p>
                      </div>

                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-3">
                        <KPI label="Impressions" value={ad.impressions.toLocaleString()} />
                        <KPI label="Clicks" value={ad.clicks.toLocaleString()} />
                        <KPI label="CTR" value={ad.ctr} />
                      </div>

                      {/* Insight */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          📊 Insight
                        </h4>
                        <p className="text-sm text-foreground">{ad.insight}</p>
                      </div>

                      {/* Suggestion */}
                      <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                        <h4 className="text-sm font-semibold text-accent mb-2">
                          💡 Suggested Tweak
                        </h4>
                        <p className="text-sm text-foreground">{ad.suggestion}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Analytics;
