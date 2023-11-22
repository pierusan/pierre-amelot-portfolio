import { type ReactNode } from 'react';
import { ProjectTableOfContents } from './ProjectTableOfContents';
import { projectWriteUps } from './_write-ups';
import { ProjectBadges } from './ProjectBadges';
import { positiveModulo } from '@/positiveModulo';
import { projects } from '@/constants';

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
      <div className="col-span-1 mb-16">
        <ProjectBadges projectKey={project} />
        {children}
      </div>
      <ProjectTableOfContents
        headings2={projectWriteUps[project].toc}
        className="col-span-1"
        previousProject={previousProject(project)}
        nextProject={nextProject(project)}
      />
    </>
  );
}

export function ProjectPage({
  params,
}: {
  params: { project: WrittenProject };
}) {
  const ProjectContent = projectWriteUps[params.project].content;

  return <ProjectContent project={params.project} />;
}
