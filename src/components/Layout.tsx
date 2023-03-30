import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const LayoutWrapper = styled.div({
  margin: '3% 5%',
  display: 'flex',
});

const Layout = ({ children }: PropsWithChildren) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
