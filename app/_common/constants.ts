// For the navigation links to scroll to the correct section id in the page
export const navIds = {
  intro: 'intro',
  rocks: {
    'ouster-studio': 'ouster-studio',
    'ouster-data-app': 'ouster-data-app',
    'fleetguide-surround-view': 'fleetguide-surround-view',
    'nrec-ar': 'nrec-ar',
    hypnovr: 'hypnovr',
    'lessons-learned': 'lessons-learned',
  },
  about: 'about',
};

// For animations to target specific elements. This is useful to decouple
// animations from the DOM structure and have animation logic be inside client
// components while the elements stay in server components.
export const animationIds = {
  homeAboutSection: 'anim-home-about-section',
  home3DContainer: 'anim-home-3d-container',
  homeLessonsLearnedSection: 'anim-home-lessons-learned-section',
  homeLessonsLearnedIntroSubtitle: 'anim-home-lessons-learned-intro-subtitle',
  homeLessonsLearnedIntroParagraph: 'anim-home-lessons-learned-intro-paragraph',
  homeProjects: [
    {
      rock: 'anim-home-project-rock-1',
      card: 'anim-home-project-card-1',
    },
    {
      rock: 'anim-home-project-rock-2',
      card: 'anim-home-project-card-2',
    },
    {
      rock: 'anim-home-project-rock-3',
      card: 'anim-home-project-card-3',
    },
    {
      rock: 'anim-home-project-rock-4',
      card: 'anim-home-project-card-4',
    },
    {
      rock: 'anim-home-project-rock-5',
      card: 'anim-home-project-card-5',
    },
  ],
};
export const animationClasses = {
  homeLessonsLearnedMainContent:
    'animation-class-home-lessons-learned-main-content',
  homeCurtainToPull: 'animation-class-home-curtain-to-pull',
};
