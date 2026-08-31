import { atom, computed } from 'nanostores';

export interface AuthUser {
  email: string;
  name: string;
  role: 'owner' | 'guest';
}

export const OWNER_EMAIL = 'rendgraagrida@gmail.com';

const STORAGE_AUTH_KEY = 'rendgra_auth_session_v1';

// Initial state from localStorage
const getInitialUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_AUTH_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Gagal membaca sesi auth:', e);
  }
  return null;
};

export const $currentUser = atom<AuthUser | null>(getInitialUser());
export const $showSignInModal = atom<boolean>(false);
export const $showProfileEditModal = atom<boolean>(false);

export const $isAuthenticated = computed($currentUser, (user) => user !== null);
export const $isOwner = computed($currentUser, (user) => user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase());

export const openSignInModal = () => $showSignInModal.set(true);
export const closeSignInModal = () => $showSignInModal.set(false);

export const openProfileEditModal = () => $showProfileEditModal.set(true);
export const closeProfileEditModal = () => $showProfileEditModal.set(false);

export const signIn = (email: string, name?: string): AuthUser => {
  const isOwnerUser = email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase();
  const user: AuthUser = {
    email: email.trim().toLowerCase(),
    name: name || (isOwnerUser ? 'Rendgra Agrida' : email.split('@')[0]),
    role: isOwnerUser ? 'owner' : 'guest'
  };

  $currentUser.set(user);
  $showSignInModal.set(false);

  try {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(user));
  } catch (e) {}

  return user;
};

export const signOut = () => {
  $currentUser.set(null);
  $showProfileEditModal.set(false);
  try {
    localStorage.removeItem(STORAGE_AUTH_KEY);
  } catch (e) {}
};
