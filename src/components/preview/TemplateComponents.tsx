import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { PersonalInfo } from '../../types';

export function ContactList({
  personal,
  className = '',
  itemClassName = '',
  accentColor,
  iconSize = 13,
}: {
  personal: PersonalInfo;
  className?: string;
  itemClassName?: string;
  accentColor?: string;
  iconSize?: number;
}) {
  const items = [
    personal.email && {
      icon: Mail,
      text: personal.email,
      href: `mailto:${personal.email}`,
    },
    personal.phone && {
      icon: Phone,
      text: personal.phone,
      href: `tel:${personal.phone}`,
    },
    personal.location && {
      icon: MapPin,
      text: personal.location,
    },
    personal.website && {
      icon: Globe,
      text: personal.website.replace(/^https?:\/\//, ''),
      href: personal.website.startsWith('http') ? personal.website : `https://${personal.website}`,
    },
    personal.linkedin && {
      icon: Linkedin,
      text: personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/'),
      href: personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`,
    },
    personal.github && {
      icon: Github,
      text: personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/'),
      href: personal.github.startsWith('http') ? personal.github : `https://${personal.github}`,
    },
  ].filter(Boolean) as { icon: React.ElementType; text: string; href?: string }[];

  if (items.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${className}`}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className={`inline-flex items-center gap-1.5 text-xs text-neutral-600 ${itemClassName}`}>
            <Icon size={iconSize} className="shrink-0 text-neutral-400" style={{ color: accentColor ? accentColor : undefined }} />
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" className="hover:underline text-inherit">
                {item.text}
              </a>
            ) : (
              <span>{item.text}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function formatDate(dateStr?: string, isCurrent: boolean = false): string {
  if (isCurrent) return 'Present';
  if (!dateStr) return '';
  // Convert YYYY-MM to Month YYYY
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const idx = parseInt(month, 10) - 1;
    return `${monthNames[idx] || month} ${year}`;
  }
  return dateStr;
}
