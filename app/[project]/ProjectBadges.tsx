import { cn } from '@/cn';
import { Badge } from '@/components/Badge';
import { projects, type ProjectKey } from '@/constants';

export function ProjectBadges({ projectKey }: { projectKey: ProjectKey }) {
  const projectBadges = projects[projectKey].badges;

  return (
    <div className={cn('mb-14 flex flex-col gap-[1.5rem]')}>
      {Object.entries(projectBadges).map(([category, badges]) => (
        <dl className="flex items-start gap-xs" key={category}>
          <dt className="pt-[3px] text-details-md uppercase tracking-wider text-main-subtle">
            {category}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-xs">
              {badges.map((tag) => (
                <li key={tag}>
                  <Badge variant="strong">{tag}</Badge>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      ))}
    </div>
  );
}
