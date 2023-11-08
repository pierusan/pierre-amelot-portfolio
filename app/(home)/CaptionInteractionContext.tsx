'use client';
import { createContext } from 'react';

export const CaptionInteractionContext = createContext<{
  incrementNumberOfCaptionsHovered: () => void;
  numberCaptionsHovered: number;
  captionsShouldFlicker: boolean;
}>({
  incrementNumberOfCaptionsHovered: () => {
    throw 'Should be implemented';
  },
  numberCaptionsHovered: 0,
  captionsShouldFlicker: false,
});
