import { atom } from 'nanostores';

export type MainTabType = 'experience' | 'projects' | 'stack';

export const $activeTab = atom<MainTabType>('experience');
export const $showPortfolioGen = atom<boolean>(false);
export const $showContact = atom<boolean>(false);
export const $showGallery = atom<boolean>(false);

export const togglePortfolioGen = () => {
  const current = $showPortfolioGen.get();
  if (!current) {
    $showContact.set(false);
    $showGallery.set(false);
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
    $showGallery.set(false);
    $showContact.set(true);
    setTimeout(() => {
      document.getElementById('main-tab-navigator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  } else {
    $showContact.set(false);
  }
};

export const toggleGallery = () => {
  const current = $showGallery.get();
  if (!current) {
    $showPortfolioGen.set(false);
    $showContact.set(false);
    $showGallery.set(true);
  } else {
    $showGallery.set(false);
  }
};

export const selectMainTab = (tab: MainTabType) => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $showGallery.set(false);
  $activeTab.set(tab);
};

export const closeOverlays = () => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $showGallery.set(false);
};
