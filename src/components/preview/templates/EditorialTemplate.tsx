import React from 'react';
import { CVData } from '../../../types';
import { ContactList, formatDate } from '../TemplateComponents';
import { ExternalLink } from 'lucide-react';

export const EditorialTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, customSections, sectionsOrder, theme } = data;
  const accent = theme.accentColor || '#18181B';

  const visibleSections = sectionsOrder.filter((s) => s.isVisible);

  return (
    <div className="w-full bg-white text-[#18181B] min-h-full">
      {/* Header */}
      <header className="pb-6 border-b border-neutral-200/80">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-base font-medium mt-1 tracking-wide" style={{ color: accent }}>
                {personal.jobTitle}
              </p>
            )}
            <ContactList personal={personal} className="mt-3.5" accentColor={accent} />
          </div>

          {personal.showAvatar && personal.avatarUrl && (
            <div className="shrink-0">
              <img
                src={personal.avatarUrl}
                alt={personal.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover border border-neutral-200 shadow-xs"
              />
            </div>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      <div className="mt-6 space-y-6">
        {visibleSections.map((sec) => {
          if (sec.id === 'personal') return null; // rendered in header

          if (sec.id === 'summary' && summary?.content) {
            return (
              <section key="summary" className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Profile Summary'}
                </h2>
                <p className="text-xs/relaxed text-neutral-700 leading-relaxed whitespace-pre-line">
                  {summary.content}
                </p>
              </section>
            );
          }

          if (sec.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Work Experience'}
                </h2>
                <div className="space-y-4">
                  {experience.map((item) => (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <span className="text-sm font-semibold text-neutral-900">{item.role}</span>
                          {item.company && (
                            <span className="text-xs text-neutral-600 font-medium">
                              {' '}
                              — {item.company}
                              {item.location ? `, ${item.location}` : ''}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-neutral-500 shrink-0 font-mono">
                          {formatDate(item.startDate)} – {formatDate(item.endDate, item.isCurrent)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-neutral-500 italic">{item.description}</p>
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
              <section key="education" className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Education'}
                </h2>
                <div className="space-y-3">
                  {education.map((item) => (
                    <div key={item.id} className="flex items-baseline justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">
                          {item.degree} {item.field ? `in ${item.field}` : ''}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {item.school}
                          {item.location ? ` — ${item.location}` : ''}
                          {item.gpa ? ` (GPA: ${item.gpa})` : ''}
                        </div>
                        {item.honors && <p className="text-xs text-neutral-500 italic mt-0.5">{item.honors}</p>}
                      </div>
                      <span className="text-xs font-medium text-neutral-500 shrink-0 font-mono">
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
              <section key="skills" className="space-y-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Skills & Expertise'}
                </h2>
                <div className="space-y-2">
                  {skills.map((cat) => (
                    <div key={cat.id} className="text-xs leading-relaxed">
                      <span className="font-semibold text-neutral-800">{cat.categoryName}: </span>
                      <span className="text-neutral-600">{cat.skills.join(' • ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Projects'}
                </h2>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900">{proj.title}</span>
                          {proj.role && <span className="text-xs text-neutral-500">({proj.role})</span>}
                          {proj.link && (
                            <a
                              href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-neutral-400 hover:text-neutral-700"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        {(proj.startDate || proj.endDate) && (
                          <span className="text-xs text-neutral-500 font-mono">
                            {formatDate(proj.startDate)} {proj.endDate ? `– ${formatDate(proj.endDate)}` : ''}
                          </span>
                        )}
                      </div>

                      {proj.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 py-0.5">
                          {proj.techStack.map((tech, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-700 rounded-sm font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

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
              <section key="certifications" className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Certifications'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-neutral-900">{cert.title}</div>
                        <div className="text-neutral-500 text-[11px]">{cert.issuer}</div>
                      </div>
                      {cert.date && <span className="text-neutral-400 font-mono text-[11px] shrink-0">{cert.date}</span>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'Languages'}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-1.5">
                      <span className="font-semibold text-neutral-800">{lang.language}</span>
                      <span className="text-neutral-400">({lang.proficiency})</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'references' && references?.length > 0) {
            const isAllAvailable = references.every((r) => r.isAvailableUponRequest);
            return (
              <section key="references" className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || 'References'}
                </h2>
                {isAllAvailable ? (
                  <p className="text-xs text-neutral-600 italic">Available upon request.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {references.map((ref) =>
                      ref.isAvailableUponRequest ? (
                        <div key={ref.id} className="text-neutral-500 italic">
                          References available upon request.
                        </div>
                      ) : (
                        <div key={ref.id} className="space-y-0.5">
                          <div className="font-semibold text-neutral-900">{ref.name}</div>
                          <div className="text-neutral-600">
                            {ref.role}
                            {ref.company ? ` — ${ref.company}` : ''}
                          </div>
                          {ref.email && <div className="text-neutral-500">{ref.email}</div>}
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>
            );
          }

          // Custom Section
          const custom = customSections?.find((c) => c.id === sec.id);
          if (custom && custom.items?.length > 0) {
            return (
              <section key={custom.id} className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pb-1 border-b border-neutral-200/60">
                  {sec.title || custom.title}
                </h2>
                <div className="space-y-3">
                  {custom.items.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <span className="text-sm font-semibold text-neutral-900">{item.title}</span>
                          {item.subtitle && <span className="text-xs text-neutral-600"> — {item.subtitle}</span>}
                        </div>
                        {item.date && <span className="text-xs text-neutral-500 font-mono">{item.date}</span>}
                      </div>
                      {item.description && <p className="text-xs text-neutral-600">{item.description}</p>}
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
