import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import Header from "@/components/UI/header";
import Button from "@/components/UI/button";
import UserContext from "@/components/context";
import NavBar from "@/components/UI/navbar";
import Loading from "@/components/UI/loading";
import List from "@/components/list";

const Index = () => {
  const { isLogged, user, loading } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (isLoading) {
    return (
      <Layout title="Teach Me - Home">
        <Loading />
      </Layout>
    );
  }

  const handleClick = (event) => {
    router.push("/auth/login");
  };

  return (
    <Layout title="Teach Me - Home">
      {isLogged ? (
        <>
          <NavBar />
          {user.isAdmin ? (
            <>
              <Header>
                <span>Dash</span>
                <span>board</span>
              </Header>
              <div styles="row">
                <List.Users />
                <List.Objects />
              </div>
            </>
          ) : (
            <><Header>
              <span>Find profs or </span>
              <span>lessons</span>
            </Header></>
          )}
        </>
      ) : (
        <>
          <div>
            <Header>
              <span>Welcome to&nbsp;</span>
              <span>Teach Me</span>
            </Header>
          </div>
          <div>
            <Button onClick={handleClick}>
              <span>Let&apos;s&nbsp;</span>
              <span>go</span>
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
