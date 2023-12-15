import { RemoteImageName } from '@/components/RemoteMedia';

export type ProjectKey = keyof typeof projects;
type RockNavIdKeys = ProjectKey | 'lessons-learned';

// For the navigation links to scroll to the correct section id in the page
export const navIds = {
  intro: 'intro',
  rocks: {
    'ouster-studio': 'ouster-studio',
    'ouster-data-app': 'ouster-data-app',
    'fleetguide-360-view': 'fleetguide-360-view',
    'nrec-ar': 'nrec-ar',
    hypnovr: 'hypnovr',
    'lessons-learned': 'lessons-learned',
  } satisfies Record<RockNavIdKeys, string>,
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
  navHighlightedOnScroll: 'anim-nav-highlight-on-scroll',
};

export const svgIds = {
  noiseFilter: 'svg-noise-filter',
};

export type ProjectInfo = {
  title: string;
  subtitle: string;
  linkName: string;
  badges: { code?: string[]; design?: string[]; research?: string[] };
  mainImage: RemoteImageName;
  secondaryImages: [RemoteImageName, RemoteImageName, RemoteImageName];
};

export const projects = {
  'ouster-studio': {
    title: 'Ouster Studio',
    subtitle: 'Unifying Ouster Lidar ecosystem of visualizers',
    linkName: 'Ouster Studio',
    badges: {
      code: [
        'React',
        'Storybook',
        'Chakra UI',
        'Vite',
        'Electron',
        'Typescript',
        'Gitlab CI',
        'Wasm',
        'Rxjs',
      ],
      design: [
        'Figma',
        'Design System',
        'Low-Fidelity Wireframe',
        'Prototyping',
        // 'Design Critique',
      ],
      research: ['Competitive Analysis', 'Interviews', 'Usability Testing'],
    },
    mainImage: 'oust_studio_home_1_viz_homepage',
    secondaryImages: [
      'oust_studio_home_2_low_fi_viz_recording_menu',
      'oust_studio_home_3_design_system_button',
      'oust_studio_home_4_storybook_interaction_test',
    ],
  },
  'fleetguide-360-view': {
    title: 'Fleetguide 360° View',
    subtitle: 'Helping truck drivers see 360°',
    linkName: 'Fleetguide 360°',
    badges: {
      code: ['C++ 14', 'OpenGl', 'VTK', 'ROS', 'BigQuery', 'Data Studio'],
      design: ['Prototyping', 'Figma', 'After Effects', 'Pitch Deck'],
      research: [
        'Contextual Inquiry',
        'Think-Aloud Testing',
        'Usability Testing',
        'Diary Study',
        'Typeform',
        'Product Analytics',
      ],
    },
    mainImage: 'fg_surr_home_1_camera_views',
    // mainImage: 'fg_surr_cover_image',
    // mainImage: 'fg_surr_overview_slide',
    secondaryImages: [
      'fg_surr_home_2_prototypes',
      'fg_surr_home_3_think_aloud',
      'fg_surr_home_4_embedded_code',
    ],
  },
  'ouster-data-app': {
    title: 'Ouster Data App',
    subtitle: 'Full-stack upgrade of internal web tool',
    linkName: 'Ouster Data App',
    badges: {
      code: ['React', 'Flask', 'SQLAlchemy', 'Docker', 'Terraform', 'Three.js'],
      design: ['Figma', 'Prototyping'],
      research: ['Interviews', 'Usability Testing'],
    },
    mainImage: 'oust_da_home_1_near_ir_viz_only',
    secondaryImages: [
      'oust_da_home_2_magma_range_viz',
      'oust_da_home_3_shortcuts',
      'oust_da_home_4_landing_page',
    ],
  },
  'nrec-ar': {
    title: 'Demining in AR',
    linkName: 'Demining in AR',
    subtitle: "Improving military deminers' technique using metal detectors",
    badges: {
      code: ['Unity', 'C#', 'HoloLens', 'Vuforia', 'Wireshark'],
      design: ['Prototyping', 'Promotional Video'],
      research: ['Think-Aloud Testing'],
    },
    mainImage: 'nrec_ar_home_1_levi_outside',
    secondaryImages: [
      'nrec_ar_home_2_user_tests_mosaic',
      'nrec_ar_home_3_markers_experiments_mosaic',
      'nrec_ar_home_4_prototypes_mosaic',
    ],
  },
  hypnovr: {
    title: "HypnoVR App Doctor's View",
    linkName: 'HypnoVR',
    subtitle: 'Virtual Reality for anxiety and pain management',
    badges: {
      code: ['Unity', 'C#', 'Oculus Rift'],
      design: ['Low-Fidelity Wireframe'],
      research: ['Interviews', 'Diagramming'],
    },
    mainImage: 'hypnovr_home_1_app_selection',
    secondaryImages: [
      'hypnovr_home_2_login',
      'hypnovr_home_3_sketches',
      'hypnovr_home_4_wireframes',
    ],
  },
} satisfies Record<string, ProjectInfo>;
