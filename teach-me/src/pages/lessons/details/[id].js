import Button from '@/components/UI/button';
import Header from '@/components/UI/header';
import Input from '@/components/UI/input';
import Loading from '@/components/UI/loading';
import NavBar from '@/components/UI/navbar';
import Notification from '@/components/UI/notification';
import Select from '@/components/UI/select';
import UserContext from '@/components/context';
import Layout from '@/components/layout';
import List from '@/components/list';
import useFetch from '@/util/useFetch';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Index = () => {
  const { isLogged, user, updateUser, loading } =
    useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, user]);

  const [data, setData] = useState();

  const [fetchLesson, setFetchLesson] = useFetch({
    method: 'GET',
    body: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!fetchLesson.fetchProps.token && router.query.id) {
      setFetchLesson((props) => ({
        ...props,
        url: `/cours/${router.query.id}`,
        token: token,
      }));
    }
  }, [
    fetchLesson.fetchProps.token,
    router.query.id,
    loading,
    setFetchLesson,
  ]);

  useEffect(() => {
    if (fetchLesson.fetchProps.url) {
      fetchLesson.fetchData();
    }
  }, [fetchLesson.fetchProps.url]);
  
  useEffect(() => {
    console.log(fetchLesson.data);
    if (fetchLesson.data.success) setData(fetchLesson.data.lesson);
  }, [fetchLesson.data]);

  return (
    <Layout title="Teach Me - Details lesson">
      <NavBar />
      {isLoading || Object.keys(user).length == 0 ? (
        <Loading />
      ) : (
        <>
          <Header>
            <span>Less</span>
            <span>on</span>
          </Header>
          <div>
            <Input
              name="title"
              label="Title:"
              type="text"
              placeholder=""
              value={data.title}
              disabled
              required
            />
            <Input
              name="description"
              label="Description:"
              type="textarea"
              placeholder=""
              value={data.description}
              disabled
              required
            />
          </div>
          <List.Propositions list={data.propositions} />
        </>
      )}
    </Layout>
  );
};

export default Index;
