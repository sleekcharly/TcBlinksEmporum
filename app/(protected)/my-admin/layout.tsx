import Navbar from './_components/navbar';

type props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: props) => {
  return (
    <div className="flex relative max-w-screen px-1 py-1">
      <div>
        <Navbar />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
