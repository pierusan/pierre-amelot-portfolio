import { type ReactNode } from 'react';
import { cn } from '@/cn';
import { Icon, type IconName } from '@/components/Icon';
import { RemoteImage, type RemoteImageName } from '@/components/RemoteMedia';

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const profileImageWidth = '223px';
const twWidthProfileImage = `w-[223px]`;
const timelineImageWidth = '40px';
const twGridColsTimeline = `grid-cols-[40px_1fr]`;

type TimelineItem = {
  logo: RemoteImageName;
  name: string;
  city: string;
  year: number;
  duration: string;
  roles: ReactNode[];
  paragraphs: ReactNode[];
};

const yearsAsEngineer = Math.floor(
  (Date.now().valueOf() - new Date('2017-08-01').valueOf()) /
    (1000 * 60 * 60 * 24 * 365)
);

const timelineItems: TimelineItem[] = [
  {
    name: 'Ouster',
    logo: 'logo_ouster',
    year: 2018,
    city: 'San Francisco',
    duration: '4yrs',
    roles: [
      <TimelineRole key={'seniorUx'}>
        Senior ux Engineer | Product Design Lead | Embedded ui/ui engineer
      </TimelineRole>,
    ],
    paragraphs: [
      <TimelineParagraph key="ouster">
        At Ouster, a start-up which I joined as the 30th in 2018 employee and
        which grew to about 300 employees in , I designed and built 3D
        visualization software.
      </TimelineParagraph>,
      <TimelineParagraph key="garbage truck">
        I design and develop a real-time lidar point cloud visualization app to
        help garbage truck drivers see 360° and avoid collisions. I also oversaw
        the user experience and development of a web tool for fleet managers to
        request data and replay accidents in 3D in their browser.
      </TimelineParagraph>,
    ],
  },
  {
    name: 'National Robotics Eng. Center',
    logo: 'logo_nrec',
    year: 2017,
    city: 'Pittsburgh',
    duration: '1yr',
    roles: [<TimelineRole key="nrec">Graphics Engineer</TimelineRole>],
    paragraphs: [
      <TimelineParagraph key="nrec">
        Designed and developed an AR app to support US military deminers in
        improving their technique handling a metal detector. Implemented rapid
        iterations of the app for HoloLens, ODG R7, and handheld tablet using
        Unity 3D. Led internal usability tests on 5+ UI options.
      </TimelineParagraph>,
    ],
  },
  {
    name: 'Carnegie Mellon University',
    logo: 'logo_cmu',
    year: 2016,
    city: 'Pittsburgh',
    duration: '1yr',
    roles: [
      <TimelineRole key="cmu">
        M.S. Human-computer interaction (school of computer science)
      </TimelineRole>,
    ],
    paragraphs: [
      <TimelineParagraph key="cmu">
        At Carnegie Mellon University, I refined my programming and prototyping
        skills while broadening my knowledge towards User-Centered Design, Media
        Art, and Tangible Interactions.
      </TimelineParagraph>,
    ],
  },
  {
    name: 'Columbia University',
    logo: 'logo_columbia',
    year: 2016,
    city: 'New York',
    duration: '4mths',
    roles: [
      <TimelineRole key="columbia">Augmented Reality Intern</TimelineRole>,
    ],
    paragraphs: [
      <TimelineParagraph key="columbia">
        After developing Unity packages to connect the Microsoft HoloLens to the
        Leap Motion Controller, I created a music exploration AR experience
        hooked to Spotify. This project was carried out during my internship
        with Pr. Steven Feiner at Columbia University.
      </TimelineParagraph>,
    ],
  },
  {
    name: 'École Polytechnique',
    logo: 'logo_polytechnique',
    year: 2013,
    city: 'Paris',
    duration: '3yrs',
    roles: [
      <TimelineRole key="ms">M.S. computer science</TimelineRole>,
      <TimelineRole key="bs">B.S. Maths & Computer Science</TimelineRole>,
    ],
    paragraphs: [
      <TimelineParagraph key="polytechnique">
        France&apos;s top-ranking university for high-level scientific training.
        Courses followed in Computer Science, Mathematics and Biology
      </TimelineParagraph>,
    ],
  },
];

