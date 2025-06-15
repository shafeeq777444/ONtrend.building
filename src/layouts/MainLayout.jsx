// Layout.jsx
import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';

export default function MainLayout() {
  return (
    <>
      <TopBar />
      <Outlet /> {/* This renders the matched route */}
    </>
  );
}
