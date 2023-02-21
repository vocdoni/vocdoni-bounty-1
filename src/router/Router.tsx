import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={null}>
      <Route element={null}>
        <Route path="createlection" element={null} />
        <Route path="electionslist" element={null} />
      </Route>

      <Route path="*" element={null} />
    </Route>
  )
);

export default router;