function TimelineParagraph({ children }: { children: ReactNode }) {
  return (
    <p className={cn('text-body-sm [&:not(:last-of-type)]:pb-[0.75rem]')}>
      {children}
    </p>
  );
}

function TimelineRole({ children }: { children?: ReactNode }) {
  return <p className={cn('text-details-md uppercase')}>{children}</p>;
}

function Timeline() {
  return (
    <section className={cn('flex max-w-[35rem] flex-col gap-[3rem]')}>
      <h2 className={cn('mb-[-1rem] text-heading-sm md:hidden')}>Timeline</h2>
      {timelineItems.map((item) => (
        <article
          key={item.name}
          className={cn(`grid ${twGridColsTimeline} gap-lg`)}
        >
          <aside className={cn('flex flex-col text-body-md text-main-subtle')}>
            <RemoteImage
              name={item.logo}
              className="mb-[0.5rem]"
              sizes={`${timelineImageWidth}`}
            />
            <p>{item.year}</p>
            <p>{item.duration}</p>
          </aside>
          <div className={cn('text-main')}>
            <header className={cn('pb-[1rem]')}>
              <h2 className={cn('flex gap-xs pb-2xs text-body-md')}>
                <span>{item.name}</span>
                <span className="text-main-subtle">{item.city}</span>
              </h2>
              {item.roles}
            </header>
            {item.paragraphs}
          </div>
        </article>
      ))}
    </section>
  );
}

function AboutPicture({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr] grid-rows-[1fr]',
        '[&>img]:rounded-md',
        'hover:[&>img:last-child]:[opacity:0]',
        className
      )}
    >
      <RemoteImage
        name="profile_pic_hiking"
        className={cn('[grid-column:1] [grid-row:1]')}
        sizes={`${profileImageWidth}`}
      />
      {/* Overlayed hidden on hover */}
      <RemoteImage
        name="profile_pic_red_bg"
        className={cn('transition-opacity [grid-column:1] [grid-row:1]')}
        sizes={`${profileImageWidth}`}
      />
    </div>
  );
}

function AboutParagraphs() {
  return (
    <article className={cn('max-w-[35rem] [&>p]:pb-sm')}>
      <AboutPicture
        className={`float-right ${twWidthProfileImage} pb-md pl-md`}
      />
      <p>
        It&apos;s been {yearsAsEngineer} years that I am a software engineer,
        and I am{' '}
        <b>
          <i>not</i>
        </b>{' '}
        running out of steam!
      </p>
      <p>
        Coding satisfies my cravings for problem-solving and math exercises. I
        love how much knowledge is publicly available in this field, at various
        levels of abstraction (networking protocols, UI libraries, productivity
        tips, etc.).
      </p>
      <p>
        I&apos;m also social, and product design has brought a human element to
        my work. Being close to users gives a deeper meaning to the code I
        write. I love the quick feedback cycle that software product creation
        allows for. Ideate, build, test, repeat!
      </p>
      <p>
        My curiosity also led me to explore cultures and languages [🇯🇵🇺🇸]. My
        wife Kate is American and shaking up my habits and opinions is important
        to me. Since we&apos;re at the emoji stage, let me throw in a couple
        more: 🎾 🥾 🏃.
      </p>
    </article>
  );
}

