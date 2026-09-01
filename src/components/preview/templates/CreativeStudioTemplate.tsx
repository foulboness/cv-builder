import React from 'react';
import { CVData } from '../../../types';
import { ContactList, formatDate } from '../TemplateComponents';
import { ExternalLink } from 'lucide-react';

export const CreativeStudioTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, customSections, sectionsOrder, theme } = data;
  const accent = theme.accentColor || '#18181B';

  const visibleSections = sectionsOrder.filter((s) => s.isVisible);

  return (
    <div className="w-full bg-white text-[#18181B] min-h-full">
      {/* Top Stylish Header with Accent Pill Banner */}
      <header className="p-6 bg-[#F5F3EF] rounded-xl mb-6 border border-[#EBE8E1]">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white inline-block shadow-xs"
              style={{ backgroundColor: accent }}
            >
              Curriculum Vitae
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-sm font-semibold text-neutral-700">
                {personal.jobTitle}
              </p>
            )}
            <ContactList personal={personal} className="pt-2" accentColor={accent} />
          </div>

          {personal.showAvatar && personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-sm shrink-0"
            />
          )}
        </div>
      </header>

      {/* Sections List */}
      <div className="space-y-6">
        {visibleSections.map((sec) => {
          if (sec.id === 'personal') return null;

          if (sec.id === 'summary' && summary?.content) {
            return (
              <section key="summary" className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'About & Philosophy'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <p className="text-xs/relaxed text-neutral-700 leading-relaxed whitespace-pre-line">
                  {summary.content}
                </p>
              </section>
            );
          }

          if (sec.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Experience'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="space-y-4">
                  {experience.map((item) => (
                    <div key={item.id} className="space-y-1.5 p-3.5 bg-[#FAF9F6] rounded-lg border border-[#EFECE6]">
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-neutral-900">{item.role}</span>
                          {item.company && (
                            <span className="text-xs font-medium text-neutral-600">
                              {' '}
                              — {item.company}
                              {item.location ? `, ${item.location}` : ''}
                            </span>
                          )}
                        </div>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium shrink-0 text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {formatDate(item.startDate)} – {formatDate(item.endDate, item.isCurrent)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-neutral-500 italic">{item.description}</p>
                      )}

                      {item.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs/relaxed text-neutral-700 pt-1">
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
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Education'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {education.map((item) => (
                    <div key={item.id} className="p-3 bg-[#FAF9F6] rounded-lg border border-[#EFECE6] space-y-1 text-xs">
                      <div className="font-bold text-neutral-900">
                        {item.degree} {item.field ? `in ${item.field}` : ''}
                      </div>
                      <div className="text-neutral-600">{item.school}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {formatDate(item.startDate)} – {formatDate(item.endDate)}
                      </div>
                      {item.honors && <div className="text-[11px] text-neutral-500 italic">{item.honors}</div>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Skills & Craft'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="space-y-2.5">
                  {skills.map((cat) => (
                    <div key={cat.id} className="space-y-1.5 text-xs">
                      <span className="font-bold text-neutral-800 text-[11px]">{cat.categoryName}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-0.5 bg-[#FAF9F6] border border-[#E8E4DA] rounded-full text-neutral-800 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Selected Projects'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-[#FAF9F6] rounded-lg border border-[#EFECE6] space-y-1 text-xs">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                          <span>{proj.title}</span>
                          {proj.role && <span className="text-[11px] text-neutral-500 font-normal">({proj.role})</span>}
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
                          <span className="text-[10px] font-mono text-neutral-500">
                            {formatDate(proj.startDate)} {proj.endDate ? `– ${formatDate(proj.endDate)}` : ''}
                          </span>
                        )}
                      </div>
                      {proj.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-neutral-700 pt-0.5">
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
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Certificates'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {certifications.map((c) => (
                    <div key={c.id} className="p-2 bg-[#FAF9F6] rounded border border-[#EFECE6]">
                      <div className="font-bold text-neutral-900">{c.title}</div>
                      <div className="text-[11px] text-neutral-500">{c.issuer}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'Languages'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {languages.map((l) => (
                    <span key={l.id} className="px-3 py-1 bg-[#FAF9F6] border border-[#EFECE6] rounded-full">
                      <strong>{l.language}</strong> <span className="text-neutral-500">({l.proficiency})</span>
                    </span>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'references' && references?.length > 0) {
            return (
              <section key="references" className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || 'References'}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="text-xs text-neutral-600">
                  {references.every((r) => r.isAvailableUponRequest) ? (
                    <p className="italic">Available upon request.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {references.map((r) =>
                        r.isAvailableUponRequest ? null : (
                          <div key={r.id} className="p-2 bg-[#FAF9F6] rounded border border-[#EFECE6]">
                            <div className="font-bold text-neutral-900">{r.name}</div>
                            <div>{r.role} — {r.company}</div>
                            {r.email && <div className="text-neutral-500">{r.email}</div>}
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
              <section key={custom.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {sec.title || custom.title}
                  </h2>
                  <div className="h-px flex-1 bg-[#EBE8E1]" />
                </div>
                <div className="space-y-2">
                  {custom.items.map((item) => (
                    <div key={item.id} className="p-3 bg-[#FAF9F6] rounded-lg border border-[#EFECE6] space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-neutral-900">
                        <span>{item.title} {item.subtitle ? `— ${item.subtitle}` : ''}</span>
                        {item.date && <span className="font-mono text-neutral-500">{item.date}</span>}
                      </div>
                      {item.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-neutral-700 pt-0.5">
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
