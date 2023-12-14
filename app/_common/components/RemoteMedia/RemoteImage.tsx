import Image from 'next/image';
import { type ComponentProps } from 'react';
import remoteMedia from './remoteMedia.json';

const remoteImages = remoteMedia.images;

type NextImageProps = ComponentProps<typeof Image>;
type AnyRemoteImageName = keyof typeof remoteImages;

// Fetch all the alt fields from the remoteImagesFull object and match them with
// the remoteImages keys from the json
const remoteImageAltTexts = {
  // Fleetguide Surround View
  fg_surr_home_1_camera_views: 'Fleetguide Surround View - Camera Views',
  fg_surr_home_2_prototypes: 'Fleetguide Surround View - Prototypes',
  fg_surr_home_3_think_aloud:
    'Fleetguide Surround View Think Aloud Usability Testing Session',
  fg_surr_home_4_embedded_code: 'Fleetguide Surround View Embedded Code',
  fg_surr_1_cover_image: 'Fleetguide Surround View Cover Image',
  fg_surr_2_system_diagram: 'Fleetguide Surround View System Diagram',
  fg_surr_3_usertest_sprinter:
    'Fleetguide Surround View User Testing in Sprinter Van',
  fg_surr_4_camera_views: 'Fleetguide Surround View - Camera Views',
  fg_surr_6_blobs: 'Fleetguide Surround View - Blobs',
  fg_surr_7_double_diamond: 'Double Diamond Process Diagram',
  fg_surr_8_ouster_research_photos: 'Fleetguide User Research Photos',
  fg_surr_10_contextual_inquiry_insights:
    'Fleetguide Surround View Contextual Inquiry Insights',
  fg_surr_11_data_collection_go_pro:
    'Fleetguide Surround View Data Collection with GoPro',
  fg_surr_12_prototypes: 'Fleetguide Surround View C++ Prototypes',
  fg_surr_13_think_aloud_with_call_outs:
    'Fleetguide Surround View Think Aloud Usability Testing Session Annotated Photo',
  fg_surr_14_survey_responses: 'Fleetguide Surround View Survey Responses',
  fg_surr_17_coding: 'Fleetguide Surround View Coding',
  fg_surr_18_display_parameters: 'Fleetguide Surround View Display Parameters',
  fg_surr_19_session_setup: 'Fleetguide Surround View Session Setup',
  fg_surr_20_user_test_stats: 'Fleetguide Surround View User Test Stats',
  fg_surr_21_sensor_placement_iterations:
    'Fleetguide Surround View Sensor Placement Iterations',
  fg_surr_22_ui_diagram: 'Fleetguide Surround View UI Diagram',
  fg_surr_23_safety_overlays: 'Fleetguide Surround View Safety Overlays',
  fg_surr_24_analytics_methods: 'Fleetguide Surround View Analytics Methods',
  fg_surr_25_display_glare_feedback: 'Fleetguide Surround View Glare Feedback',
  fg_surr_26_blurred_roadmap: 'Fleetguide Surround View Blurred Roadmap',
  // HypnoVR
  hypnovr_home_1_app_selection: 'Hypno VR - App Selection Screenshot',
  hypnovr_home_2_login: 'Hypno VR - App Login Screenshot',
  hypnovr_home_3_sketches: 'Hypno VR - Sketches',
  hypnovr_home_4_wireframes: 'Hypno VR - Wireframes',
  hypnovr_1_vr_previews: 'Hypno VR - VR Previews',
  hypnovr_2_params_selection: 'Hypno VR - Parameters Selection Screen',
  hypnovr_3_launch_session: 'Hypno VR - Launch Session Screen',
  hypnovr_4_monitor: 'Hypno VR - Monitoring Session Screen',
  hypnovr_4_2_my_responsibility:
    'Hypno VR - Diagram highlighting the system I was responsible for',
  hypnovr_5_sequence_flow_diagram: 'Hypno VR - Sequence Flow Diagram',
  hypnovr_6_sketches: 'Hypno VR - Sketches',
  hypnovr_7_wireframes: 'Hypno VR - Wireframes',
  hypnovr_8_design_crit: 'Hypno VR - Design Critique',
  hypnovr_10_high_fidelity_screens: 'Hypno VR - High Fidelity Screens',
  hypnovr_11_unity_screenshot: 'Hypno VR - Unity Screenshot',
  // NREC Demining in AR
  nrec_ar_home_1_levi_outside: 'NREC Augmented Reality - Hero Image',
  nrec_ar_home_2_user_tests_mosaic: 'NREC Augmented Reality - User Tests',
  nrec_ar_home_3_markers_experiments_mosaic:
    'NREC Augmented Reality - Marker Experiments',
  nrec_ar_home_4_prototypes_mosaic:
    'NREC Augmented Reality - Prototype Options',
  nrec_ar_1_army_deminer: 'NREC Augmented Reality - Army Deminer',
  nrec_ar_3_system_diagram: 'NREC Augmented Reality - System Diagram',
  nrec_ar_4_hw_experiments: 'NREC Augmented Reality - Hardware Experiments',
  nrec_ar_5_prototypes: 'NREC Augmented Reality - Prototype Options',
  nrec_ar_6_user_test: 'NREC Augmented Reality - User Tests',
  nrec_ar_7_markers: 'NREC Augmented Reality - Marker Experiments',
  // Ouster Data App
  oust_da_home_1_near_ir_viz_only:
    'Ouster Data App Near Infrared Visualization Only',
  oust_da_home_2_magma_range_viz: 'Ouster Data App Magma Range Visualization',
  oust_da_home_3_shortcuts: 'Ouster Data App Shortcuts',
  oust_da_home_4_landing_page: 'Ouster Data App Landing Page',
  oust_da_1_fleetguide_calibration: 'Ouster Data App Fleetguide Calibration',
  oust_da_3_spreadsheet: 'Ouster Data App Spreadsheet',
  oust_da_4_upload_ux: 'Ouster Data App Upload UX',
  oust_da_7_download: 'Ouster Data App Download',
  oust_da_8_range_rings: 'Ouster Data App Range Rings',
  oust_da_9_camera_type: 'Ouster Data App Camera Type',
  oust_da_10_calibrated_reflectivity: 'Ouster Data App Calibrated Reflectivity',
  oust_da_11_noise_suppression: 'Ouster Data App Noise Suppression',
  oust_da_12_returns: 'Ouster Data App Dual Returns',
  oust_da_13_2D_image_aspect_ratio: 'Ouster Data App 2D Image Aspect Ratio',
  oust_da_14_shortcuts: 'Ouster Data App Shortcuts',
  oust_da_15_public_link: 'Ouster Data App Public Link',
  // Ouster Studio
  oust_studio_home_1_viz_homepage: 'Ouster Studio Viz Home',
  oust_studio_home_2_low_fi_viz_recording_menu:
    'Ouster Studio Low Fidelity Viz Recording Menu',
  oust_studio_home_3_design_system_button: 'Ouster Studio Design System Button',
  oust_studio_home_4_storybook_interaction_test:
    'Ouster Studio Storybook Interaction Test',
  oust_studio_1_high_res_data: 'Ouster Studio High Resolution Data',
  oust_studio_2_redesign_home: 'Ouster Studio v2 - Home Viz Page',
  oust_studio_3_old_ui: 'Ouster Studio v2 - Old UI',
  oust_studio_4_figma_design_system: 'Ouster Studio - Figma Design System',
  oust_studio_4_components_design_system: 'Ouster Studio - Design System',
  oust_studio_5_interviews: 'Ouster Studio - Internal Interviews',
  oust_studio_6_touchpoints_sales_process:
    'Ouster Studio - Touchpoints in Sales Process',
  oust_studio_7_tasks: 'Ouster Studio - Double Diamond',
  oust_studio_8_features_for_eval: 'Ouster Studio - Features for Evaluation',
  oust_studio_9_usability_issues:
    'Ouster Studio - Usability Issues in the old UI',
  oust_studio_10_libs_and_apps: 'Ouster Studio - Libraries and Apps Diagram',
  oust_studio_11_inspirations: 'Ouster Studio - All inspirations',
  oust_studio_12_interesting_interactions:
    'Ouster Studio - Interesting Interactions in inspirations',
  oust_studio_13_initial_sketches: 'Ouster Studio - Initial Sketches',
  oust_studio_15_primary_tokens: 'Ouster Studio - Primary Tokens',
  oust_studio_16_semantic_design_tokens: 'Ouster Studio - Semantic Tokens',
  oust_studio_17_components_design_system:
    'Ouster Studio - Design System Components',
  oust_studio_18_components_light_and_dark:
    'Ouster Studio - Light and Dark Button Components',
  oust_studio_20_figma_prototype_behind_scenes:
    'Ouster Studio - Figma Prototype Behind the Scenes',
  oust_studio_21_novel_interactions_config:
    'Ouster Studio - Novel Interactions when Configuring sensors',
  oust_studio_22_novel_interactions_viz:
    'Ouster Studio - Novel Interactions in Viz',
  oust_studio_23_storybook_design_system:
    'Ouster Studio - Storybook Design System',
  oust_studio_24_storybook_webviz: 'Ouster Studio - Storybook Webviz',
  oust_studio_25_interaction_test: 'Ouster Studio - Interaction Tests',
  oust_studio_26_storybook_theme_switch_addon:
    'Ouster Studio - Storybook Theme Switch Addon',
  // Profile Pictures
  profile_pic_hiking: 'Profile Picture - Hiking',
  profile_pic_red_bg: 'Profile Picture - Red Background',
  // Timeline Logos
  logo_polytechnique: 'Logo - École Polytechnique',
  logo_columbia: 'Logo - Columbia University',
  logo_cmu: 'Logo - Carnegie Mellon University',
  logo_nrec: 'Logo - National Robotics Engineering Center',
  logo_ouster: 'Logo - Ouster',
  // Other Logos
  logo_chakra_ui: 'Logo - Chakra UI',
  logo_docker: 'Logo - Docker',
  logo_flask: 'Logo - Flask',
  logo_gitlab: 'Logo - GitLab',
  logo_postgres: 'Logo - PostgreSQL',
  logo_python: 'Logo - Python',
  logo_terraform: 'Logo - Terraform',
  logo_storybook: 'Logo - Storybook',
  logo_vite: 'Logo - Vite',
} satisfies Partial<Record<AnyRemoteImageName, string>>;

export type RemoteImageName = keyof typeof remoteImageAltTexts;

export function RemoteImage({
  name,
  fill,
  placeholder = 'blur',
  sizes,
  ...rest
}: {
  name: RemoteImageName;
  // Make sizes required for good practice
  sizes: NonNullable<NextImageProps['sizes']>;
} & Omit<
  NextImageProps,
  'src' | 'alt' | 'width' | 'height' | 'blurDataUrl' | 'sizes'
>) {
  const { width, height, blurDataURL, src } = remoteImages[name];
  const alt = remoteImageAltTexts[name];
  const sizeProperties = fill ? { fill: true } : { width, height };

  return (
    <Image
      src={decodeURIComponent(src)}
      alt={alt}
      {...sizeProperties}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      {...rest}
    />
  );
}
