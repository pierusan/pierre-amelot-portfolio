import { ProjectCard } from './ProjectCard';
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
        projectKey="ouster-studio"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        projectKey="fleetguide-surround-view"
        className={cn('justify-self-start')}
      />
      <ProjectCard
        projectKey="ouster-data-app"
        className={cn('justify-self-start')}
      />
      <ProjectCard projectKey="nrec-ar" className={cn('justify-self-start')} />
      <ProjectCard projectKey="hypnovr" className={cn('justify-self-start')} />
    </div>
  );
}
