import React, { useState } from 'react';
import { CVData, SectionMeta } from '../../types';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { CertificationsEditor } from './sections/CertificationsEditor';
import { LanguagesEditor } from './sections/LanguagesEditor';
import { ReferencesEditor } from './sections/ReferencesEditor';
import { CustomSectionsEditor } from './sections/CustomSectionsEditor';
import { SectionOrderManager } from './SectionOrderManager';
import { AppearanceEditor } from './AppearanceEditor';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  Languages,
  Users,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  ArrowUpDown,
  Search,
} from 'lucide-react';

interface EditorPanelProps {
  data: CVData;
  onChange: (updated: CVData) => void;
}

type TabType = 'content' | 'appearance' | 'reorder';

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdate = (field: keyof CVData, val: any) => {
    onChange({
      ...data,
      [field]: val,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleAddCustomToOrder = (sectionId: string, title: string) => {
    const newSectionMeta: SectionMeta = {
      id: sectionId,
      title,
      isVisible: true,
      isCustom: true,
    };
    onChange({
      ...data,
      sectionsOrder: [...data.sectionsOrder, newSectionMeta],
    });
  };

  const handleRemoveCustomFromOrder = (sectionId: string) => {
    onChange({
      ...data,
      sectionsOrder: data.sectionsOrder.filter((s) => s.id !== sectionId),
    });
  };

  // Section icons configuration
  const sectionIconMap: Record<string, React.ElementType> = {
    personal: User,
    summary: FileText,
    experience: Briefcase,
    education: GraduationCap,
    skills: Sparkles,
    projects: FolderGit2,
    certifications: Award,
    languages: Languages,
    references: Users,
  };

  // Section counter badges
  const getSectionBadge = (id: string) => {
    switch (id) {
      case 'experience':
        return `${data.experience.length}`;
      case 'education':
        return `${data.education.length}`;
      case 'skills':
        return `${data.skills.reduce((acc, cat) => acc + cat.skills.length, 0)} skills`;
      case 'projects':
        return `${data.projects.length}`;
      case 'certifications':
        return `${data.certifications.length}`;
      case 'languages':
        return `${data.languages.length}`;
      case 'references':
        return `${data.references.length}`;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F6] overflow-hidden no-print">
      {/* Editor Header Navigation Tabs */}
      <div className="p-3 bg-[#F4F3EE] border-b border-[#E2DDD5] shrink-0 space-y-2.5">
        <div className="flex bg-[#E8E4DA] p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileText size={13} />
            <span>Content</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'appearance'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sliders size={13} />
            <span>Appearance</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reorder')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'reorder'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ArrowUpDown size={13} />
            <span>Reorder</span>
          </button>
        </div>

        {/* Search bar inside content tab */}
        {activeTab === 'content' && (
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections or content..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        )}
      </div>

      {/* Editor Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* TAB 1: Content Sections */}
        {activeTab === 'content' && (
          <div className="space-y-3">
            {/* Render sections in active order */}
            {data.sectionsOrder.map((sectionMeta) => {
              const secId = sectionMeta.id;
              const Icon = sectionIconMap[secId] || Layers;
              const isOpen = openSections[secId] ?? false;
              const badge = getSectionBadge(secId);

              // Simple search filter
              if (
                searchQuery &&
                !sectionMeta.title.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                return null;
              }

              return (
                <div
                  key={secId}
                  className={`bg-white border rounded-xl overflow-hidden transition-all shadow-2xs ${
                    isOpen ? 'border-[#DCD7CD] ring-1 ring-black/5' : 'border-[#E8E5DE] hover:border-[#D8D4CC]'
                  }`}
                >
                  {/* Accordion trigger header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(secId)}
                    className="w-full p-3.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 bg-[#F4F2EB] text-neutral-700 rounded-lg shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-neutral-900">{sectionMeta.title}</span>
                        {!sectionMeta.isVisible && (
                          <span className="ml-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {badge && (
                        <span className="text-[10px] font-mono text-neutral-500 bg-[#F4F2EB] px-2 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                      <div className="text-neutral-400">
                        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </div>
                  </button>

                  {/* Accordion body content */}
                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-[#F2EFE8] bg-white">
                      {secId === 'personal' && (
                        <PersonalInfoEditor
                          data={data.personal}
                          onChange={(updates) => handleUpdate('personal', { ...data.personal, ...updates })}
                        />
                      )}

                      {secId === 'summary' && (
                        <SummaryEditor
                          data={data.summary}
                          onChange={(updates) => handleUpdate('summary', updates)}
                        />
                      )}

                      {secId === 'experience' && (
                        <ExperienceEditor
                          items={data.experience}
                          onChange={(items) => handleUpdate('experience', items)}
                        />
                      )}

                      {secId === 'education' && (
                        <EducationEditor
                          items={data.education}
                          onChange={(items) => handleUpdate('education', items)}
                        />
                      )}

                      {secId === 'skills' && (
                        <SkillsEditor
                          categories={data.skills}
                          onChange={(categories) => handleUpdate('skills', categories)}
                        />
                      )}

                      {secId === 'projects' && (
                        <ProjectsEditor
                          items={data.projects}
                          onChange={(items) => handleUpdate('projects', items)}
                        />
                      )}

                      {secId === 'certifications' && (
                        <CertificationsEditor
                          items={data.certifications}
                          onChange={(items) => handleUpdate('certifications', items)}
                        />
                      )}

                      {secId === 'languages' && (
                        <LanguagesEditor
                          items={data.languages}
                          onChange={(items) => handleUpdate('languages', items)}
                        />
                      )}

                      {secId === 'references' && (
                        <ReferencesEditor
                          items={data.references}
                          onChange={(items) => handleUpdate('references', items)}
                        />
                      )}

                      {/* Custom Section Body */}
                      {sectionMeta.isCustom && (
                        <CustomSectionsEditor
                          sections={data.customSections.filter((c) => c.id === secId)}
                          onChange={(updatedSections) => {
                            const otherCustoms = data.customSections.filter((c) => c.id !== secId);
                            handleUpdate('customSections', [...otherCustoms, ...updatedSections]);
                          }}
                          onAddSectionToOrder={handleAddCustomToOrder}
                          onRemoveSectionFromOrder={handleRemoveCustomFromOrder}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Manage Custom Sections Footer */}
            <div className="pt-2">
              <CustomSectionsEditor
                sections={data.customSections}
                onChange={(sections) => handleUpdate('customSections', sections)}
                onAddSectionToOrder={handleAddCustomToOrder}
                onRemoveSectionFromOrder={handleRemoveCustomFromOrder}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Appearance & Styling */}
        {activeTab === 'appearance' && (
          <AppearanceEditor
            theme={data.theme}
            onChange={(updates) => handleUpdate('theme', { ...data.theme, ...updates })}
          />
        )}

        {/* TAB 3: Section Reordering */}
        {activeTab === 'reorder' && (
          <SectionOrderManager
            sections={data.sectionsOrder}
            onChange={(sections) => handleUpdate('sectionsOrder', sections)}
          />
        )}
      </div>
    </div>
  );
};
