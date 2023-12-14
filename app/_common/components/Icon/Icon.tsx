import { type SVGProps } from 'react';
// Material https://fonts.google.com/icons
import PodcastsIconSVG from '@material-design-icons/svg/filled/podcasts.svg';
import BookmarkIconSVG from '@material-design-icons/svg/outlined/bookmark_border.svg';
import ListIconSVG from '@material-design-icons/svg/filled/list.svg';
import TocSVG from '@material-design-icons/svg/filled/toc.svg';
import FeedSVG from '@material-design-icons/svg/filled/feed.svg';
import SchoolSVG from '@material-design-icons/svg/sharp/school.svg';
// Radix https://www.radix-ui.com/icons
import {
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PinLeftIcon,
  PinRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
// Phosphor https://phosphoricons.com/
import {
  Article,
  Notepad,
  Strategy,
  TerminalWindow,
  UserFocus,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr/index';
// Lucide https://lucide.dev/icons/
import { Palette } from 'lucide-react';
// Feather https://feathericons.com/
import { Layout } from 'react-feather';
// Custom
import YoutubeIconSVG from './svgs/YoutubeIcon.svg';

const materialIcons = {
  bookmark: BookmarkIconSVG,
  feed: FeedSVG,
  list: ListIconSVG,
  podcasts: PodcastsIconSVG,
  school: SchoolSVG,
  toc: TocSVG,
} as const;

const radixIcons = {
  arrowUp: ArrowUpIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  pinLeft: PinLeftIcon,
  pinRight: PinRightIcon,
} as const;

const phosphorIcons = {
  article: Article,
  notepad: Notepad,
  strategy: Strategy,
  terminalWindow: TerminalWindow,
  userFocus: UserFocus,
  usersThree: UsersThree,
} as const;

const lucideIcons = { palette: Palette } as const;

const featherIcons = { layout: Layout } as const;

const customIcons = { youtube: YoutubeIconSVG } as const;

const icons = {
  ...materialIcons,
  ...radixIcons,
  ...phosphorIcons,
  ...lucideIcons,
  ...featherIcons,
  ...customIcons,
} as const;
export type IconName = keyof typeof icons;

// rem units are actually not allowed on SVGs and React types for SVGs are not
// narrow enough
// https://developer.mozilla.org/en-US/docs/Web/API/SVGLength
// Here we use Typescript conditional types to narrow them ourselves
// https://stackoverflow.com/a/63549561
export type BroadSVGLength = SVGProps<SVGSVGElement>['width'];
type IncorrectSVGLength = `${number}rem`;
export type NarrowSVGLength<T> = (T extends IncorrectSVGLength ? never : T) &
  (IncorrectSVGLength extends T ? never : T); //for unions

export function Icon<T extends BroadSVGLength>({
  name,
  size,
  ...svgProps
}: {
  name: IconName;
  size: NarrowSVGLength<T>;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'viewBox'>) {
  const extraProps: { viewBox?: string; fill?: string } = {};

  // Material icons don't come with a viewBox so we add it to make sure they
  // scale properly
  if (name in materialIcons) {
    extraProps.viewBox = '0 0 24 24';
  }

  // Lucide icons sometimes uses stroke instead of fill and already applies
  // stroke="currentColor"
  if (!(name in lucideIcons || name in featherIcons)) {
    extraProps.fill = 'currentColor';
  }

  const SVG = icons[name];

  return <SVG width={size} height={size} {...extraProps} {...svgProps} />;
}
