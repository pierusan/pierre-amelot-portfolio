'use client';
import captionStyles from './caption.module.css';
import { cn } from '@/cn';

export const gapTextCaptions = 88;
export const dotSize = 14;
export function CaptionLineStartingDot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dotSize}
      height={dotSize}
      viewBox="0 0 10 10"
      fill="currentColor"
    >
      <circle cx="5" cy="5" r="5" />
    </svg>
  );
}
export function CaptionLineSm({
  dotIsOnTop,
  captionY,
  captionHeight,
  dotY,
  dotX,
}: {
  dotIsOnTop: boolean;
  captionY: number;
  captionHeight: number;
  dotY: number;
  dotX: number;
}) {
  return (
    // Dot -> Caption
    <div
      className={cn(
        'absolute border-l border-action',
        dotIsOnTop
          ? captionStyles['grow-to-top']
          : captionStyles['grow-to-bottom'],
        captionStyles['line-sm'],
        captionStyles['polyline-1']
      )}
      style={{
        ...(dotIsOnTop
          ? {
              top: `${captionY + captionHeight}px`,
              bottom: `calc(100% - ${dotY}px)`,
            }
          : {
              top: `${dotY + dotSize}px`,
              bottom: `calc(100% - ${captionY}px)`,
            }),
        left: `${dotX + dotSize / 2}px`,
      }}
    />
  );
}
export function CaptionPolylineSm({
  dotIsOnTop,
  captionY,
  captionHeight,
  dotY,
  dotX,
  captionX,
  captionWidth,
}: {
  dotIsOnTop: boolean;
  captionY: number;
  captionHeight: number;
  dotY: number;
  dotX: number;
  captionX: number;
  captionWidth: number;
}) {
  return (
    <>
      {/* Dot down/up */}
      <div
        className={cn(
          'absolute border-l border-action',
          dotIsOnTop
            ? captionStyles['grow-to-top']
            : captionStyles['grow-to-bottom'],
          captionStyles['polyline-sm'],
          captionStyles['polyline-1']
        )}
        style={{
          ...(dotIsOnTop
            ? {
                top: `${(captionY + captionHeight + dotY) / 2}px`,
                bottom: `calc(100% - ${dotY}px)`,
              }
            : {
                top: `calc(${dotY + dotSize - 1}px)`,
                bottom: `calc(100% - ${dotY + dotSize}px - ${
                  captionY - dotY - dotSize
                }px/2 - 1px)`,
              }),
          left: `calc(${dotX + dotSize / 2 - 1}px)`,
        }}
      />
      {/* Horizontal line to caption center */}
      <div
        className={cn(
          'absolute border-t border-action',
          dotX + dotSize / 2 > captionX + captionWidth / 2
            ? captionStyles['grow-to-left']
            : captionStyles['grow-to-right'],
          captionStyles['polyline-sm'],
          captionStyles['polyline-2']
        )}
        style={{
          ...(dotIsOnTop
            ? { top: `${(captionY + captionHeight + dotY) / 2}px` }
            : { top: `${(captionY + (dotY + dotSize)) / 2}px` }),
          right: `min(calc(100% - ${dotX + dotSize / 2}px),calc(100% - ${
            captionX + captionWidth / 2
          }px))`,
          left: `min(${dotX + dotSize / 2}px,${captionX + captionWidth / 2}px)`,
        }}
      />
      {/* Up/down to caption center */}
      <div
        className={cn(
          'absolute border-l border-action',
          dotIsOnTop
            ? captionStyles['grow-to-top']
            : captionStyles['grow-to-bottom'],
          captionStyles['polyline-sm'],
          captionStyles['polyline-3']
        )}
        style={{
          ...(dotIsOnTop
            ? {
                top: `${captionY + captionHeight}px`,
                bottom: `calc(100% - ${
                  (captionY + captionHeight + dotY) / 2
                }px - 1px)`,
              }
            : {
                top: `${(captionY + (dotY + dotSize)) / 2}px`,
                bottom: `calc(100% - ${captionY}px)`,
              }),
          left: `${captionX + captionWidth / 2}px`,
        }}
      />
    </>
  );
}
export function CaptionPolylineXL({
  dotIsOnTop,
  dotX,
  dotY,
  captionY,
  captionLineEndY,
}: {
  dotIsOnTop: boolean;
  dotX: number;
  dotY: number;
  captionY: number;
  captionLineEndY: number;
}) {
  return (
    <>
      {/* Dot up/down to paragraph top/bottom edge */}
      <div
        className={cn(
          'absolute border-l border-action',
          dotIsOnTop
            ? captionStyles['grow-to-top']
            : captionStyles['grow-to-bottom'],
          captionStyles['polyline-xl'],
          captionStyles['polyline-1']
        )}
        style={{
          left: dotX + dotSize / 2,
          ...(dotIsOnTop
            ? {
                top: 0,
                bottom: `calc(100% - ${dotY + dotSize / 2}px)`,
              }
            : { top: dotY + dotSize / 2, bottom: 0 }),
        }}
      />
      {/* Right along Paragraph top/bottom edge */}
      <div
        className={cn(
          'absolute border-t border-action',
          captionStyles['grow-to-right'],
          captionStyles['polyline-xl'],
          captionStyles['polyline-2']
        )}
        style={{
          left: dotX + dotSize / 2,
          right: 0,
          ...(dotIsOnTop
            ? { top: Math.min(0, dotY + dotSize / 2) }
            : {
                bottom: `min(0px,calc(100% - ${dotY + dotSize / 2}px))`,
              }),
        }}
      />
      {/* Down/up on paragraph right edge to center of captioned text */}
      <div
        className={cn(
          'absolute border-l border-action',
          dotIsOnTop
            ? captionStyles['grow-to-bottom']
            : captionStyles['grow-to-top'],
          captionStyles['polyline-xl'],
          captionStyles['polyline-3']
        )}
        style={{
          right: 0,
          ...(dotIsOnTop
            ? {
                top: Math.min(0, dotY + dotSize / 2),
                bottom: `calc(100% - ${captionLineEndY + captionY + 1}px)`,
              }
            : {
                top: captionLineEndY + captionY,
                bottom: `min(0px,calc(100% - ${dotY + dotSize / 2}px))`,
              }),
        }}
      />
      {/* Right from paragraph right edge to caption */}
      <div
        className={cn(
          'absolute border-t border-action',
          captionStyles['grow-to-right'],
          captionStyles['polyline-xl'],
          captionStyles['polyline-4']
        )}
        style={{
          right: `-${gapTextCaptions - 16}px`, // 16px is the padding of the caption
          width: `${gapTextCaptions - 16}px`,
          top: captionLineEndY + captionY,
        }}
      />
    </>
  );
}
