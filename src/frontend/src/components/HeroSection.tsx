import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onBrowse: () => void;
}

export function HeroSection({ onBrowse }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[580px] py-16 lg:py-28">
          {/* Text */}
          <div className="space-y-7 animate-fade-up">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground font-medium">
              Curated Lifestyle Picks
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-tight text-foreground">
              Style your
              <br />
              <em className="italic text-accent">world</em> with
              <br />
              intention
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed max-w-sm font-light">
              From softly draped cashmere to hand-thrown ceramics -- every piece
              is chosen to bring warmth and beauty into everyday life.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                onClick={onBrowse}
                className="group gap-2 bg-foreground text-primary-foreground hover:bg-foreground/85 rounded-none px-8 text-xs font-medium tracking-[0.12em] uppercase"
              >
                Shop the Edit
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-2 text-sm text-muted-foreground">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-foreground">
                  150+
                </span>
                <span className="text-xs tracking-wide">Curated Pieces</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-foreground">
                  2
                </span>
                <span className="text-xs tracking-wide">Categories</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-foreground">
                  100%
                </span>
                <span className="text-xs tracking-wide">Handpicked</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative overflow-hidden w-full max-w-lg">
              <img
                src="/assets/generated/hero-fashion-homedecor.dim_1200x700.jpg"
                alt="Curated fashion and home decor"
                className="w-full h-[360px] lg:h-[460px] object-cover"
              />
              {/* Floating label */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-3 border border-border">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  New in
                </p>
                <p className="text-sm font-display font-semibold text-foreground mt-0.5">
                  Autumn Edit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
