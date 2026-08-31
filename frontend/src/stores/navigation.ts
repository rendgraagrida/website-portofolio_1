import { atom } from 'nanostores';

export type NavigationMode = 'professional' | 'personal';
export type ProfessionalTab = 'experience' | 'projects' | 'stack';
export type PersonalTab = 'personality' | 'hobbies' | 'gallery';

export const $navMode = atom<NavigationMode>('professional');
export const $activeProfTab = atom<ProfessionalTab>('experience');
export const $activePersonalTab = atom<PersonalTab>('gallery');

export const $showPortfolioGen = atom<boolean>(false);
export const $showContact = atom<boolean>(false);
export const $showGallery = atom<boolean>(false);

// Toggle between Professional Mode and Personal Mode when clicking "Halo saya Rendgra"
export const togglePersonalMode = () => {
  const currentMode = $navMode.get();
  $showPortfolioGen.set(false);
  $showContact.set(false);

  if (currentMode === 'professional') {
    $navMode.set('personal');
    $activePersonalTab.set('gallery');
  } else {
    $navMode.set('professional');
  }

  setTimeout(() => {
    document.getElementById('main-tab-navigator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
};

export const toggleGallery = togglePersonalMode;

export const setNavigationMode = (mode: NavigationMode) => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $navMode.set(mode);
};

export const selectProfTab = (tab: ProfessionalTab) => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $navMode.set('professional');
  $activeProfTab.set(tab);
};

export const selectPersonalTab = (tab: PersonalTab) => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $navMode.set('personal');
  $activePersonalTab.set(tab);
};

export const togglePortfolioGen = () => {
  const current = $showPortfolioGen.get();
  if (!current) {
    $showContact.set(false);
    $showPortfolioGen.set(true);
    setTimeout(() => {
      document.getElementById('main-tab-navigator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  } else {
    $showPortfolioGen.set(false);
  }
};

export const toggleContact = () => {
  const current = $showContact.get();
  if (!current) {
    $showPortfolioGen.set(false);
    $showContact.set(true);
    setTimeout(() => {
      document.getElementById('main-tab-navigator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  } else {
    $showContact.set(false);
  }
};

export const closeOverlays = () => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
};
