import { Hidden } from '@material-ui/core';
import React from 'react';
import DisplayLayout from '../partials/customizer/DisplayLayout';
import NavigationLayout from '../partials/customizer/NavigationLayout';
import OtherSettings from '../partials/customizer/OtherSettings';
import SidebarOption from '../partials/customizer/SidebarOption';
import SidebarSize from '../partials/customizer/SidebarSize';
import Theme from '../partials/customizer/Theme';
import ThemeColor from '../partials/customizer/ThemeColor';

const Customizer = () => {
  return (
    <>
      <Theme />
      <ThemeColor />
      <NavigationLayout />
      <DisplayLayout />
      <Hidden lgUp>
        <SidebarOption />
        <SidebarSize />
      </Hidden>
      <OtherSettings />
    </>
  );
};

export default Customizer;
