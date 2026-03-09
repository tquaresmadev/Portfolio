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
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: skill.color + "18" }}
              >
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: skill.color }} />
              </div>
              <h3 className="text-sm font-semibold text-fg">{skill.name}</h3>
              <p className="mt-1 text-xs text-fg-muted">{t(skill.category)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
