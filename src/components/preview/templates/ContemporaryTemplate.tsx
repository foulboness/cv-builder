import React from 'react';
import { CVData } from '../../../types';
import { ContactList, formatDate } from '../TemplateComponents';
import { ExternalLink } from 'lucide-react';

export const ContemporaryTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, customSections, sectionsOrder, theme } = data;
  const accent = theme.accentColor || '#18181B';

  const visibleSections = sectionsOrder.filter((s) => s.isVisible);

  return (
    <div className="w-full bg-white text-[#18181B] min-h-full space-y-5">
      {/* Contemporary Top Banner */}
      <header className="flex items-start justify-between gap-6 pb-4 border-b-2" style={{ borderColor: accent }}>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="text-sm font-semibold tracking-wide text-neutral-600">
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
            className="w-18 h-18 rounded-full object-cover border-2 shadow-xs"
            style={{ borderColor: accent }}
          />
        )}
      </header>

      {/* Sections */}
      <div className="space-y-5">
        {visibleSections.map((sec) => {
          if (sec.id === 'personal') return null;

          if (sec.id === 'summary' && summary?.content) {
            return (
              <section key="summary" className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Profile'}
                  </h2>
                </div>
                <p className="text-xs/relaxed text-neutral-700 leading-relaxed pl-4 whitespace-pre-line">
                  {summary.content}
                </p>
              </section>
            );
          }

          if (sec.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Experience'}
                  </h2>
                </div>
                <div className="space-y-3.5 pl-4 border-l border-neutral-200 ml-1.5">
                  {experience.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-neutral-900">{item.role}</span>
                          {item.company && (
                            <span className="text-xs font-medium text-neutral-600">
                              {' '}
                              @ {item.company}
                              {item.location ? ` (${item.location})` : ''}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                          {formatDate(item.startDate)} – {formatDate(item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-neutral-500 italic">{item.description}</p>
                      )}
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

          if (sec.id === 'education' && education?.length > 0) {
            return (
              <section key="education" className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Education'}
                  </h2>
                </div>
                <div className="space-y-2 pl-4 border-l border-neutral-200 ml-1.5">
                  {education.map((item) => (
                    <div key={item.id} className="flex items-baseline justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          {item.degree} {item.field ? `in ${item.field}` : ''}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {item.school} {item.location ? `· ${item.location}` : ''}
                          {item.gpa ? ` (GPA: ${item.gpa})` : ''}
                        </div>
                        {item.honors && <div className="text-[11px] text-neutral-500 italic">{item.honors}</div>}
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
              <section key="skills" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Skills'}
                  </h2>
                </div>
                <div className="pl-4 space-y-1.5">
                  {skills.map((cat) => (
                    <div key={cat.id} className="text-xs">
                      <span className="font-semibold text-neutral-900 mr-2">{cat.categoryName}:</span>
                      <span className="text-neutral-700">{cat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Projects'}
                  </h2>
                </div>
                <div className="space-y-2.5 pl-4 border-l border-neutral-200 ml-1.5">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-0.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-900">{proj.title}</span>
                          {proj.role && <span className="text-[11px] text-neutral-500">({proj.role})</span>}
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
                      {proj.techStack?.length > 0 && (
                        <p className="text-[11px] text-neutral-500 font-mono">
                          Tech: {proj.techStack.join(', ')}
                        </p>
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
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Certifications'}
                  </h2>
                </div>
                <div className="pl-4 grid grid-cols-2 gap-2 text-xs">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-neutral-900">{c.title}</span>
                      <span className="text-neutral-500 text-[11px]"> — {c.issuer}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'Languages'}
                  </h2>
                </div>
                <div className="pl-4 flex flex-wrap gap-4 text-xs">
                  {languages.map((l) => (
                    <span key={l.id}>
                      <strong className="text-neutral-900">{l.language}</strong> ({l.proficiency})
                    </span>
                  ))}
                </div>
              </section>
            );
          }

          if (sec.id === 'references' && references?.length > 0) {
            return (
              <section key="references" className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || 'References'}
                  </h2>
                </div>
                <div className="pl-4 text-xs text-neutral-600">
                  {references.every((r) => r.isAvailableUponRequest) ? (
                    <p className="italic">Available upon request.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {references.map((r) =>
                        r.isAvailableUponRequest ? null : (
                          <div key={r.id}>
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
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {sec.title || custom.title}
                  </h2>
                </div>
                <div className="pl-4 space-y-2">
                  {custom.items.map((item) => (
                    <div key={item.id} className="space-y-0.5 text-xs">
                      <div className="flex justify-between font-bold text-neutral-900">
                        <span>{item.title} {item.subtitle ? `— ${item.subtitle}` : ''}</span>
                        {item.date && <span className="font-mono text-neutral-500">{item.date}</span>}
                      </div>
                      {item.highlights?.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-neutral-700">
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
