import { AccountCircle, Domain, Group, Home } from '@material-ui/icons';
import React from 'react';

const dashboardsMenus = [
  {
    name: 'Trang chủ',
    icon: <Home />,
    type: 'item',
    link: '/dashboard/crm',
  },
  {
    name: 'Tài khoản',
    type: 'item',
    icon: <AccountCircle />,
    link: '/dashboard/profile',
  },
  {
    name: 'Dự án',
    type: 'item',
    icon: <Domain />,
    link: '/dashboard/project',
  },
  {
    name: 'Danh sách tài khoản',
    type: 'item',
    icon: <Group />,
    link: '/dashboard/list_user',
  },
];

export const sidebarNavs = [
  {
    name: 'Home',
    type: 'section',
    children: dashboardsMenus,
  },
];

export const horizontalDefaultNavs = [
  {
    name: 'Home',
    type: 'collapse',
    children: dashboardsMenus,
  },
];

export const minimalHorizontalMenus = [
  {
    name: 'Home',
    type: 'collapse',
    children: dashboardsMenus,
  },
];
