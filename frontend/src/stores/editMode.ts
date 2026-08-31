import { atom } from 'nanostores';

const STORAGE_EDIT_MODE_KEY = 'rendgra_global_edit_mode_v1';

export const $isGlobalEditMode = atom<boolean>(false);

export const toggleGlobalEditMode = () => {
  const current = $isGlobalEditMode.get();
  const next = !current;
  $isGlobalEditMode.set(next);
};

export const setGlobalEditMode = (val: boolean) => {
  $isGlobalEditMode.set(val);
};
