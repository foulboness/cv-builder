import { CVData } from '../types';
import { sampleCVProductDesigner } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'cv_builder_active_data_v1';
const SAVED_PROFILES_KEY = 'cv_builder_saved_profiles_v1';

export interface SavedProfileMeta {
  id: string;
  title: string;
  updatedAt: string;
  template: string;
}

export function loadCVData(): CVData {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.personal && parsed.theme) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse saved CV data, falling back to sample:', err);
  }
  return sampleCVProductDesigner;
}

export function saveCVData(data: CVData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save CV data to localStorage:', err);
  }
}

export function getSavedProfiles(): SavedProfileMeta[] {
  try {
    const raw = localStorage.getItem(SAVED_PROFILES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveCurrentAsProfile(name: string, data: CVData): SavedProfileMeta[] {
  try {
    const profiles = getSavedProfiles();
    const newProfile: SavedProfileMeta = {
      id: `profile-${Date.now()}`,
      title: name || data.personal.fullName || 'Untitled CV',
      updatedAt: new Date().toISOString(),
      template: data.theme.template,
    };
    const updated = [newProfile, ...profiles.slice(0, 9)];
    localStorage.setItem(SAVED_PROFILES_KEY, JSON.stringify(updated));
    localStorage.setItem(`cv_profile_${newProfile.id}`, JSON.stringify(data));
    return updated;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function loadProfileById(profileId: string): CVData | null {
  try {
    const raw = localStorage.getItem(`cv_profile_${profileId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function exportCVToJSON(data: CVData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `${(data.personal.fullName || 'CV').toLowerCase().replace(/\s+/g, '_')}_resume.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importCVFromJSON(file: File): Promise<CVData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === 'object' && parsed.personal) {
          resolve(parsed as CVData);
        } else {
          reject(new Error('Invalid CV JSON file structure'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });
}
