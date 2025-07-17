import Header from './Header';
import Footer from './Footer';
import Sidebar from '../sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
