import React, { useRef } from 'react';
import { PersonalInfo } from '../../../types';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Linkedin, Github, Upload, Trash2, Eye, EyeOff } from 'lucide-react';

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  onChange: (updates: Partial<PersonalInfo>) => void;
}

export const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange({ avatarUrl: result, showAvatar: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo / Avatar uploader */}
      <div className="p-3.5 bg-[#FAF9F6] border border-[#EBE8E1] rounded-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-full bg-neutral-200 border border-neutral-300 overflow-hidden flex items-center justify-center shrink-0">
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={24} className="text-neutral-400" />
            )}
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-800">Applicant Photo</div>
            <div className="text-[11px] text-neutral-500">Optional headshot for modern templates</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium rounded-md shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload size={12} />
            <span>Upload</span>
          </button>
          {data.avatarUrl && (
            <>
              <button
                type="button"
                onClick={() => onChange({ showAvatar: !data.showAvatar })}
                className="p-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-md transition-colors"
                title={data.showAvatar ? 'Hide Photo from CV' : 'Show Photo on CV'}
              >
                {data.showAvatar ? <Eye size={13} className="text-neutral-800" /> : <EyeOff size={13} className="text-neutral-400" />}
              </button>
              <button
                type="button"
                onClick={() => onChange({ avatarUrl: '', showAvatar: false })}
                className="p-1.5 bg-white hover:bg-red-50 border border-neutral-200 text-red-500 rounded-md transition-colors"
                title="Remove Photo"
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Basic Info inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <User size={12} className="text-neutral-400" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Elena Rostova"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Briefcase size={12} className="text-neutral-400" />
            <span>Professional Title</span>
          </label>
          <input
            type="text"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            placeholder="e.g. Staff Product Designer"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Mail size={12} className="text-neutral-400" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="elena@example.com"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Phone size={12} className="text-neutral-400" />
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 019-2834"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <MapPin size={12} className="text-neutral-400" />
            <span>Location</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. San Francisco, CA (or Remote)"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Globe size={12} className="text-neutral-400" />
            <span>Website / Portfolio</span>
          </label>
          <input
            type="text"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://portfolio.design"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Linkedin size={12} className="text-neutral-400" />
            <span>LinkedIn Profile</span>
          </label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <Github size={12} className="text-neutral-400" />
            <span>GitHub / Extra Link (Optional)</span>
          </label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="github.com/username"
            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
