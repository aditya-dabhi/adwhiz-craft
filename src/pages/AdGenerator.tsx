import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { StepIndicator } from "@/components/StepIndicator";
import { AdTypeCard } from "@/components/AdTypeCard";
import { GeoMultiSelect } from "@/components/GeoMultiSelect";
import { VariantCard } from "@/components/VariantCard";
import { Toast } from "@/components/Toast";
import { Image, Video, Layout, Presentation, Globe } from "lucide-react";

type AdType = "Instagram Image Post" | "Instagram Reel" | "Instagram Story (Image)" | "Instagram Story (Video)" | "Instagram Web Banner";

interface Variant {
  id: string;
  city: string;
  imageUrl: string;
  caption: string;
}

const AD_TYPES = [
  { id: "Instagram Image Post", icon: Image, disabled: false },
  { id: "Instagram Reel", icon: Video, disabled: true },
  { id: "Instagram Story (Image)", icon: Presentation, disabled: true },
  { id: "Instagram Story (Video)", icon: Layout, disabled: true },
  { id: "Instagram Web Banner", icon: Globe, disabled: true },
] as const;

const AdGenerator = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [adType, setAdType] = useState<AdType | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [basePromptPreview, setBasePromptPreview] = useState("");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedByCity, setSelectedByCity] = useState<Record<string, string>>({});
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canProceedStep1 = adType === "Instagram Image Post" && isValidUrl(websiteUrl) && instagramHandle.trim().length > 0;

  const handleStep1Next = () => {
    const targetCities = cities.length > 0 ? cities : ["Global"];
    const cityText = targetCities.length === 1 ? targetCities[0] : targetCities.join(", ");
    
    // TODO: Real prompt assembly would merge brand adjectives/colors if provided later
    const prompt = `Create a professional Instagram square post (1024x1024) for ${instagramHandle} (${websiteUrl}). 
Target audience in: ${cityText}. 
${userPrompt ? `Campaign focus: ${userPrompt}` : ""}
Use brand-appropriate colors and modern design. Include clear call-to-action.`;
    
    setBasePromptPreview(prompt);
    setStep(2);
  };

  const generate = async () => {
    setLoadingGenerate(true);
    setErrorMsg(null);
    
    // TODO: POST /api/generate-image with { prompt, size: "1024x1024", city } instead of placeholders
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const targetCities = cities.length > 0 ? cities : ["Global"];
    const newVariants: Variant[] = [];
    
    targetCities.forEach((city) => {
      for (let i = 1; i <= 3; i++) {
        newVariants.push({
          id: `${city}-${i}`,
          city,
          imageUrl: `https://picsum.photos/seed/${city}-${i}/1024`,
          caption: `Celebrate ${city} with our festive collection ✨ Visit ${websiteUrl} #${city} #${instagramHandle.replace("@", "")}`,
        });
      }
    });
    
    setVariants(newVariants);
    setLoadingGenerate(false);
  };

  const canProceedStep2 = () => {
    const targetCities = cities.length > 0 ? cities : ["Global"];
    return targetCities.every((city) => selectedByCity[city]);
  };

  const handleStep2Next = () => {
    if (canProceedStep2()) {
      setStep(3);
    }
  };

  const getSelectedVariants = () => {
    return Object.entries(selectedByCity).map(([city, variantId]) => ({
      city,
      variant: variants.find((v) => v.id === variantId)!,
    }));
  };

  const updateCaption = (variantId: string, newCaption: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, caption: newCaption } : v))
    );
  };

  const publish = async () => {
    setLoadingPublish(true);
    setErrorMsg(null);
    
    // TODO: Real IG flow would call /api/ig/create-media then /api/ig/publish
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setLoadingPublish(false);
    setToast({ message: "Published to Instagram 🎉", type: "success" });
    
    setTimeout(() => {
      navigate("/analytics");
    }, 1500);
  };

  const targetCities = cities.length > 0 ? cities : ["Global"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-5xl px-8 py-12">
        <StepIndicator currentStep={step} />

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border-2 border-destructive text-destructive">
            {errorMsg}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="rounded-xl border shadow-sm p-6 bg-card">
            <h2 className="text-2xl font-bold mb-6">Platform & Brand Inputs</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Ad Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {AD_TYPES.map((type) => (
                    <AdTypeCard
                      key={type.id}
                      icon={type.icon}
                      title={type.id}
                      disabled={type.disabled}
                      selected={adType === type.id}
                      onClick={() => !type.disabled && setAdType(type.id as AdType)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Brand Details</h3>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Instagram Handle *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">@</span>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="yourbrand"
                      className="flex-1 px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <GeoMultiSelect selected={cities} onChange={setCities} />

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Campaign Prompt
                  </label>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="e.g., Diwali offer, festive palette, 20% off"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleStep1Next}
                disabled={!canProceedStep1}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-xl border shadow-sm p-6 bg-card">
                <h2 className="text-2xl font-bold mb-4">Prompt Preview</h2>
                <pre className="text-sm bg-muted/50 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto border">
                  {basePromptPreview}
                </pre>
              </div>

              <div className="rounded-xl border shadow-sm p-6 bg-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Variants per City</h2>
                  <button
                    onClick={generate}
                    disabled={loadingGenerate}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {loadingGenerate ? "Generating..." : "Generate"}
                  </button>
                </div>

                {variants.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Click Generate to create ad variants
                  </p>
                ) : (
                  <div className="space-y-8">
                    {targetCities.map((city) => {
                      const cityVariants = variants.filter((v) => v.city === city);
                      return (
                        <div key={city}>
                          <h3 className="text-lg font-semibold mb-4">City: {city}</h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            {cityVariants.map((variant) => (
                              <VariantCard
                                key={variant.id}
                                {...variant}
                                selected={selectedByCity[city] === variant.id}
                                onSelect={() =>
                                  setSelectedByCity((prev) => ({ ...prev, [city]: variant.id }))
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  onClick={handleStep2Next}
                  disabled={!canProceedStep2()}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="md:sticky md:top-24 h-fit">
              <div className="rounded-xl border shadow-sm p-6 bg-card space-y-4">
                <h3 className="font-semibold text-lg">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Platform:</span>
                    <div className="font-medium">{adType}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <div className="font-medium truncate">{websiteUrl}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Handle:</span>
                    <div className="font-medium">@{instagramHandle}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Geographies:</span>
                    <div className="font-medium">{targetCities.join(", ")}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="font-medium">
                      {canProceedStep2() ? (
                        <span className="text-primary">Ready</span>
                      ) : (
                        <span className="text-muted-foreground">Draft</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-xl border shadow-sm p-6 bg-card">
                <h2 className="text-2xl font-bold mb-6">Review & Publish</h2>
                
                <div className="space-y-8">
                  {getSelectedVariants().map(({ city, variant }) => (
                    <div key={city}>
                      <h3 className="text-lg font-semibold mb-4">Selected for: {city}</h3>
                      <div className="max-w-sm">
                        <VariantCard
                          {...variant}
                          captionEditable
                          onCaptionChange={(caption) => updateCaption(variant.id, caption)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Back
                </button>
                <button
                  onClick={publish}
                  disabled={loadingPublish}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {loadingPublish ? "Publishing..." : "Publish to Instagram"}
                </button>
              </div>
            </div>

            <div className="md:sticky md:top-24 h-fit">
              <div className="rounded-xl border shadow-sm p-6 bg-card space-y-4">
                <h3 className="font-semibold text-lg">Post Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Platform:</span>
                    <div className="font-medium">{adType}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Website:</span>
                    <div className="font-medium truncate">{websiteUrl}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Handle:</span>
                    <div className="font-medium">@{instagramHandle}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cities:</span>
                    <div className="font-medium">{targetCities.join(", ")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdGenerator;
