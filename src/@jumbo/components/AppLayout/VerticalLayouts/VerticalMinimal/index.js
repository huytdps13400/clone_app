import clsx from 'clsx';
import React from 'react';
import CmtVerticalLayout from '../../../../../@coremat/CmtLayouts/Vertical';
import CmtContent from '../../../../../@coremat/CmtLayouts/Vertical/Content';
import CmtHeader from '../../../../../@coremat/CmtLayouts/Vertical/Header';
import CmtSidebar from '../../../../../@coremat/CmtLayouts/Vertical/Sidebar';
import { SIDEBAR_TYPE } from '../../../../constants/ThemeOptions';
import ContentLoader from '../../../ContentLoader';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import Header from '../../partials/Header';
import SideBar from '../../partials/SideBar';
import SidebarHeader from '../../partials/SidebarHeader';

const layoutOptions = {
  headerType: defaultContext.headerType,
  footerType: 'fixed',
  sidebarType: SIDEBAR_TYPE.MINI,
  isSidebarFixed: defaultContext.isSidebarFixed,
  isSidebarOpen: false,
  miniSidebarWidth: 80,
  layoutStyle: defaultContext.layoutType,
};

const VerticalMinimal = ({ className, children }) => {
  return (
    <CmtVerticalLayout
      layoutOptions={layoutOptions}
      className={clsx('verticalMinimalLayout', className)}
      header={
        <CmtHeader>
          <Header />
        </CmtHeader>
      }
      sidebar={
        <CmtSidebar>
          <SidebarHeader />
          <SideBar />
        </CmtSidebar>
      }>
      <CmtContent>
        {children}
        {/* <Customizer /> */}
        <ContentLoader />
      </CmtContent>
    </CmtVerticalLayout>
  );
};

export default VerticalMinimal;
