import { type ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { animationClasses, animationIds } from '@/constants';
import { cn } from '@/cn';

export function LessonsLearnedTitle({
  icon,
  children,
}: {
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <h3
      className={cn(
        'pb-[1.5rem] pt-[3rem] text-heading-sm',
        'flex items-center gap-xs',
        animationClasses.homeLessonsLearnedMainContent
      )}
    >
      <Icon className="mt-[0.25rem]" name={icon} size="1.143em" />
      <span>{children}</span>
    </h3>
  );
}

export function LessonsLearnedUl({ children }: { children: ReactNode }) {
  return (
    <ul
      className={cn(
        'ml-[3rem] text-body-md',
        'flex flex-col gap-md',
        'list-outside [list-style-type:circle]',
        animationClasses.homeLessonsLearnedMainContent
      )}
    >
      {children}
    </ul>
  );
}

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
      <LessonsLearnedTitle icon="terminalWindow">Code</LessonsLearnedTitle>
      <LessonsLearnedUl>
        <li>
          Sharing knowledge and tips among teammates greatly improves
          productivity in an ever evolving field. Cultivate these exchanges, in
          PR reviews and elsewhere
          {/* (Tech Talks, VSCode talk). Keep learning, the space is constantly 
          evolving I learned a lot through code reviews! */}
          {/* <li>Question your coding workflow</li> */}
        </li>
        <li>
          Setting up a CI pipeline early with linting and testing will help
          reduce tech debt accumulation and sloppiness at crunch time
        </li>
        <li>
          Change will happen, so loose coupling of modules should be top of mind
        </li>
        {/* High cohesion, low coupling */}
        <li>
          Code is a better way to express intent than comments about code. See
          if you can make your code more human rather than describing code in
          human language
        </li>
        <li>
          Wisely choose dependencies to not regret having to deal with them
          later. Know your language standard packages, they might do more than
          you think
          {/* (CRA with React and Babel issues, package.json, Semantic UI used
          for one-offs ended up lingering there until they became an issue).
          Know your dependencies - read the docs, watch videos about them and 
          do your research (Ethan Yu with Vite). Vite, React Router v6, Storybook,
          Chakra UI */}
        </li>
        <li>
          Enforce coding style and guidelines through a linter whenever possible
        </li>
        <li>
          Variable naming is hard and poor variable names hurt maintainability.
          If you can avoid naming things, do it
          {/* `&quot;`There are only two hard things in computer
          science:caching validation and naming things`&quot;` */}
        </li>
        <li>Co-location makes you write faster</li>
        <li>
          A lot of time can be spent debugging. Know your debuggers and use them
          to their full extent
        </li>
        {/* <li>
          For alignment, everyone in the team should be familiar with semver
        </li> */}
      </LessonsLearnedUl>

      <LessonsLearnedTitle icon="layout">Design</LessonsLearnedTitle>
      <LessonsLearnedUl>
        <li>
          Brainstorm and share design ideas with engineers early and often to
          anticipate issues and workload
        </li>
        <li>Remember the power of quick low-fidelity prototypes</li>
        <li>Figma is evolving quickly, use it to its full capacity</li>
        <li>Don&apos;t forget power users to make your product more sticky</li>
        <li>
          Design something really small really well. A product that&apos;s
          deeply loved is one that scales
        </li>
        {/* Progressive disclosure */}
      </LessonsLearnedUl>

      {/* <LessonsLearnedTitle icon="userFocus"> */}
      <LessonsLearnedTitle icon="notepad">User Research</LessonsLearnedTitle>
      <LessonsLearnedUl>
        <li>
          Videos of user reactions have the power to convince and align
          management and stakeholders
        </li>
        <li>
          Research insights are like guardrails which help a team confidently
          move forward
        </li>
        <li>
          Talk to users and measure usage as early as possible. Never lose touch
          with them.
        </li>
        <li>Everyone at the company should talk to users to build empathy</li>
        <li>
          Remember the basics of interviews 101: observe users and/or ask
          specifics | ask why, they are the master you are the apprentice | no
          leading questions
        </li>
      </LessonsLearnedUl>

      <LessonsLearnedTitle icon="strategy">
        Product Management
      </LessonsLearnedTitle>
      <LessonsLearnedUl>
        <li>
          Detailed roadmaps far into the future conflict with a healthy design
          process. Leave room for uncertainty, discovery, and change
          {/* Now/Next/Later framework proved successful in the past, 
          or thinking about a roadmap like a flowchart also helps */}
        </li>
        <li>
          Check in with the team often about progress. Timelines will change,
          but better know early
        </li>
        <li>
          Visual artifacts help distill the big picture. Kanban boards
          (Now/Next/Later), and Gantt charts are simple but do the job
        </li>
        <li>Trust the proven double diamond process</li>
      </LessonsLearnedUl>

      <LessonsLearnedTitle icon="usersThree">
        People Management
      </LessonsLearnedTitle>
      <LessonsLearnedUl>
        <li>
          With direct reports, explicitly discuss and define expectations for
          each other. Transparency on the partnership will foster trust and help
          avoid misunderstandings
        </li>
        <li>
          Regularly check in on career progression. Don&apos;t let employees
          grow disappointed and quiet
        </li>
        <li>
          Design your company rituals like you design your products. Constantly
          question your workflows to make decisions and to keep teams engaged,
          informed, and efficient
        </li>
        <li>
          Solicit and elicit honest feedback. Check in and see how you can
          improve as a manager
        </li>
        <li>
          Remember training and conferences as a way to grow and retain
          employees
        </li>
      </LessonsLearnedUl>
    </article>
  );
}
