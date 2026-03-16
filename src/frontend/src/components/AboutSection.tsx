import { Gem, Leaf, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Why we curate
          </h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            We believe your home and wardrobe should tell a story. Every piece
            on Maison is chosen for its craftsmanship, longevity, and the quiet
            joy it brings to daily life.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {[
            {
              icon: Gem,
              title: "Considered Quality",
              desc: "We look past trends to find pieces made to last -- materials that age well and designs that stay beautiful.",
            },
            {
              icon: Leaf,
              title: "Conscious Choices",
              desc: "We prioritize sustainable materials, ethical production, and brands that care about their impact.",
            },
            {
              icon: Sparkles,
              title: "Honest Curation",
              desc: "No paid placements. Every recommendation is based on genuine appreciation for the piece.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-11 h-11 border border-border flex items-center justify-center">
                <Icon
                  className="w-4.5 h-4.5 text-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
