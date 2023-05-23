import Button from '@/components/UI/button';
import Header from '@/components/UI/header';
import Input from '@/components/UI/input';
import NavBar from '@/components/UI/navbar';
import Notification from '@/components/UI/notification';
import UserContext from '@/components/context';
import Layout from '@/components/layout';
import List from '@/components/list';
import useFetch from '@/util/useFetch';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Index = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    matiere: [],
  });

  const [createLesson, setCreateLessonFetch] = useFetch({
    url: '/cours',
    method: 'POST',
    body: form,
  });

  useEffect(() => {
    if (createLesson.error)
      Notification.error(`Error: ${createLesson.error.message}`);
    console.log(createLesson.error);
  }, [createLesson.error]);

  useEffect(() => {
    if (createLesson.data.success)
      Notification.success(`Success: Saved changes`);
  }, [createLesson.data]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!createLesson.fetchProps.token) {
      setCreateLessonFetch((props) => ({ ...props, token: token }));
    }
  }, [createLesson.fetchProps.token, setCreateLessonFetch]);

  const handleChange = (event, object) => {
    if (event.target.name == 'object' && event.target.checked) {
      setForm({
        ...form,
        [event.target.name]: [...form.matiere, object],
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createLesson.fetchData();

    router.push('/lessons');
  };

  return (
    <Layout title="Teach Me - New Lesson">
      <NavBar />
      <Header>
        <span>New </span>
        <span>lesson</span>
      </Header>
      <form>
        <div styles="row">
          <Input
            name="title"
            label="Title:"
            type="text"
            onChange={handleChange}
            value={form.title}
            required
          />
          <Input
            name="description"
            label="Description:"
            type="textarea"
            onChange={handleChange}
            value={form.description}
            required
          />
        </div>
        <List.Objects onChange={handleChange} />
      </form>
      <div styles="btn-row-center">
        <div styles="row">
          <Button type="submit" onClick={handleSubmit}>
            Create lesson
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
