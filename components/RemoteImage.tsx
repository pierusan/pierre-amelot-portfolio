import Image from 'next/image';
import { type ComponentProps } from 'react';

type ImageProps = ComponentProps<typeof Image>;
type RemoteImageProps = Required<
  Pick<ImageProps, 'alt' | 'src' | 'width' | 'height' | 'blurDataURL'>
>;

// blurDataURL is a base64-encoded string of a blurred version of the image.
// I generate them with https://blurred.dev
const remoteImages = {
  bali_hike: {
    src: 'https://storage.googleapis.com/pierre-portfolio-assets/pierre-portfolio-v2/Pierre_Jatiluwih.JPG',
    alt: 'Pierre in Jatiluwih, Bali',
    width: 6000,
    height: 4000,
    blurDataURL:
      'data:image/jpeg;base64,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',
  },
} as const satisfies Record<string, RemoteImageProps>;

export function RemoteImage({
  id,
  placeholder,
}: {
  id: keyof typeof remoteImages;
  placeholder?: ComponentProps<typeof Image>['placeholder'];
}) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...remoteImages[id]} placeholder={placeholder ?? 'blur'} />;
}

export default RemoteImage;
