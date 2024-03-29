'use client';

import { type MouseEventHandler, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Route } from 'next';
import resolveConfig from 'tailwindcss/resolveConfig';
import styles from './projectCard.module.css';
import { Badge } from '@/components/Badge';
import { RemoteImage } from '@/components/RemoteMedia';
import { cn } from '@/cn';
import tailwindConfig from '@configs/tailwind.config';
import { ProjectKey, projects, svgIds } from '@/constants';

const projectCardMaxWidth =
  resolveConfig(tailwindConfig).theme.width['paragraph-md'];

function ProjectCardBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        '[&>*]:absolute [&>*]:inset-0 [&>*]:rounded-[7px]',
        className
      )}
      aria-hidden
    >
      {/* White linear gradient */}
      <div
        style={{
          background:
            'linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 30%)',
        }}
      />

      {/* Background color, especially for readability on small screens where the rocks will be behind */}
      <div
        className={cn(
          'bg-opacity-[0.9] md:bg-opacity-[0.2]',
          'bg-[hsl(177,61%,9%)]'
        )}
      />

      {/* Noise fading from top to bottom */}
      <div
        style={{
          maskImage: 'linear-gradient(black, transparent)',
        }}
      >
        <div
          className={cn('absolute inset-0')}
          style={{ filter: `url(#${svgIds.noiseFilter})`, opacity: 0.15 }}
        />
      </div>

      {/* Flashlight Hover Effect */}
      <div
        className={cn(
          'opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        )}
        style={{
          background:
            'radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y),rgba(255,255,255,0.08),transparent 40%)',
        }}
      />
    </div>
  );
}

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

  const cardRef = useRef<HTMLElementTagNameMap['article']>(null);

  const handleMouseMove: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    },
    []
  );

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
          'group relative rounded-md',
          'backdrop-blur-md',
          'border border-[#0b5b54]' // ' border-[hsl(175,78%,20%)]',
        )}
        ref={cardRef}
        onMouseMove={handleMouseMove}
      >
        <ProjectCardBackground className={cn('')} />
        <Link
          className="flex flex-col gap-md p-[1.5rem] md:p-md"
          rel="bookmark"
          href={`/${projectKey}` as Route}
        >
          <header className="flex flex-col gap-3xs pb-2xs md:pb-sm">
            <h2 className="pb-[0.75rem] text-heading-sm [text-wrap:balance] md:pb-0 md:text-heading-md">
              {project.title}
            </h2>
            <p className="text-body-md">{project.subtitle}</p>
          </header>
          {Object.entries(project.badges).map(([tagName, badges]) => (
            <dl className="flex items-center gap-xs " key={tagName}>
              <dt className="text-body-xs uppercase tracking-wider md:text-details-md md:font-details">
                {tagName}
                {/* TODO: Switch to UX Research */}
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
                className={cn(
                  'rounded-md bg-[hsla(var(--backdrop-hue),0%,0%,0.7)] object-cover'
                )}
              />
              {/* Preview of secondary images in the main slot, revealed on hover */}
              {project.secondaryImages.map((secondaryImageName) => (
                <RemoteImage
                  fill
                  key={secondaryImageName}
                  name={secondaryImageName}
                  sizes={projectCardMaxWidth}
                  className={cn(
                    'rounded-md bg-[hsla(var(--backdrop-hue),0%,0%,0.7)] object-cover'
                  )}
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
                    className={cn(
                      'rounded-[0.125rem] bg-[hsla(var(--backdrop-hue),0%,0%,0.7)] object-cover'
                    )}
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
