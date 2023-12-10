import { type ReactNode } from 'react';
import {
  RemoteImage,
  RemoteImageName,
} from './../_common/components/RemoteMedia/RemoteImage'; // Don't use ts paths remap here to play nicely with MDX Intellisense
import { cn } from '@/cn';

export function ProjectParagraphWithImage({
  imageName,
  imageWidth,
  children,
  imageClassName,
}: {
  imageName: RemoteImageName;
  imageWidth: string;
  children: ReactNode;
  imageClassName?: string;
}) {
  return (
    <div>
      <RemoteImage
        sizes={imageWidth}
        name={imageName}
        className={cn('float-left pr-2xs pt-3xs', imageClassName)}
        style={{ width: imageWidth }}
      />
      {children}
    </div>
  );
}
