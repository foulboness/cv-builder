import React from 'react';
import { CVData } from '../../../types';
import { formatDate } from '../TemplateComponents';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

export const ExecutiveTemplate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, customSections, sectionsOrder, theme } = data;
  const accent = theme.accentColor || '#18181B';

  const visibleMap = new Map(sectionsOrder.map((s) => [s.id, s.isVisible]));
  const isSecVisible = (id: string) => visibleMap.get(id) !== false;

  return (
    <div className="w-full bg-white text-[#18181B] min-h-full grid grid-cols-12">
      {/* Left Sidebar (35% width approx -> 4 of 12 cols) */}
      <aside className="col-span-4 bg-[#F7F6F2] p-6 border-r border-neutral-200/80 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Avatar & Header */}
          <div className="space-y-3">
            {personal.showAvatar && personal.avatarUrl && (
              <img
                src={personal.avatarUrl}
                alt={personal.fullName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-xs mx-auto"
              />
            )}
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 leading-tight">
                {personal.fullName || 'Your Name'}
              </h1>
              {personal.jobTitle && (
                <p className="text-xs font-semibold mt-1 tracking-wide" style={{ color: accent }}>
                  {personal.jobTitle}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 pt-2 border-t border-neutral-200/60 text-xs">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Contact
            </h2>
            <div className="space-y-2 text-neutral-600">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0 text-neutral-400" />
                  <a href={`mailto:${personal.email}`} className="truncate hover:underline">
                    {personal.email}
                  </a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className="shrink-0 text-neutral-400" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="shrink-0 text-neutral-400" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe size={12} className="shrink-0 text-neutral-400" />
                  <a
                    href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:underline"
                  >
                    {personal.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={12} className="shrink-0 text-neutral-400" />
                  <a
                    href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:underline"
                  >
                    {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                  </a>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-2">
                  <Github size={12} className="shrink-0 text-neutral-400" />
                  <a
                    href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:underline"
                  >
                    {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {isSecVisible('education') && education?.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-neutral-200/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="text-xs space-y-0.5">
                    <div className="font-semibold text-neutral-900">
                      {item.degree} {item.field ? `in ${item.field}` : ''}
                    </div>
                    <div className="text-neutral-600">{item.school}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {formatDate(item.startDate)} – {formatDate(item.endDate)}
                    </div>
                    {item.honors && <div className="text-[11px] text-neutral-500 italic mt-0.5">{item.honors}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {isSecVisible('skills') && skills?.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-neutral-200/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Expertise & Skills
              </h2>
              <div className="space-y-3">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-1 text-xs">
                    <div className="font-semibold text-neutral-800 text-[11px]">{cat.categoryName}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-neutral-700 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {isSecVisible('certifications') && certifications?.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-200/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Certifications
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="space-y-0.5">
                    <div className="font-medium text-neutral-900">{cert.title}</div>
                    <div className="text-[11px] text-neutral-500">
                      {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {isSecVisible('languages') && languages?.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-200/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Languages
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-neutral-700">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-[11px] text-neutral-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right Content Area (8 of 12 cols) */}
      <main className="col-span-8 p-7 space-y-6">
        {/* Profile Summary */}
        {isSecVisible('summary') && summary?.content && (
          <section className="space-y-2">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Executive Summary
            </h2>
            <p className="text-xs/relaxed text-neutral-700 leading-relaxed whitespace-pre-line">
              {summary.content}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {isSecVisible('experience') && experience?.length > 0 && (
          <section className="space-y-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-sm font-semibold text-neutral-900">{item.role}</span>
                      {item.company && (
                        <span className="text-xs font-medium text-neutral-600">
                          {' '}
                          | {item.company}
                          {item.location ? `, ${item.location}` : ''}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-neutral-500 font-mono shrink-0">
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
        )}

        {/* Projects */}
        {isSecVisible('projects') && projects?.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ borderColor: accent, color: accent }}
            >
              Key Initiatives & Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-center gap-1.5">
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
        )}

        {/* Custom Sections */}
        {customSections?.map((custom) => {
          if (!isSecVisible(custom.id) || custom.items?.length === 0) return null;
          return (
            <section key={custom.id} className="space-y-3">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
                style={{ borderColor: accent, color: accent }}
              >
                {custom.title}
              </h2>
              <div className="space-y-2.5">
                {custom.items.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold text-neutral-900">{item.title}</span>
                      {item.date && <span className="text-xs text-neutral-500 font-mono">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-xs text-neutral-600">{item.subtitle}</div>}
                    {item.highlights?.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-neutral-700 mt-1">
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
        })}

        {/* References */}
        {isSecVisible('references') && references?.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-neutral-100">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1"
              style={{ color: accent }}
            >
              References
            </h2>
            {references.every((r) => r.isAvailableUponRequest) ? (
              <p className="text-xs text-neutral-500 italic">Available upon request.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {references.map((ref) =>
                  ref.isAvailableUponRequest ? null : (
                    <div key={ref.id} className="space-y-0.5">
                      <div className="font-semibold text-neutral-900">{ref.name}</div>
                      <div className="text-neutral-600">{ref.role} — {ref.company}</div>
                      {ref.email && <div className="text-neutral-500">{ref.email}</div>}
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};
