declare module '*.svg' {
  import { type FunctionComponent, type SVGProps } from 'react';
  export type SVGRComponent = FunctionComponent<SVGProps<SVGSVGElement>>;
  const content: SVGRComponent;
  export default content;
}

declare module '*.svg?url' {
  import { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}