function Subscription({
  type,
  name,
  url,
  highlights,
}: {
  type: 'youtube' | 'podcast' | 'blog';
  name: string;
  url?: string;
  highlights?: { type: 'playlist' | 'episode'; name: string; url: string }[];
}) {
  let iconName: IconName = 'article';
  switch (type) {
    case 'youtube': {
      iconName = 'youtube';
      break;
    }
    case 'podcast': {
      iconName = 'podcasts';
      break;
    }
    case 'blog': {
      iconName = 'article';
      break;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _exhaustiveCheck: never = type;
    }
  }

  return (
    <li className={cn('flex flex-col')}>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'flex items-center gap-xs text-body-md',
            '[&:hover>span]:underline'
          )}
          data-umami-event="Open Resource"
          data-umami-event-resource={name}
          data-umami-event-resource-type={iconName}
        >
          <Icon name={iconName} size="1.25em" />
          <span>{name}</span>
        </a>
      ) : (
        <div className={cn('flex items-center gap-xs text-body-md')}>
          <Icon name={iconName} size="1.25em" />
          <span>{name}</span>
        </div>
      )}
      {highlights && (
        <ul className={cn('flex flex-col gap-[0.125rem]', 'pl-[2rem] pt-3xs')}>
          {highlights.map(
            ({
              type: highlightType,
              name: highlightName,
              url: highlightUrl,
            }) => (
              <a
                key={highlightName}
                href={highlightUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'flex items-center gap-[0.5rem] text-body-sm',
                  '[&:hover>span]:underline'
                )}
                data-umami-event="Open Resource"
                data-umami-event-resource={highlightName}
                data-umami-event-resource-type={iconName}
              >
                {highlightType === 'playlist' && (
                  <Icon name="list" size="1.33em" />
                )}
                {highlightType === 'episode' && (
                  <Icon name="bookmark" size="1.33em" />
                )}
                <span>{highlightName}</span>
              </a>
            )
          )}
        </ul>
      )}
    </li>
  );
}

