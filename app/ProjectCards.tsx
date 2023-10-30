import { ProjectCard } from './ProjectCard';
import { animationIds, navIds } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function ProjectCards({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'py-[40vh]',
        'grid grid-cols-1 gap-[100vh]',
        'justify-items-center',
        className
      )}
    >
      <ProjectCard
        id={animationIds.homeProjects[0].card}
        navId={navIds.rocks['ouster-studio']}
        projectKey="ouster-studio"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        id={animationIds.homeProjects[1].card}
        navId={navIds.rocks['fleetguide-surround-view']}
        projectKey="fleetguide-surround-view"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        id={animationIds.homeProjects[2].card}
        navId={navIds.rocks['ouster-data-app']}
        projectKey="ouster-data-app"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        id={animationIds.homeProjects[3].card}
        navId={navIds.rocks['nrec-ar']}
        projectKey="nrec-ar"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        id={animationIds.homeProjects[4].card}
        navId={navIds.rocks['hypnovr']}
        projectKey="hypnovr"
        className={cn('justify-self-start')}
      />
    </div>
  );
}
