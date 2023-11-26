import { type ComponentProps } from 'react';
import { RemoteVideo } from '../_common/components/RemoteMedia'; // Don't use ts paths remap here to play nicely with MDX Intellisense
import { ProjectFigure } from './ProjectFigure';

export function ProjectVideo({
  caption,
  autoPlay = true,
  controls = true,
  muted = true,
  loop = true,
  ...remoteVideoProps
}: { caption?: string } & ComponentProps<typeof RemoteVideo>) {
  return (
    <ProjectFigure caption={caption}>
      <RemoteVideo
        {...{ autoPlay, controls, muted, loop, ...remoteVideoProps }}
      />
    </ProjectFigure>
  );
}
