import React from 'react';
import { CVData } from '../../../types';
import { ContactList, formatDate } from '../TemplateComponents';
import { ExternalLink } from 'lucide-react';

export const SwissTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, customSections, sectionsOrder, theme } = data;
  const accent = theme.accentColor || '#18181B';

  const visibleSections = sectionsOrder.filter((s) => s.isVisible);

  return (
    <div className="w-full bg-white text-[#18181B] min-h-full">
      {/* Swiss Bold Header */}
      <header className="border-b-2 border-neutral-900 pb-5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-neutral-900 leading-none">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-sm font-semibold tracking-tight text-neutral-600 mt-2">
                {personal.jobTitle}
              </p>
            )}
          </div>

          {personal.showAvatar && personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xs grayscale contrast-125 object-cover border border-neutral-900"
            />
          )}
        </div>

        <ContactList personal={personal} className="mt-4 pt-3 border-t border-neutral-200" accentColor={accent} />
      </header>

      {/* Grid Layout Sections */}
      <div className="mt-6 space-y-6">
        {visibleSections.map((sec, index) => {
          if (sec.id === 'personal') return null;

          const numStr = String(index).padStart(2, '0');

          if (sec.id === 'summary' && summary?.content) {
            return (
              <section key="summary" className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Summary
                  </div>
                </div>
                <div className="col-span-9">
                  <p className="text-xs/relaxed text-neutral-800 leading-relaxed whitespace-pre-line font-medium">
                    {summary.content}
                  </p>
                </div>
              </section>
            );
          }

          if (sec.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Experience
                  </div>
                </div>
                <div className="col-span-9 space-y-5">
                  {experience.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-bold text-sm text-neutral-900 tracking-tight">
                          {item.role}
                          {item.company && <span className="font-normal text-neutral-600"> — {item.company}</span>}
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                          {formatDate(item.startDate)} – {formatDate(item.endDate, item.isCurrent)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-neutral-500 font-mono">{item.description}</p>
                      )}

                      {item.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs/relaxed text-neutral-700">
                          {item.highlights.filter(Boolean).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'education' && education?.length > 0) {
            return (
              <section key="education" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Education
                  </div>
                </div>
                <div className="col-span-9 space-y-3">
                  {education.map((item) => (
                    <div key={item.id} className="flex items-baseline justify-between gap-4">
                      <div>
                        <div className="font-bold text-xs text-neutral-900">
                          {item.degree} {item.field ? `in ${item.field}` : ''}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {item.school} {item.location ? `· ${item.location}` : ''}
                          {item.gpa ? ` (GPA ${item.gpa})` : ''}
                        </div>
                        {item.honors && <div className="text-[11px] text-neutral-500 italic mt-0.5">{item.honors}</div>}
                      </div>
                      <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                        {formatDate(item.startDate)} – {formatDate(item.endDate)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Capabilities
                  </div>
                </div>
                <div className="col-span-9 space-y-2 text-xs">
                  {skills.map((cat) => (
                    <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                      <span className="font-mono font-semibold text-neutral-900 shrink-0 w-36 text-[11px]">
                        {cat.categoryName}
                      </span>
                      <span className="text-neutral-700">{cat.skills.join(' / ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Projects
                  </div>
                </div>
                <div className="col-span-9 space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-neutral-900">{proj.title}</span>
                          {proj.link && (
                            <a
                              href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-neutral-400 hover:text-neutral-900"
                            >
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                        {(proj.startDate || proj.endDate) && (
                          <span className="text-[11px] font-mono text-neutral-500">
                            {formatDate(proj.startDate)} {proj.endDate ? `– ${formatDate(proj.endDate)}` : ''}
                          </span>
                        )}
                      </div>
                      {proj.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-neutral-700">
                          {proj.highlights.filter(Boolean).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'certifications' && certifications?.length > 0) {
            return (
              <section key="certifications" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Certifications
                  </div>
                </div>
                <div className="col-span-9 grid grid-cols-2 gap-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <span className="font-bold text-neutral-900">{cert.title}</span>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {cert.issuer} {cert.date ? `[${cert.date}]` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    Languages
                  </div>
                </div>
                <div className="col-span-9 flex flex-wrap gap-4 text-xs font-mono">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <span className="font-bold text-neutral-900">{l.language}</span>
                      <span className="text-neutral-500"> ({l.proficiency})</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'references' && references?.length > 0) {
            return (
              <section key="references" className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    References
                  </div>
                </div>
                <div className="col-span-9 text-xs">
                  {references.every((r) => r.isAvailableUponRequest) ? (
                    <p className="text-neutral-500 italic">Available upon request.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {references.map((r) =>
                        r.isAvailableUponRequest ? null : (
                          <div key={r.id}>
                            <div className="font-bold text-neutral-900">{r.name}</div>
                            <div className="text-neutral-600">{r.role} — {r.company}</div>
                            {r.email && <div className="text-neutral-400 font-mono text-[11px]">{r.email}</div>}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          const custom = customSections?.find((c) => c.id === sec.id);
          if (custom && custom.items?.length > 0) {
            return (
              <section key={custom.id} className="grid grid-cols-12 gap-4 pt-4 border-t border-neutral-200/70">
                <div className="col-span-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                    <span className="text-neutral-400 mr-1">{numStr} /</span>
                    {custom.title}
                  </div>
                </div>
                <div className="col-span-9 space-y-3">
                  {custom.items.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-bold text-xs text-neutral-900">
                          {item.title}
                          {item.subtitle && <span className="font-normal text-neutral-600"> — {item.subtitle}</span>}
                        </div>
                        {item.date && <span className="text-[11px] font-mono text-neutral-500">{item.date}</span>}
                      </div>
                      {item.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-neutral-700">
                          {item.highlights.filter(Boolean).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
