import Layout from '../../../shared/components/Layout';

const Dashboard = () => {
  const user = {
    firstName: 'José Miguel',
    firstLastName: 'Mendoza',
    logo: 'https://via.placeholder.com/100' // Puedes usar alguna imagen de prueba
  };

  const userType = 'admin';

  return (
    <Layout user={user} userType={userType}>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <p>Este es un ejemplo funcional del layout en uso.</p>
    </Layout>
  );
};

export default Dashboard;
