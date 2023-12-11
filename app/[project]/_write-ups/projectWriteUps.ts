import { type MDXProps } from 'mdx/types';
import FleetguideSurroundView, {
  tableOfContents as FleetguideSurroundViewToC,
} from './fleetguide-360-view.mdx';
import NrecAR, { tableOfContents as NrecARToC } from './nrec-ar.mdx';
import HypnoVR, { tableOfContents as HypnoVRToC } from './hypnovr.mdx';
import OusterStudio, {
  tableOfContents as OusterStudioToC,
} from './ouster-studio.mdx';
import OusterDataApp, {
  tableOfContents as OusterDataAppToC,
} from './ouster-data-app.mdx';
import { type ProjectKey } from '@/constants';

// Manually force type of the MDX default exports because we can't override the
// broad type coming from @types/mdx. Monitor evolution of:
// https://github.com/microsoft/TypeScript/issues/36146
type ProjectMDXProps = MDXProps & { project: ProjectKey };
type ProjectMDXContent = (props: ProjectMDXProps) => JSX.Element;

export const projectWriteUps = {
  'fleetguide-360-view': {
    content: FleetguideSurroundView as ProjectMDXContent,
    toc: FleetguideSurroundViewToC,
  },
  'nrec-ar': {
    content: NrecAR as ProjectMDXContent,
    toc: NrecARToC,
  },
  hypnovr: {
    content: HypnoVR as ProjectMDXContent,
    toc: HypnoVRToC,
  },
  'ouster-studio': {
    content: OusterStudio as ProjectMDXContent,
    toc: OusterStudioToC,
  },
  'ouster-data-app': {
    content: OusterDataApp as ProjectMDXContent,
    toc: OusterDataAppToC,
  },
} satisfies Partial<
  Record<
    ProjectKey,
    {
      content: ProjectMDXContent;
      toc: {
        value: string;
        id: string;
      }[];
    }
  >
>;
