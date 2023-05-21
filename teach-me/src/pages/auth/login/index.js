import Button from "@/components/UI/button";
import Header from "@/components/UI/header";
import Input from "@/components/UI/input";
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
    email: "",
    password: "",
  });

  const [login, setFetchLogin] = useFetch({
    url: "/auth/login",
    method: "POST",
    body: form,
    token: null,
  });

  useEffect(() => {
    if (isLogged) router.push("/");
  }, [isLogged, router]);

  useEffect(() => {
    if (login.data.token) {
      localStorage.setItem("token", login.data.token);
      router.push("/");
    }
  }, [login.data, router]);

  useEffect(() => {
    if (login.error) {
      Notification.error(`Error: ${login.error.message}`);
    }
  }, [login.error]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login.fetchData();
  };

  return (
    <Layout title="Projet Dev Front - Sign In">
      <Header>
        <span>Sign&nbsp;</span>
        <span>In</span>
      </Header>
      <form onSubmit={handleSubmit} page="login">
        <div styles="row">
          <div styles="col">
            <Input
              name="email"
              label="E-mail:"
              type="email"
              placeholder="your@email.com"
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              label="Password:"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit" onSubmit={handleSubmit}>
          {login.loading ? <Loading /> : "Submit"}
        </Button>
        <p>
          You don&apos;t have an account?&nbsp;
          <Link href="/auth/register">Sign up</Link>
        </p>
      </form>
    </Layout>
  );
};

export default Index;
