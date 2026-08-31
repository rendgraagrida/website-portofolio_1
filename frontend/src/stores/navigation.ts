import { atom } from 'nanostores';

export type MainTabType = 'experience' | 'projects' | 'stack';

export const $activeTab = atom<MainTabType>('experience');
export const $showPortfolioGen = atom<boolean>(false);
export const $showContact = atom<boolean>(false);

export const togglePortfolioGen = () => {
  const current = $showPortfolioGen.get();
  if (!current) {
    $showContact.set(false);
    $showPortfolioGen.set(true);
    // Smooth scroll down to main viewer if needed
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
    // Smooth scroll down to main viewer if needed
    setTimeout(() => {
      document.getElementById('main-tab-navigator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  } else {
    $showContact.set(false);
  }
};

export const selectMainTab = (tab: MainTabType) => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
  $activeTab.set(tab);
};

export const closeOverlays = () => {
  $showPortfolioGen.set(false);
  $showContact.set(false);
};
