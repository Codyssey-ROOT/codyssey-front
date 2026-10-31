import { create } from "zustand";

interface PhotoDraftState {
  originalFile: File | null;
  setOriginalFile: (file: File) => void;
  reset: () => void;
}

export const usePhotoDraftStore = create<PhotoDraftState>((set) => ({
  originalFile: null,
  setOriginalFile: (file) => set({ originalFile: file }),
  reset: () => set({ originalFile: null }),
}));
