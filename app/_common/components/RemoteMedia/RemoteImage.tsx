import Image from 'next/image';
import { type ComponentProps } from 'react';
import remoteImages from './remoteImages.json';

type NextImageProps = ComponentProps<typeof Image>;
type AnyRemoteImageName = keyof typeof remoteImages;

// Fetch all the alt fields from the remoteImagesFull object and match them with
// the remoteImages keys from the json
const remoteImageAltTexts = {
  oust_studio_viz_home: 'Ouster Studio Viz Home',
  oust_studio_design_system_button: 'Ouster Studio Design System Button',
  oust_studio_storybook_interaction_test:
    'Ouster Studio Storybook Interaction Test',
  oust_studio_low_fi_viz_recording_menu:
    'Ouster Studio Low Fidelity Viz Recording Menu',
  fg_surr_cover_image: 'Fleetguide Surround View Cover Image',
  fg_surr_think_aloud:
    'Fleetguide Surround View Think Aloud Usability Testing Session',
  fg_surr_prototypes: 'Fleetguide Surround View Prototypes',
  fg_surr_prototypes_2: 'Fleetguide Surround View Prototypes',
  fg_surr_embedded_code: 'Fleetguide Surround View Embedded Code',
  fg_surr_usertest_sprinter:
    'Fleetguide Surround View User Testing in Sprinter Van',
  fg_surr_camera_views: 'Fleetguide Surround View - Camera Views',
  fg_surr_system_diagram: 'Fleetguide Surround View System Diagram',
  fg_surr_overview_slide: 'Fleetguide Surround View Overview Slide',
  oust_da_shortcuts: 'Ouster Data App Shortcuts',
  oust_da_shortcuts_2: 'Ouster Data App Shortcuts',
  oust_da_highlight_second_return: 'Ouster Data App Highlight Second Return',
  oust_da_near_ir: 'Ouster Data App Near Infrared',
  oust_da_magma_range: 'Ouster Data App Magma Range',
  oust_da_landing: 'Ouster Data App Landing Page',
  oust_da_near_ir_viz_only: 'Ouster Data App Near Infrared Visualization Only',
  oust_da_highlight_second_return_2: 'Ouster Data App Highlight Second Return',
  profile_pic_hiking: 'Profile Picture - Hiking',
  profile_pic_red_bg: 'Profile Picture - Red Background',
  logo_polytechnique: 'Logo - École Polytechnique',
  logo_columbia: 'Logo - Columbia University',
  logo_cmu: 'Logo - Carnegie Mellon University',
  logo_nrec: 'Logo - National Robotics Engineering Center',
  logo_ouster: 'Logo - Ouster',
  nrec_ar_daily_working: 'NREC Augmented Reality - Daily Working Snapshots',
  nrec_ar_prototype_options_mosaic:
    'NREC Augmented Reality - Prototype Options',
  nrec_ar_user_tests_mosaic: 'NREC Augmented Reality - User Tests',
  nrec_ar_markers_experiments_mosaic:
    'NREC Augmented Reality - Markers Experiments',
  nrec_ar_testing_outside: 'NREC Augmented Reality - Testing Outside',
  nrec_ar_hero: 'NREC Augmented Reality - Hero Image',
  hypnovr_app_selection: 'Hypno VR - App Selection Screenshot',
  hypnovr_app_session: 'Hypno VR - App Session Screenshot',
  hypnovr_app_login: 'Hypno VR - App Login Screenshot',
  hypnovr_sketches: 'Hypno VR - Sketches',
  hypnovr_wireframes: 'Hypno VR - Wireframes',
  hypnovr_sequenceflow: 'Hypno VR - Procedure sequence flow diagram',
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
