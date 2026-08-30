// Dynamic Base URL mendukung environment variable di Vercel/Production maupun Localhost
const BASE_URL = (import.meta.env.PUBLIC_API_URL as string | undefined) || 'http://localhost:3000';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ProjectData {
  id: number;
  title: string;
  titleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  techStack: string | null;
}

// Client API terisolasi & andal untuk Frontend Astro/React
export const api = {
  api: {
    projects: {
      get: async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/projects`, {
            headers: { 'Accept': 'application/json' },
          });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          return { data: data as ProjectData[], error: null };
        } catch (err) {
          return { data: null, error: err instanceof Error ? err.message : 'Network error' };
        }
      },
    },
    contact: {
      post: async (payload: ContactPayload) => {
        try {
          const res = await fetch(`${BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok) {
            return { data: null, error: data.message || 'Gagal mengirim pesan' };
          }
          return { data, error: null };
        } catch (err) {
          return { data: null, error: err instanceof Error ? err.message : 'Network error' };
        }
      },
    },
  },
};
