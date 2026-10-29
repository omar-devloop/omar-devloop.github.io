import { about } from '@/data/site'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function About() {
  return (
    <section id="about" className="border-t border-border/70">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="About"
          title="Small tools, made properly"
          description="A little context on what I build, how I work, and the stack I reach for."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <div className="space-y-4">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={
                    index === 0
                      ? 'text-sm leading-relaxed text-foreground/90 text-pretty'
                      : 'text-sm leading-relaxed text-muted-foreground text-pretty'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {about.principles.map((principle) => (
                <div key={principle.title} className="border-t border-border pt-4">
                  <dt className="text-sm font-medium tracking-tight">{principle.title}</dt>
                  <dd className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {principle.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="gap-0 self-start py-0 ring-foreground/10">
            <CardHeader className="p-5 pb-4">
              <CardTitle className="font-mono text-[11px] font-normal tracking-[0.18em] text-muted-foreground uppercase">
                Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5 pt-0">
              {about.skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-medium text-foreground/80">{group.label}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="font-mono text-[11px] font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              <Separator />

              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="text-foreground/80">Currently:</span> refining KoboMobile and
                staying open to collaboration, feedback, and new opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
