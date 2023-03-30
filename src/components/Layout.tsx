import styled from '@emotion/styled';
import { Outlet } from 'react-router';

const LayoutWrapper = styled.div({
  margin: '3% 5%',
  display: 'flex',
});

const Layout = () => {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
