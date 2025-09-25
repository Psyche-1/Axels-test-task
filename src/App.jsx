import './App.css'
import { createHashRouter, RouterProvider } from 'react-router';
import OrderList from './components/OrderList';
import DashboardLayout from './components/DashboardLayout';
import OrderShow from './components/OrderShow';
import OrderCreate from './components/OrderCreate';
import OrderEdit from './components/OrderEdit';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/orders',
        Component: OrderList,
      },
      {
        path: '/orders/:orderId',
        Component: OrderShow,
      },
      {
        path: '/orders/new',
        Component: OrderCreate,
      },
      {
        path: '/orders/:orderId/edit',
        Component: OrderEdit,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: OrderList,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
       </DialogsProvider>
      </NotificationsProvider>
      
      
    </>
  )
}

export default App
