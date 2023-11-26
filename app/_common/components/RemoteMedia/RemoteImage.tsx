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
  // Ouster Studio
  oust_studio_home_1_viz_homepage: 'Ouster Studio Viz Home',
  oust_studio_home_2_low_fi_viz_recording_menu:
    'Ouster Studio Low Fidelity Viz Recording Menu',
  oust_studio_home_3_design_system_button: 'Ouster Studio Design System Button',
  oust_studio_home_4_storybook_interaction_test:
    'Ouster Studio Storybook Interaction Test',
  // Profile Pictures
  profile_pic_hiking: 'Profile Picture - Hiking',
  profile_pic_red_bg: 'Profile Picture - Red Background',
  // Timeline Logos
  logo_polytechnique: 'Logo - École Polytechnique',
  logo_columbia: 'Logo - Columbia University',
  logo_cmu: 'Logo - Carnegie Mellon University',
  logo_nrec: 'Logo - National Robotics Engineering Center',
  logo_ouster: 'Logo - Ouster',
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
  sizes: NextImageProps['sizes'];
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
