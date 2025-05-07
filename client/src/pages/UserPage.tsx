import Sidebar from '../components/Sidebar';

const UserPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        UserPage
      </div>
    </div>
  );
};

export default UserPage;
