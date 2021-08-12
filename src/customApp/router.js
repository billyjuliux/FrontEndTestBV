import asyncComponent from '../helpers/AsyncFunc';

const routes = [
  {
    path: 'guestPortal',
    component: asyncComponent(() => import('./containers/GuestPortal'))
  }
];
export default routes;
