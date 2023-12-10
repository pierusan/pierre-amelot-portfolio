import { type ComponentProps } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { ProjectFigure } from './ProjectFigure';
import { RemoteImage } from './../_common/components/RemoteMedia'; // Don't use ts paths remap here to play nicely with MDX Intellisense
import tailwindConfig from '@configs/tailwind.config';

const tailwindTheme = resolveConfig(tailwindConfig).theme;
const projectContentWidth = tailwindTheme.width['paragraph-md'];
const lgBreakpoint = tailwindTheme.screens.lg;

export function ProjectImage({
  caption,
  ...remoteImageProps
}: { caption?: string } & Omit<ComponentProps<typeof RemoteImage>, 'sizes'>) {
  return (
    <ProjectFigure caption={caption}>
      <RemoteImage
        sizes={`(min-width:${lgBreakpoint}) ${projectContentWidth}, min(100vw, ${projectContentWidth})`}
        {...remoteImageProps}
      />
    </ProjectFigure>
  );
}
