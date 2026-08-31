import { atom } from 'nanostores';

const STORAGE_CV_KEY = 'rendgra_custom_cv_data_v1';
const STORAGE_CV_NAME_KEY = 'rendgra_custom_cv_name_v1';

const DEFAULT_CV_URL = '/cv'; // Or direct download
const DEFAULT_CV_NAME = 'Rendgra-Agrida-Senior-Software-Engineer-CV.pdf';

const getInitialCvUrl = (): string => {
  if (typeof window === 'undefined') return DEFAULT_CV_URL;
  try {
    const saved = localStorage.getItem(STORAGE_CV_KEY);
    if (saved) return saved;
  } catch (e) {}
  return DEFAULT_CV_URL;
};

const getInitialCvName = (): string => {
  if (typeof window === 'undefined') return DEFAULT_CV_NAME;
  try {
    const saved = localStorage.getItem(STORAGE_CV_NAME_KEY);
    if (saved) return saved;
  } catch (e) {}
  return DEFAULT_CV_NAME;
};

export const $cvUrl = atom<string>(getInitialCvUrl());
export const $cvFileName = atom<string>(getInitialCvName());

export const setCustomCv = (dataUrl: string, fileName: string) => {
  $cvUrl.set(dataUrl);
  $cvFileName.set(fileName);
  try {
    localStorage.setItem(STORAGE_CV_KEY, dataUrl);
    localStorage.setItem(STORAGE_CV_NAME_KEY, fileName);
  } catch (e) {
    console.warn('Gagal menyimpan file CV ke localStorage:', e);
  }
};

export const resetCv = () => {
  $cvUrl.set(DEFAULT_CV_URL);
  $cvFileName.set(DEFAULT_CV_NAME);
  try {
    localStorage.removeItem(STORAGE_CV_KEY);
    localStorage.removeItem(STORAGE_CV_NAME_KEY);
  } catch (e) {}
};
