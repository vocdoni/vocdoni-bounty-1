import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ProtectedRoutes from '../components/layouts/ProtectedRoutes';
import Create from '../elements/Create';
import Home from '../elements/Home';
import List from '../elements/List';
import NotFound from '../elements/NotFound';
import Process, { getProcessInfo } from '../elements/Process';
import RootLayout from '../elements/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="createprocess" element={<Create />} />
        <Route path="processeslist" element={<List />} />
        <Route path=":id" element={<Process />} loader={getProcessInfo} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
