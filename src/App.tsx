import { Route, Routes } from 'react-router-dom';

import AppLayout from '@/AppLayout';
import { AppRoutes } from './routes';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {AppRoutes.map((route) => {
          const Element = route.element;

          return (
            <Route key={route.path} path={route.path} element={<Element />} />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
