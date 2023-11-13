import { type ReactNode } from 'react';
import { ProjectTableOfContents } from './ProjectTableOfContents';
import { projectWriteUps } from './_write-ups';
import { ProjectBadges } from './ProjectBadges';

export async function generateStaticParams() {
  return Object.keys(projectWriteUps);
}
type WrittenProject = keyof typeof projectWriteUps;

export function ProjectWrapperBelowTitles({
  project,
  children,
}: {
  project: WrittenProject;
  children: ReactNode;
}) {
  return (
    <>
      <div className="col-span-1">
        <ProjectBadges projectKey={project} />
        {children}
      </div>
      <ProjectTableOfContents
        headings2={projectWriteUps[project].toc}
        className="col-span-1"
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
