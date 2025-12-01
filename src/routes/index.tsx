import { JSX, lazy, LazyExoticComponent } from 'react';

interface IRoutes {
  path: string;
  element: LazyExoticComponent<() => JSX.Element | null>;
  children?: IRoutes[];
  authRedirect?: boolean;
  protected?: boolean;
}

export const AppRoutes: IRoutes[] = [

  {
    path: '/',
    element: lazy(() => import('@/pages/Home')),
  }
];
