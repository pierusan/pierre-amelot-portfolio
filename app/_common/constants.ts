import { RemoteImageName } from '@/components/RemoteImage';

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
    mainImage: 'oust_studio_viz_home',
    secondaryImages: [
      'oust_studio_low_fi_viz_recording_menu',
      'oust_studio_design_system_button',
      'oust_studio_storybook_interaction_test',
    ],
  },
  'fleetguide-surround-view': {
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
    mainImage: 'fg_surr_camera_views',
    // mainImage: 'fg_surr_cover_image',
    // mainImage: 'fg_surr_overview_slide',
    secondaryImages: [
      'fg_surr_prototypes_2',
      'fg_surr_think_aloud',
      'fg_surr_embedded_code',
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
    mainImage: 'oust_da_near_ir_viz_only',
    secondaryImages: [
      'oust_da_magma_range',
      'oust_da_shortcuts_2',
      'oust_da_landing',
    ],
  },
  'nrec-ar': {
    title: 'Demining in AR',
    linkName: 'AR Demining',
    subtitle: "Improving military deminers' technique using metal detectors",
    badges: {
      code: ['Unity', 'C#', 'HoloLens', 'Vuforia', 'Wireshark'],
      design: ['Prototyping', 'Promotional Video'],
      research: ['Think-Aloud Testing'],
    },
    mainImage: 'nrec_ar_hero',
    secondaryImages: [
      'nrec_ar_user_tests_mosaic',
      'nrec_ar_markers_experiments_mosaic',
      'nrec_ar_prototype_options_mosaic',
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
    mainImage: 'hypnovr_app_selection',
    secondaryImages: [
      'hypnovr_app_login',
      'hypnovr_sketches',
      'hypnovr_wireframes',
    ],
  },
} satisfies Record<string, ProjectInfo>;

export type ProjectKey = keyof typeof projects;
