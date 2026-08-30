const BASE_URL = 'http://localhost:3000';

// Helper ringan pengganti edenTreaty tanpa import tipe dari backend
export const api = {
  api: {
    projects: {
      get: async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/projects`);
          const data = await res.json();
          return { data, error: null };
        } catch (err) {
          return { data: null, error: err };
        }
      }
    }
  }
};

