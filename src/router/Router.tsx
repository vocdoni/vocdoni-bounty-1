import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ProtectedRoutes from '../components/ProtectedRoutes';
import RootLayout from '../layouts/RootLayout';
import Create from '../pages/Create';
import Home from '../pages/Home';
import List from '../pages/List';
import Process, { getProcessInfo } from '../pages/Process';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="createprocess" element={<Create />} />
        <Route path="processeslist" element={<List />} />
        <Route
          path="process/:id"
          element={<Process />}
          loader={getProcessInfo}
        />
      </Route>

      <Route path="*" element={null} />
    </Route>
  )
);

export default router;
