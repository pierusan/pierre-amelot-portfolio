import { type ComponentProps } from 'react';
import { RemoteImage } from '../_common/components/RemoteImage'; // Don't use ts paths remap here to play nicely with MDX Intellisense

export function ProjectImageWithCaption({
  caption,
  ...remoteImageProps
}: { caption: string } & ComponentProps<typeof RemoteImage>) {
  return (
    <figure className="mb-14 mt-9 flex flex-col gap-[0.5rem]">
      <RemoteImage {...remoteImageProps} />
      <figcaption className="text-center text-details-md uppercase text-main-subtle">
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}
