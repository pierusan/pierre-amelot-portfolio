import { type ReactNode } from 'react';
import {
  RemoteImage,
  RemoteImageName,
} from '../_common/components/RemoteMedia/RemoteImage'; // Don't use ts paths remap here to play nicely with MDX Intellisense
import { cn } from '@/cn';

export function ProjectParagraphWithImages({
  imageNames,
  imageWidth,
  children,
  imageClassName,
}: {
  imageNames: RemoteImageName[];
  imageWidth: string;
  children: ReactNode;
  imageClassName?: string;
}) {
  return (
    <div>
      <div
        className={cn(
          'float-left pr-2xs pt-3xs',
          'flex flex-col gap-[0.25rem]',
          imageClassName
        )}
      >
        {imageNames.map((imageName) => (
          <RemoteImage
            key={imageName}
            sizes={imageWidth}
            name={imageName}
            style={{ width: imageWidth }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
