/// <reference types="vite/client" />

declare module '*.svg?react' {
  import type { FunctionComponent } from 'react';

  export const ReactComponent: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
