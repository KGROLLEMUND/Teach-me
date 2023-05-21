import Button from "@/components/UI/button";
import Header from "@/components/UI/header";
import Input from "@/components/UI/input";
import Loading from "@/components/UI/loading";
import NavBar from "@/components/UI/navbar";
import Notification from "@/components/UI/notification";
import Select from "@/components/UI/select";
import UserContext from "@/components/context";
import Layout from "@/components/layout";
import List from "@/components/list";
import useFetch from "@/util/useFetch";
import { useContext, useEffect, useState } from "react";

const Index = () => {
  const { isLogged, user, updateUser, loading } = useContext(UserContext);

  const [form, setForm] = useState({});

  const [isEdit, setIsEdit] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [userUpdate, setUserUpdateFetch] = useFetch({
    url: "/user",
    method: "PUT",
    body: form,
  });

  const [studentUpdate, setStudentUpdateFetch] = useFetch({
    url: "/user/student",
    method: "PUT",
    body: form?.student,
  });
  const [profUpdate, setCompanyUpdateFetch] = useFetch({
    url: "/user/prof",
    method: "PUT",
    body: form?.prof,
  });

  useEffect(() => {
    setForm(user);
    setIsLoading(loading);
  }, [loading, user]);

  useEffect(() => {
    if (userUpdate.error)
      Notification.error(`Error: ${userUpdate.error.message}`);
    if (studentUpdate.error)
      Notification.error(`Error: ${studentUpdate.error.message}`);
    if (profUpdate.error)
      Notification.error(`Error: ${profUpdate.error.message}`);
  }, [userUpdate.error, studentUpdate.error, profUpdate.error]);

  useEffect(() => {
    if (
      userUpdate.data.success &&
      (studentUpdate.data.success || profUpdate.data.success)
    )
      Notification.success(`Success: Saved changes`);
  }, [userUpdate.data, studentUpdate.data, profUpdate.data]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      !userUpdate.fetchProps.token ||
      !studentUpdate.fetchProps.token ||
      !profUpdate.fetchProps.token
    ) {
      setUserUpdateFetch((props) => ({ ...props, token: token }));
      setStudentUpdateFetch((props) => ({ ...props, token: token }));
      setCompanyUpdateFetch((props) => ({ ...props, token: token }));
    }
  }, [
    userUpdate.fetchProps.token,
    studentUpdate.fetchProps.token,
    profUpdate.fetchProps.token,
    setUserUpdateFetch,
    setStudentUpdateFetch,
    setCompanyUpdateFetch,
  ]);

  const handleClick = () => {
    setForm(user);
    setIsEdit(false);
  };

  const handleChange = (event) => {
    if (event.target.name.split(".")[0] == "address") {
      setForm({
        ...form,
        address: {
          ...form.address,
          [event.target.name.split(".")[1]]: event.target.value,
        },
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name.split(".")[0] == "student") {
      if (
        event.target.name.split(".")[1] == "rate" ||
        event.target.name.split(".")[1] == "yearOfExperience"
      ) {
        setForm({
          ...form,
          student: {
            ...form.student,
            [event.target.name.split(".")[1]]:
              event.target.value < 1 ? 1 : event.target.value,
          },
        });
      } else {
        setForm({
          ...form,
          student: {
            ...form.student,
            [event.target.name.split(".")[1]]: event.target.value,
          },
        });
      }
    }

    if (event.target.name.split(".")[0] == "prof") {
      if (event.target.name.split(".")[1] == "address") {
        setForm({
          ...form,
          prof: {
            ...form.prof,
            address: {
              ...form.prof.address,
              [event.target.name.split(".")[2]]: event.target.value,
            },
          },
        });
      } else {
        setForm({
          ...form,
          prof: {
            ...form.prof,
            [event.target.name.split(".")[1]]: event.target.value,
          },
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.name == "Save") {
      userUpdate.fetchData();
      updateUser(form);
      if (!user.isAdmin) {
        if (form.student) studentUpdate.fetchData();
        if (form.prof) profUpdate.fetchData();
      }
    }

    setIsEdit(!isEdit);
  };

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
          <List.Missions />
        </>
      )}
    </Layout>
  );
};

export default Index;
