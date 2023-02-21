import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import CreateProcess from '../components/createProcess/CreateProcess';
import ProtectedRoutes from '../components/ProtectedRoutes';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="createprocess" element={<CreateProcess />} />
        <Route path="processeslist" element={null} />
      </Route>

      <Route path="*" element={null} />
    </Route>
  )
);

export default router;
