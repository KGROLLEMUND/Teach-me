import Button from "@/components/UI/button";
import Header from "@/components/UI/header";
import Input from "@/components/UI/input";
import Loading from "@/components/UI/loading";
import NavBar from "@/components/UI/navbar";
import Notification from "@/components/UI/notification";
import Select from "@/components/UI/select";
import UserContext from "@/components/context";
import Layout from "@/components/layout";
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
  const [profUpdate, setProfUpdateFetch] = useFetch({
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
      setProfUpdateFetch((props) => ({ ...props, token: token }));
    }
  }, [
    userUpdate.fetchProps.token,
    studentUpdate.fetchProps.token,
    profUpdate.fetchProps.token,
    setUserUpdateFetch,
    setStudentUpdateFetch,
    setProfUpdateFetch,
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
      setForm({
        ...form,
        prof: {
          ...form.prof,
          [event.target.name.split(".")[1]]: event.target.value,
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.name == "Save") {
      console.log(form);

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
    <Layout title="Teach Me - Profile">
      <NavBar />
      {isLoading || Object.keys(user).length == 0 ? (
        <Loading />
      ) : (
        <>
          <Header>
            <span>Pro</span>
            <span>file</span>
          </Header>
          <form>
            <div styles="row">
              <div styles="col">
                <Input
                  name="firstName"
                  label="Firstname:"
                  type="text"
                  placeholder="Bob"
                  onChange={handleChange}
                  value={
                    form.firstName.length > 0
                      ? `${form.firstName[0].toUpperCase()}${form.firstName.slice(
                          1
                        )}`
                      : ""
                  }
                  disabled={!isEdit}
                  required
                />
                <Input
                  name="lastName"
                  label="Lastname:"
                  type="text"
                  placeholder="Martin"
                  onChange={handleChange}
                  value={
                    form.lastName.length > 0
                      ? `${form.lastName[0].toUpperCase()}${form.lastName.slice(
                          1
                        )}`
                      : ""
                  }
                  disabled={!isEdit}
                  required
                />
                <Input
                  name="email"
                  label="E-mail:"
                  type="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  value={form.email}
                  disabled={!isEdit}
                  required
                />
                <Input
                  name="phone"
                  label="Phone:"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  value={form.phone}
                  disabled={!isEdit}
                  required
                />
              </div>
              <div styles="col">
                <Input
                  name="userType"
                  label="Type account:"
                  data-content={user.userType}
                  type="radio"
                  onChange={handleChange}
                  value={form.userType}
                  checked={false}
                  disabled
                />

                {user.userType == "PROF" && (
                  <>
                    <Input
                      name="prof.niveauEnseignement"
                      label="Teaching level:"
                      type="text"
                      onChange={handleChange}
                      value={form.prof.name}
                      required
                      disabled={!isEdit}
                    />
                  </>
                )}

                {user.userType == "STUDENT" && (
                  <>
                    <Input
                      name="student.niveauEtude"
                      label="Level education:"
                      type="number"
                      onChange={handleChange}
                      value={form.student?.niveauEtude}
                      disabled={!isEdit}
                      required
                    />
                  </>
                )}
              </div>
            </div>
          </form>
          <div styles="btn-row-center">
            <div styles="row">
              <Button name="cancel" onClick={handleClick} disabled={!isEdit}>
                Cancel
              </Button>
              <Button
                name={!isEdit ? "Edit" : "Save"}
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {!isEdit ? userUpdate.loading ? <Loading /> : "Edit" : "Save"}
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
