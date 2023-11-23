import { type ReactNode } from 'react';
import Link from 'next/link';
import { DesktopProjectToC, MobileProjectToC } from './ProjectToC';
import { projectWriteUps } from './_write-ups';
import { ProjectBadges } from './ProjectBadges';
import { positiveModulo } from '@/positiveModulo';
import { projects } from '@/constants';
import { cn } from '@/cn';
import { Icon } from '@/components/Icon';

export function generateStaticParams() {
  return Object.keys(projectWriteUps);
}
type WrittenProject = keyof typeof projectWriteUps;

// Keep the order in projects rather than the order in projectWriteUps to have
// the same order of pages as the cards in the homepage
const projectKeys = Object.keys(projects).filter(
  (projectKey): projectKey is WrittenProject => {
    return projectKey in projectWriteUps;
  }
);

const previousProject = (project: WrittenProject) => {
  const projectIndex = projectKeys.indexOf(project);
  return projectKeys[positiveModulo(projectIndex - 1, projectKeys.length)];
};

const nextProject = (project: WrittenProject) => {
  const projectIndex = projectKeys.indexOf(project);
  return projectKeys[positiveModulo(projectIndex + 1, projectKeys.length)];
};

export function ProjectWrapperBelowTitles({
  project,
  children,
}: {
  project: WrittenProject;
  children: ReactNode;
}) {
  return (
    <>
      <div className="col-span-1 mb-28">
        <ProjectBadges projectKey={project} />
        {children}
      </div>
      <DesktopProjectToC
        headings2={projectWriteUps[project].toc}
        className="col-span-1 hidden lg:block"
        previousProject={previousProject(project)}
        nextProject={nextProject(project)}
      />
    </>
  );
}

export function ProjectFooterNav({ project }: { project: WrittenProject }) {
  const previousProj = previousProject(project);
  const nextProj = nextProject(project);

  return (
    <nav
      className={cn('absolute bottom-0 left-0 right-0', 'flex justify-between')}
    >
      <Link
        className={cn(
          'p-md',
          'flex flex-nowrap items-center gap-[1rem]',
          'uppercase text-main-subtle transition-colors hover:text-main'
        )}
        href={`/${previousProj}`}
      >
        <Icon name="pinLeft" size="1.25rem" />
        {projects[previousProj].linkName}
      </Link>
      <Link
        className={cn(
          'p-md',
          'flex flex-nowrap items-center gap-[1rem]',
          'uppercase text-main-subtle transition-colors hover:text-main'
        )}
        href={`/${nextProj}`}
      >
        {projects[nextProj].linkName}
        <Icon name="pinRight" size="1.25rem" />
      </Link>
    </nav>
  );
}

export function ProjectPage({
  params,
}: {
  params: { project: WrittenProject };
}) {
  const { project } = params;
  const ProjectContent = projectWriteUps[project].content;

  return (
    <>
      <ProjectContent project={project} />
      <ProjectFooterNav project={project} />
      <MobileProjectToC
        headings2={projectWriteUps[project].toc}
        previousProject={previousProject(project)}
        nextProject={nextProject(project)}
      />
    </>
  );
}
