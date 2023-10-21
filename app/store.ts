import { create } from 'zustand';

type AnimationStore = {
  lessonsLearnedSubtitleScaleDownTl: gsap.core.Timeline | null;
  setLessonsLearnedSubtitleScaleDownTl: (tl: gsap.core.Timeline) => void;
  resetLessonsLearnedSubtitleScaleDownTl: () => void;
};

export const useAnimationStore = create<AnimationStore>((set) => ({
  lessonsLearnedSubtitleScaleDownTl: null,
  setLessonsLearnedSubtitleScaleDownTl: (tl) =>
    set({ lessonsLearnedSubtitleScaleDownTl: tl }),
  resetLessonsLearnedSubtitleScaleDownTl: () =>
    set({ lessonsLearnedSubtitleScaleDownTl: null }),
}));
