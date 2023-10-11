import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import { RemoteImage, type RemoteImageId } from '@/components/RemoteImage';

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const profileImageWidth = '223px';
const twWidthProfileImage = `w-[223px]`;
const timelineImageWidth = '40px';
const twGridColsTimeline = `grid-cols-[40px_1fr]`;

type TimelineItem = {
  logo: RemoteImageId;
  name: string;
  city: string;
  year: number;
  duration: string;
  roles: ReactNode[];
  paragraphs: ReactNode[];
};

const timelineItems: TimelineItem[] = [
  {
    name: 'Ouster',
    logo: 'logo_ouster',
    year: 2018,
    city: 'San Francisco',
    duration: '4yrs',
    roles: [
      <TimelineRole key={'seniorUx'}>
        Senior ux Engineer &lt; Product Design Lead &lt; Embedded ui/ui engineer
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
        using Spotify Web API. This project was carried out in 2016 while I was
        interning for 4 months with Pr. Steven Feiner at Columbia University.
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
      {timelineItems.map((item) => (
        <article
          key={item.name}
          className={cn(`grid ${twGridColsTimeline} gap-lg`)}
        >
          <aside className={cn('flex flex-col text-body-md text-main-subtle')}>
            <RemoteImage
              id={item.logo}
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
        id="profile_pic_hiking"
        className={cn('[grid-column:1] [grid-row:1]')}
        sizes={`${profileImageWidth}`}
      />
      {/* Overlayed hidden on hover */}
      <RemoteImage
        id="profile_pic_red_bg"
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
      I grew up
      <p>in Paris, France, and studying maths and physics. I love to code.</p>
      <p>
        Generally speaking, I love the quick feedback cycle that . And I have
        been fascinated about how great products come into the world, and how
        complicated science can
      </p>
      <p>
        Generally speaking, I love the quick feedback cycle that . And I have
        been fascinated about how great products come into the world, and how
        complicated science can
      </p>
      <p>
        Generally speaking, I love the quick feedback cycle that . And I have
        been fascinated about how great products come into the world, and how
        complicated science can
      </p>
      <p>
        Generally speaking, I love the quick feedback cycle that . And I have
        been fascinated about how great products come into the world, and how
        complicated science can
      </p>
      <p>
        Generally speaking, I love the quick feedback cycle that . And I have
        been fascinated about how great products come into the world, and how
        complicated science can
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
  type: 'youtube' | 'podcast';
  name: string;
  url: string;
  highlights?: { type: 'playlist' | 'episode'; name: string; url: string }[];
}) {
  return (
    <li className={cn('flex flex-col')}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'flex items-center gap-xs text-body-md',
          '[&:hover>span]:underline'
        )}
      >
        {type === 'youtube' && <Icon name="youtube" size="1.25rem" />}
        {type === 'podcast' && <Icon size="1.25rem" name="podcasts" />}
        <span>{name}</span>
      </a>
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
              >
                {highlightType === 'playlist' && (
                  <Icon name="list" size="1rem" />
                )}
                {highlightType === 'episode' && (
                  <Icon name="bookmark" size="1rem" />
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
              name: 'HTTP 203',
              url: 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAKIQFsNbV0JDws_G_bnNo9',
            },
            {
              type: 'playlist',
              name: 'GUI Challenges',
              url: 'https://www.youtube.com/playlist?list=PLNYkxOF6rcIAaV1wwI9540OC_3XoIzMjQ',
            },
          ]}
        />
        <Subscription
          type="youtube"
          name="Code Aesthetic"
          url="https://www.youtube.com/@CodeAesthetic"
        />
        <Subscription
          type="podcast"
          name="Design Better Podcast"
          url="https://open.spotify.com/show/59RliaMdeDAkEgp9nj1Mkj"
          highlights={[
            {
              type: 'episode',
              name: 'Marty Cagan',
              url: 'https://open.spotify.com/episode/0EHnBpR6lBlEoq9jYLRwGr?si=clHu9ZrtRfKb0RjZm67kUQ',
            },
          ]}
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
