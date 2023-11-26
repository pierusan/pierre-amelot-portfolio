import { type VideoHTMLAttributes } from 'react';
import remoteMedia from './remoteMedia.json';
import { cn } from '@/cn';

export const remoteVideos = remoteMedia.videos;

export const youtubeVideos = {
  hypnovr_14_france3: {
    id: 'e3LuVa2r3Uo',
    width: 560,
    height: 315,
  },
};

export const vimeoVideos = {
  nrec_ar_8_pitch_nrec_marketing: {
    id: '339577318',
    width: 640,
    height: 360,
  },
};

export type RemoteVideoName =
  | keyof typeof remoteVideos
  | keyof typeof youtubeVideos
  | keyof typeof vimeoVideos;

function isYoutubeVideo(
  name: RemoteVideoName
): name is keyof typeof youtubeVideos {
  return name in youtubeVideos;
}

function isVimeoVideo(name: RemoteVideoName): name is keyof typeof vimeoVideos {
  return name in vimeoVideos;
}

export function RemoteVideo({
  name,
  style,
  autoPlay,
  loop,
  muted,
  controls,
  ...rest
}: { name: RemoteVideoName } & Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  'src' | 'width' | 'height'
>) {
  if (isYoutubeVideo(name)) {
    const { id, width, height } = youtubeVideos[name];

    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?${
          autoPlay ? '&autoplay=1' : ''
        }${muted ? '&mute=1' : ''}${loop ? `&loop=1&playlist=${id}` : ''}${
          controls ? `&controls=1` : '&controls=0'
        }`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={cn('border-0')}
        style={{ aspectRatio: `${width}/${height}` }}
      />
    );
  }

  if (isVimeoVideo(name)) {
    const { id, width, height } = vimeoVideos[name];

    return (
      <iframe
        src={`https://player.vimeo.com/video/${id}?title=1&byline=1&portrait=1${
          autoPlay ? '&autoplay=1' : ''
        }${muted ? '&muted=1' : ''}${loop ? '&loop=1' : ''}${
          controls ? `&controls=1` : '&controls=0'
        }`}
        title="Vimeo video player"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className={cn('border-0')}
        style={{ aspectRatio: `${width}/${height}` }}
      ></iframe>
    );
  }

  const { src, width, height } = remoteVideos[name];

  return (
    <video
      src={src}
      width={width}
      height={height}
      // Typescript 'preflight' reset rules (height:auto) break the aspect ratio
      // automatically computed by the browser. height:unset doesn't reset it so
      // we apply the aspect ratio manually here. Monitor this thread for
      // updates: https://github.com/tailwindlabs/tailwindcss/issues/506
      style={{ aspectRatio: `${width}/${height}`, ...style }}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      {...rest}
    />
  );
}
