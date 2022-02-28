import Auth from '../components/Auth';
import Layout from '../components/Layout';

const AdminPage: React.VFC = () => {
  return (
    <Layout title="Admin">
      <Auth />
    </Layout>
  );
};

export default AdminPage;
