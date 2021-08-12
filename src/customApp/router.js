import asyncComponent from '../helpers/AsyncFunc';

const routes = [
  {
    path: 'guestPortal',
    component: asyncComponent(() => import('./components/GuestPortal'))
  }
];
export default routes;
