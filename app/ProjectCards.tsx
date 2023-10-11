import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/cn';

export function ProjectCards({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'py-[40vh]',
        'grid grid-cols-[minmax(0,theme(width.paragraph-md))] gap-[60vh]',
        'justify-center',
        className
      )}
    >
      <ProjectCard projectKey="ouster-studio" />
      <ProjectCard projectKey="fleetguide-surround-view" />
      <ProjectCard projectKey="ouster-data-app" />
    </div>
  );
}
