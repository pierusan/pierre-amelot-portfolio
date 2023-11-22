import { Icon } from '@/components/Icon';
import { animationClasses, animationIds } from '@/constants';
import { cn } from '@/cn';

export function LessonsLearnedSection({ className }: { className?: string }) {
  return (
    <article
      id={animationIds.homeLessonsLearnedSection}
      className={cn('max-w-paragraph-md py-[8rem] md:py-xl', className)}
    >
      <header className={cn('pb-md')}>
        <h2 className={cn('pb-xs text-heading-sm md:text-heading-lg')}>
          Lessons Learned
        </h2>
        <p
          id={animationIds.homeLessonsLearnedIntroSubtitle}
          className={cn('text-details-xl', 'italic')}
        >
          <span className="text-[#666]">One</span>{' '}
          <span className="text-[#bbb]">stone</span>{' '}
          <span className="text-[#666]">at</span>{' '}
          <span className="text-[#444]">a</span>{' '}
          <span className="text-[#ccc]">time</span>{' '}
          <span className="text-[#999]">...</span>{' '}
        </p>
      </header>
      <p
        id={animationIds.homeLessonsLearnedIntroParagraph}
        className={cn('text-body-md text-main-subtle md:text-body-lg')}
      >
        As my career progresses, so does my approach to technical issues,
        product creation, and team dynamics. Here are some of my takeaways over
        the years
      </p>
      <h3
        className={cn(
          'pb-[1.5rem] pt-[3rem] text-heading-sm',
          'flex items-center gap-xs',
          animationClasses.homeLessonsLearnedMainContent
        )}
      >
        <Icon className="mt-[0.25rem]" name="terminalWindow" size="2rem" />
        <span>Code</span>
      </h3>
      <ul
        className={cn(
          'ml-[3.75rem] text-body-md',
          'flex flex-col gap-md',
          'list-outside [list-style-type:circle]',
          animationClasses.homeLessonsLearnedMainContent
        )}
      >
        {/* TODO: Use hover cards for extra information about when I learned */}
        <li>
          Once a project is in full steam,. Set up linting, formatting, testing
          and CI early pays off (+ React Strict Mode)
        </li>
        <li>Sharing knowledge among teammates (Tech Talks, VSCode talk)</li>
        <li>
          Dependencies maintenance (React and Babel issues, package.json,
          Semantic UI used for one-offs ended up lingering there until they
          became)
        </li>
        <li>
          Be intentional and know your dependencies. Read the docs, watch videos
          about them (Ethan Yu with Vite). Vite, React Router v6, Storybook,
          Chakra UI{' '}
        </li>
        <li>
          Do your research before jumping in (Create React App ended up causing
          a lot of troubles)
        </li>
        <li>
          Keep learning, the space is constantly evolving I learned a lot
          through code reviews!
        </li>
        <li>Question your coding workflow</li>
        <li>
          Variable naming is one of the most underrated issues. Prefer array
          functions `&quot;`There are only two hard things in computer
          science:caching validation and naming things`&quot;`
        </li>
        <li>Know your standard packages</li>
        <li>
          Change will happen, so you should make the amount of coupling as
          minimal as possible
        </li>
        <li>Co-location makes you write faster</li>
        <li>
          Code is a much better way to express intent than comments about code.
          If you feel like you need human language to describe your code, see if
          you can make your code more human
        </li>
        <li>Test, profile, measure</li>
      </ul>

      <h3
        className={cn(
          'pb-[1.5rem] pt-[3rem] text-heading-sm',
          'flex items-center gap-xs',
          animationClasses.homeLessonsLearnedMainContent
        )}
      >
        <Icon className="mt-[0.25rem]" name="layout" size="2rem" />
        <span>Design</span>
      </h3>
    </article>
  );
}
