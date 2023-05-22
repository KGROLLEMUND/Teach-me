import Button from "@/components/UI/button";
import Header from "@/components/UI/header";
import Input from "@/components/UI/input";
import Select from "@/components/UI/select";
import Loading from "@/components/UI/loading";
import Notification from "@/components/UI/notification";

import UserContext from "@/components/context";
import Layout from "@/components/layout";

import useFetch from "@/util/useFetch";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userType: "",
  });

  const [formStudent, setFormStudent] = useState({
    niveauEtude: 1,
  });

  const [formProf, setFormProf] = useState({
    niveauEnseignement: "",
  });

  const [user, setFetchUser] = useFetch({
    url: "/auth/register",
    method: "POST",
    body: form,
    token: null,
  });

  const [student, setFetchStudent] = useFetch({
    url: "/auth/student",
    method: "POST",
    body: formStudent,
  });

  const [prof, setFetchProf] = useFetch({
    url: "/auth/prof",
    method: "POST",
    body: formProf,
  });

  useEffect(() => {
    if (isLogged) router.push("/");
  }, [isLogged, router]);

  useEffect(() => {
    if (user.data.token) {
      localStorage.setItem("token", user.data.token);

      if (form.userType == "STUDENT") {
        setFetchStudent((props) => ({ ...props, token: user.data.token }));
      }
      if (form.userType == "PROF") {
        setFetchProf((props) => ({ ...props, token: user.data.token }));
      }
    }
  }, [user.data, form.userType, setFetchStudent, setFetchProf]);

  useEffect(() => {
    if (!student.data.success && student.fetchProps.token != null) {
      student.fetchData();
    } else if (student.data.success) {
      router.push("/");
    }
    if (!prof.data.success && prof.fetchProps.token != null) {
      prof.fetchData();
    } else if (prof.data.success) {
      router.push("/");
    }
  }, [prof, student, router]);

  useEffect(() => {
    if (user.error) {
      const code = user.error.message.split(" ")[0];

      if (code == "E11000") {
        Notification.error(`Error: Email already exist`);
      } else {
        Notification.error(`Error: ${user.error.message}`);
      }
    }

    if (student.error) {
      Notification.error(`Error: ${student.error.message}`);
    }

    if (prof.error) {
      Notification.error(`Error: ${prof.error.message}`);
    }
  }, [user.error, student.error, prof.error]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    if (event.target.name.split(".")[0] == "student") {
      if (event.target.name.split(".")[1] == "niveauEtude") {
        setFormStudent({
          ...formStudent,
          [event.target.name.split(".")[1]]:
            event.target.value < 1 ? 1 : event.target.value,
        });
      } else {
        setFormStudent({
          ...formStudent,
          [event.target.name.split(".")[1]]: event.target.value,
        });
      }
    }

    if (event.target.name.split(".")[0] == "prof") {
      setFormProf({
        ...formProf,
        [event.target.name.split(".")[1]]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    user.fetchData();
  };

  return (
    <Layout title="Teach Me - Sign Up">
      <Header>
        <span>Sign&nbsp;</span>
        <span>Up</span>
      </Header>
      <form onSubmit={handleSubmit}>
        <div styles="row">
          <div styles="col">
            <Input
              name="firstName"
              label="Firstname:"
              type="text"
              placeholder="Bob"
              onChange={handleChange}
              value={form.firstName}
              required
            />
            <Input
              name="lastName"
              label="Lastname:"
              type="text"
              placeholder="Martin"
              onChange={handleChange}
              value={form.lastName}
              required
            />
            <Input
              name="email"
              label="E-mail:"
              type="email"
              placeholder="your@email.com"
              onChange={handleChange}
              value={form.email}
              required
            />
            <Input
              name="password"
              label="Password:"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <Input
              name="phone"
              label="Phone:"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={form.phone}
              required
            />
          </div>
          <div styles="col">
            <div styles="row">
              <Input
                name="userType"
                data-content="Student"
                type="radio"
                onChange={handleChange}
                value="STUDENT"
                checked={form.userType == "STUDENT"}
                required
              />
              <Input
                name="userType"
                data-content="Prof"
                type="radio"
                onChange={handleChange}
                value="PROF"
                checked={form.userType == "PROF"}
                required
              />
            </div>
            {form.userType == "STUDENT" && (
              <>
                <Input
                  name="student.niveauEtude"
                  label="Etude level:"
                  type="number"
                  onChange={handleChange}
                  value={formStudent.niveauEtude}
                  required
                />
              </>
            )}

            {form.userType == "PROF" && (
              <>
                <Input
                  name="prof.niveauEnseignement"
                  label="Teaching level:"
                  type="text"
                  onChange={handleChange}
                  value={formProf.niveauEnseignement}
                  required
                />
              </>
            )}
          </div>
        </div>

        <Button type="submit">
          {user.loading || student.loading || prof.loading ? (
            <Loading />
          ) : (
            "Create account"
          )}
        </Button>
        <p>
          You have an account?&nbsp;
          <Link href="/auth/login">Sign in</Link>
        </p>
      </form>
    </Layout>
  );
};

export default Index;
