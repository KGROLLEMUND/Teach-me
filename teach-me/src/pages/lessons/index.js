import Header from '@/components/UI/header';
import Loading from '@/components/UI/loading';
import NavBar from '@/components/UI/navbar';
import Notification from '@/components/UI/notification';
import Select from '@/components/UI/select';
import UserContext from '@/components/context';
import Layout from '@/components/layout';
import List from '@/components/list';
import useFetch from '@/util/useFetch';
import { useContext, useEffect, useState } from 'react';

const Index = () => {
  const { isLogged, user, updateUser, loading } =
    useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, user]);

  return (
    <Layout title="Teach Me - Lessons">
      <NavBar />
      {isLoading || Object.keys(user).length == 0 ? (
        <Loading />
      ) : (
        <>
          <Header>
            <span>Less</span>
            <span>ons</span>
          </Header>
          <List.Lessons />
        </>
      )}
    </Layout>
  );
};

export default Index;
