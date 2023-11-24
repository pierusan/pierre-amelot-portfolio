import { type ComponentProps } from 'react';
import { RemoteImage } from '../_common/components/RemoteMedia'; // Don't use ts paths remap here to play nicely with MDX Intellisense

export function ProjectImageWithCaption({
  caption,
  ...remoteImageProps
}: { caption: string } & ComponentProps<typeof RemoteImage>) {
  return (
    <figure className="mb-8 mt-9 flex flex-col gap-[0.5rem] md:mb-14">
      <RemoteImage {...remoteImageProps} />
      <figcaption className="text-center text-details-md uppercase text-main-subtle">
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}
