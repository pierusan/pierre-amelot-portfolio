import Link from 'next/link';
import { Route } from 'next';
import resolveConfig from 'tailwindcss/resolveConfig';
import styles from './projectCard.module.css';
import { Badge } from '@/components/Badge';
import { RemoteImage } from '@/components/RemoteImage';
import { cn } from '@/cn';
import tailwindConfig from '@configs/tailwind.config';
import { ProjectKey, projects } from '@/constants';

const projectCardMaxWidth =
  resolveConfig(tailwindConfig).theme.width['paragraph-md'];

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
          'bg-action-subtle',
          'border-action-subtle',
          'hover:border-action-subtle-hover hover:bg-action-subtle-hover'
        )}
      >
        <Link
          className="flex flex-col gap-md p-[1.5rem] md:p-md"
          rel="bookmark"
          href={`/${projectKey}` as Route}
        >
          <header className="flex flex-col gap-3xs pb-2xs md:pb-sm">
            <h2 className="pb-[0.75rem] text-heading-sm md:pb-0 md:text-heading-md ">
              {project.title}
            </h2>
            <p className="text-body-md">{project.subtitle}</p>
          </header>
          {Object.entries(project.badges).map(([tagName, badges]) => (
            <dl className="flex items-center gap-xs " key={tagName}>
              <dt className="text-body-xs uppercase tracking-wider md:text-details-md md:font-details">
                {tagName}
              </dt>
              <dd className={cn('overflow-x-auto')}>
                <ul className="flex gap-xs md:flex-wrap">
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
              'mx-[-1rem] mb-[-1rem] grid grid-cols-3 gap-y-xs md:m-0 md:mx-[-1rem] md:mb-[-1rem]',
              // Keep complex CSS logic in module for more readability
              styles['preview-secondary-images-in-main-slot-on-hover']
            )}
          >
            <li className={cn('relative col-span-3 aspect-video')}>
              <RemoteImage
                fill
                name={project.mainImage}
                sizes={projectCardMaxWidth}
              />
              {/* Preview of secondary images in the main slot, revealed on hover */}
              {project.secondaryImages.map((secondaryImageName) => (
                <RemoteImage
                  fill
                  key={secondaryImageName}
                  name={secondaryImageName}
                  sizes={projectCardMaxWidth}
                />
              ))}
            </li>
            {project.secondaryImages.map((secondaryImageName) => (
              <li
                // Padding between images so hover interaction is smooth when
                // mouse runs across them
                className={cn(
                  'aspect-video px-[0.325rem] last:pr-0 [&:nth-child(2)]:pl-0'
                )}
                key={secondaryImageName}
              >
                {/* Intermediate div so the padding is respected */}
                <div className={cn('relative h-full w-full')}>
                  <RemoteImage
                    name={secondaryImageName}
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
