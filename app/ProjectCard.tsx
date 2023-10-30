import Link from 'next/link';
import resolveConfig from 'tailwindcss/resolveConfig';
import styles from './projectCard.module.css';
import { Badge } from '@/components/Badge';
import { RemoteImage, type RemoteImageId } from '@/components/RemoteImage';
import { cn } from '@/lib/cn';
import tailwindConfig from '@/tailwind.config';

const widths = resolveConfig(tailwindConfig).theme?.width;
const projectCardMaxWidth = widths?.['paragraph-md'];

type ProjectInfo = {
  title: string;
  subtitle: string;
  badges: { code?: string[]; design?: string[]; research?: string[] };
  mainImageUrl: RemoteImageId;
  secondaryImageUrls: [RemoteImageId, RemoteImageId, RemoteImageId];
};

const projects = {
  'ouster-studio': {
    title: 'Ouster Studio',
    subtitle: 'Unifying Ouster Lidar ecosystem of visualizers',
    badges: {
      code: [
        'React',
        'Storybook',
        'Chakra UI',
        'Vite',
        'Electron',
        'Typescript',
        'Gitlab CI',
        'Wasm',
        'Rxjs',
      ],
      design: [
        'Figma',
        'Design System',
        'Low-Fidelity Wireframe',
        'Prototyping',
        // 'Design Critique',
      ],
      research: ['Competitive Analysis', 'Interviews', 'Usability Testing'],
    },
    mainImageUrl: 'oust_studio_viz_home',
    secondaryImageUrls: [
      'oust_studio_low_fi_viz_recording_menu',
      'oust_studio_design_system_button',
      'oust_studio_storybook_interaction_test',
    ],
  },
  'fleetguide-surround-view': {
    title: 'Fleetguide 360° View',
    subtitle: 'Helping truck drivers see 360°',
    badges: {
      code: ['C++ 14', 'OpenGl', 'VTK', 'ROS', 'BigQuery', 'Data Studio'],
      design: ['Prototyping', 'Figma', 'After Effects', 'Pitch Deck'],
      research: [
        'Contextual Inquiry',
        'Think-Aloud Testing',
        'Usability Testing',
        'Diary Study',
        'Typeform',
        'Product Analytics',
      ],
    },
    mainImageUrl: 'fg_surr_camera_views',
    // mainImageUrl: 'fg_surr_cover_image',
    // mainImageUrl: 'fg_surr_overview_slide',
    secondaryImageUrls: [
      'fg_surr_prototypes_2',
      'fg_surr_think_aloud',
      'fg_surr_embedded_code',
    ],
  },
  'ouster-data-app': {
    title: 'Ouster Data App',
    subtitle: 'Full-stack upgrade of internal web tool',
    badges: {
      code: ['React', 'Flask', 'SQLAlchemy', 'Docker', 'Terraform', 'Three.js'],
      design: ['Figma', 'Prototyping'],
      research: ['Interviews', 'Usability Testing'],
    },
    mainImageUrl: 'oust_da_near_ir_viz_only',
    secondaryImageUrls: [
      'oust_da_magma_range',
      'oust_da_shortcuts_2',
      'oust_da_landing',
    ],
  },
  'nrec-ar': {
    title: 'Demining in AR',
    subtitle: "Improving military deminers' technique using metal detectors",
    badges: {
      code: ['Unity', 'C#', 'HoloLens', 'Vuforia', 'Wireshark'],
      design: ['Prototyping', 'Promotional Video'],
      research: ['Think-Aloud Testing'],
    },
    mainImageUrl: 'nrec_ar_hero',
    secondaryImageUrls: [
      'nrec_ar_user_tests_mosaic',
      'nrec_ar_markers_experiments_mosaic',
      'nrec_ar_prototype_options_mosaic',
    ],
  },
  hypnovr: {
    title: "HypnoVR App Doctor's View",
    subtitle: 'Virtual Reality for anxiety and pain management',
    badges: {
      code: ['Unity', 'C#', 'Oculus Rift'],
      design: ['Low-Fidelity Wireframe'],
      research: ['Interviews', 'Diagramming'],
    },
    mainImageUrl: 'hypnovr_app_selection',
    secondaryImageUrls: [
      'hypnovr_app_login',
      'hypnovr_sketches',
      'hypnovr_wireframes',
    ],
  },
} satisfies Record<string, ProjectInfo>;

type ProjectKey = keyof typeof projects;

export function ProjectCard({
  projectKey,
  className,
  id,
  navId,
}: {
  projectKey: ProjectKey;
  className?: string;
  id?: string;
  navId?: string;
}) {
  const project = projects[projectKey];

  return (
    // Wrap in div to better control where the navigation will scroll to thanks
    // to the padding
    <div
      className={cn('w-full max-w-paragraph-md py-md', className)}
      id={navId}
    >
      <article
        id={id}
        className={cn(
          'rounded-md border transition-colors',
          'bg-action-subtle border-action-subtle',
          'hover:border-action-subtle-hover hover:bg-action-subtle-hover'
        )}
      >
        <Link
          className="flex flex-col gap-md p-md"
          rel="bookmark"
          href={`/${projectKey}`}
        >
          <header className="flex flex-col gap-3xs pb-sm">
            <h2 className="text-heading-md">{project.title}</h2>
            <p className="text-body-md">{project.subtitle}</p>
          </header>
          {Object.entries(project.badges).map(([tagName, badges]) => (
            <dl className="flex items-center gap-xs " key={tagName}>
              <dt className="text-details-md font-details uppercase tracking-wider">
                {tagName}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-xs">
                  {badges.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          ))}
          <ul
            className={cn(
              'mx-[-1rem] mb-[-1rem] grid grid-cols-3 gap-y-xs md:m-0',
              // Keep complex CSS logic in module for more readability
              styles['preview-secondary-images-in-main-slot-on-hover']
            )}
          >
            <li className={cn('relative col-span-3 aspect-video')}>
              <RemoteImage
                fill
                id={project.mainImageUrl}
                sizes={projectCardMaxWidth}
              />
              {/* Preview of secondary images in the main slot, revealed on hover */}
              {project.secondaryImageUrls.map((id) => (
                <RemoteImage
                  fill
                  key={id}
                  id={id}
                  sizes={projectCardMaxWidth}
                />
              ))}
            </li>
            {project.secondaryImageUrls.map((id) => (
              <li
                // Padding between images so hover interaction is smooth when
                // mouse runs across them
                className={cn(
                  'aspect-video px-[0.325rem] last:pr-0 [&:nth-child(2)]:pl-0'
                )}
                key={id}
              >
                {/* Intermediate div so the padding is respected */}
                <div className={cn('relative h-full w-full')}>
                  <RemoteImage
                    id={id}
                    fill
                    sizes={`calc(${projectCardMaxWidth} / 3)`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Link>
      </article>
    </div>
  );
}
