declare module '*.mdx' {
  // Table of contents exported by our custom rehypeExportToC plugin
  export const tableOfContents: { value: string; id: string }[];
}