function Resources() {
  return (
    <article>
      <h2 className={cn('pb-sm text-heading-sm')}>Resources I enjoy</h2>
      <ul className={cn('flex flex-col gap-xs')}>
        <Subscription
          type="youtube"
          name="Google Chrome Devs"
          url="https://www.youtube.com/@ChromeDevs"
          highlights={[
            {
              type: 'playlist',
              // Amazing in-depth web topics of all sorts
              name: 'HTTP 203',
              url: 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAKIQFsNbV0JDws_G_bnNo9',
            },
            {
              type: 'playlist',
              // Great CSS craftsmanship
              name: 'GUI Challenges',
              url: 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAaV1wwI9540OC_3XoIzMjQ',
            },
          ]}
        />
        <Subscription
          type="youtube"
          // Touches on variable naming, dependency injection
          name="Code Aesthetic"
          url="https://www.youtube.com/@CodeAesthetic"
        />
        <Subscription
          type="youtube"
          // REST API design. Full apps. CORS explanations
          name="Coding Garden"
          url="https://www.youtube.com/@CodingGarden"
        />
        <Subscription
          type="youtube"
          name="One-off videos"
          highlights={[
            // How do a built a 5 star, then a 6 start, then a 7 star
            // experience. Work your brain differently.
            // Rolling roadmap of 2 years and it's evolving
            // 2 releases a year, fall and spring
            // Product management and product marketing should be closer to unlock
            // Sometimes hard to know if a product fail because of the product or the marketing
            {
              type: 'episode',
              name: 'Brian Chesky: Designing a 10-star experience [Stanford Business]',
              url: 'https://youtu.be/V6h_EDcj12k',
            },
            {
              type: 'episode',
              name: 'Shishir Mehrotra: Rituals of great product teams [Figma Config]',
              url: 'https://www.youtube.com/watch?v=veG6_hcrShE',
            },
            // There is a tremendous amount of craftsmanship in turning a great
            // idea into a great product. You have to keep 5000 things in your brain about
            // the product.
            // When a company grows the process people come in, the great
            // product people leave and the company stops innovating
            {
              type: 'episode',
              name: 'Steve Jobs: The lost interview',
              url: 'https://youtu.be/rDqQcmVqAm4&t=2088',
            },
          ]}
        />
        <Subscription
          type="podcast"
          name="Lenny's podcast"
          url="https://open.spotify.com/show/2dR1MUZEHCOnz1LVfNac0j"
          highlights={[
            //
            // {
            //   type: 'episode',
            //   name: 'Shishir Mehrotra: The rituals of great teams',
            //   url: 'https://open.spotify.com/episode/2EWVDzqhkxvLvEioAUE5kh',
            // },
            // Don't be guided by fear or anger. Really listen to people, be
            // their agent. Top goal and accountability buddy. Be on time.
            // Firing almost always makes you more productive
            {
              type: 'episode',
              name: 'Matt Mochary: The great CEO within',
              url: 'https://open.spotify.com/episode/0WC7fuAKXM22HC6ckj1JI4',
            },
            // Opportunities Solutions tree. Start with "OUTCOME" (and not output). Opportunity is unmet need, pain point, or desire
            // Interviews: be curious, beer with a buddy. Get stories
            // Garbage in, garbage out if your interview questions aren't good
            // Schedule interviews with users every week (bottom of email and customer support relations)
            // 2 types of discovery: qualitative interviewing (or observing if possible), and assumption testing
            // Test assumptions SUPER QUICKLY instead of dragging them out in time. Be a doer
            // Don't always need discovery. The core discovery has to the differentiators or the key product xp
            // The amount of discovery depends on the RISK
            {
              type: 'episode',
              name: 'Teresa Torres: Opportunity solutions & continuous discovery',
              url: 'https://open.spotify.com/episode/4JBgwsJaaZqYNkXLif0ej7',
            },
            // Still so many teams are not running product correctly. Teams
            // should be given a problem and not a feature
            // 'Product owner' is BS
            // PMs should always have access to users, engineers, and stakeholders
            {
              type: 'episode',
              name: 'Marty Cagan: the nature of product',
              url: 'https://open.spotify.com/episode/32RVTlEHivcD0lXafAv51I',
            },
          ]}
        />
        <Subscription
          type="podcast"
          name="Design Better"
          url="https://open.spotify.com/show/59RliaMdeDAkEgp9nj1Mkj"
          highlights={[
            // Feature teams vs product teams
            // Usable: design
            // Feasible: engineering
            // Viable and Valuable: PM
            {
              type: 'episode',
              name: 'Marty Cagan: Understanding product management and Agile',
              url: 'https://open.spotify.com/episode/0EHnBpR6lBlEoq9jYLRwGr',
            },
            {
              type: 'episode',
              name: 'Abigail Hart Gray: Explain design with numbers',
              url: 'https://open.spotify.com/episode/7vMPdrc3LVxLbQThYVF5qk',
            },
          ]}
        />
        <Subscription
          type="podcast"
          name="How I built this"
          url="https://open.spotify.com/show/6E709HRH7XaiZrMfgtNCun"
        />
        <Subscription
          type="podcast"
          name="One-off episodes"
          highlights={[
            // To listen
            {
              type: 'episode',
              name: 'John Carmack [Lex Fridman Podcast]',
              url: 'https://open.spotify.com/episode/3LddnZjkpflldHXnRZ0rrw',
            },
            {
              type: 'episode',
              name: 'Sam Altman: Customer love is all you need [Masters of Scale]',
              url: 'https://open.spotify.com/episode/5FXJwdLenciEJRDEh39hiy',
            },
          ]}
        />
        <Subscription
          type="blog"
          // Clear and smart explanations, like shadows or server components
          name="Josh Comeau"
          url="https://www.joshwcomeau.com/"
        />
        <Subscription
          type="blog"
          // Fun use cases with good UX titbits
          name="Growth Design"
          url="https://growth.design/"
        />
      </ul>
    </article>
  );
}

export function AboutSection({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('min-h-screen py-xl', className)}>
      <div className={cn('flex flex-wrap gap-2xl')}>
        <div className={cn('flex flex-col gap-[2rem]')}>
          <AboutParagraphs />
          <Resources />
        </div>
        <Timeline />
      </div>
    </section>
  );
}
