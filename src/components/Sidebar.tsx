import React from 'react';
import { Paragraph } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const Sidebar = (props: SidebarProps) => {
  return <Paragraph>Sidebar AWS</Paragraph>;
};

export default Sidebar;
