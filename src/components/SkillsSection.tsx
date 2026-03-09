"use client";

import { skillCategories } from "@/data/skills";
import { useTranslation } from "@/i18n/useTranslation";
import { useInView } from "@/hooks/useInView";

export default function SkillsSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView(0.1);

  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, category: cat.translationKey }))
  );

  return (
    <section id="skills" className="relative px-6 py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("skills.title")}
          </h2>
          <p className="text-fg-muted">{t("skills.description")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allSkills.map((skill, i) => (
            <div
              key={skill.name}
              className={`group rounded-xl border border-border/60 bg-bg-card/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:bg-bg-card/80 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              <h3 className="text-sm font-semibold text-fg">{skill.name}</h3>
              <p className="mt-1 text-xs text-fg-muted">{t(skill.category)}</p>

              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-1.5 flex-1 rounded-full transition-all duration-700"
                    style={{
                      backgroundColor: j < skill.level ? skill.color : "var(--border)",
                      opacity: j < skill.level ? 0.8 : 0.3,
                      transitionDelay: inView ? `${i * 80 + j * 60}ms` : "0ms",
                      transform: inView && j < skill.level ? "scaleX(1)" : j < skill.level ? "scaleX(0)" : "scaleX(1)",
                      transformOrigin: "left",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
