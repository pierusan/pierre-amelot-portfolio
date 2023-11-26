import { type ComponentProps } from 'react';
import { RemoteImage } from '../_common/components/RemoteMedia'; // Don't use ts paths remap here to play nicely with MDX Intellisense
import { ProjectFigure } from './ProjectFigure';

export function ProjectImage({
  caption,
  ...remoteImageProps
}: { caption?: string } & ComponentProps<typeof RemoteImage>) {
  return (
    <ProjectFigure caption={caption}>
      <RemoteImage {...remoteImageProps} />
    </ProjectFigure>
  );
}
