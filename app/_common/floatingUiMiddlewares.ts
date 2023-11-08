import { shift, type Middleware, type Rect } from '@floating-ui/react';

// https://floating-ui.com/docs/useFloating#option-reactivity
export const reactiveShift = (
  options: Parameters<typeof shift>[0],
  deps: unknown
): Middleware => ({
  ...shift(options),
  options: deps,
});

// In case of non-trivial links between floating and reference elements (like
// poly-lines), we might need the floating element dimensions. Here we pass that
// info through a custom middleware to avoid calling `getBoundingClientRect`
// directly in the component again and trigger a browser reflow
export type ForwardDataMiddlewareData = {
  floatingRect: Rect;
};
export const forwardData = (): Middleware => ({
  name: 'forwardData',
  fn: ({ rects }) => ({
    data: {
      floatingRect: rects.floating,
    } satisfies ForwardDataMiddlewareData,
  }),
});
