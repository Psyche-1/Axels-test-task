import './App.css'
import { createHashRouter, RouterProvider } from 'react-router';
import DashboardTable from './components/DashboardTable'
import DashboardLayout from './components/DashboardLayout';
import OrderShow from './components/OrderShow';

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/orders/:orderId',
        Component: OrderShow,
      },
      {
        path: '*',
        Component: DashboardTable,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
