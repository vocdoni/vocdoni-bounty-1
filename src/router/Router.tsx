import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import ProtectedRoutes from '../components/ProtectedRoutes';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="createlection" element={null} />
        <Route path="electionslist" element={null} />
      </Route>

      <Route path="*" element={null} />
    </Route>
  )
);

export default router;
