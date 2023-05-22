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
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    amount: 0,
    skills: [],
  });

  const [createMission, setCreateMissionFetch] = useFetch({
    url: "/mission",
    method: "POST",
    body: form,
  });

  useEffect(() => {
    if (createMission.error)
      Notification.error(`Error: ${createMission.error.message}`);
  }, [createMission.error]);

  useEffect(() => {
    if (createMission.data.success)
      Notification.success(`Success: Saved changes`);
  }, [createMission.data]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!createMission.fetchProps.token) {
      setCreateMissionFetch((props) => ({ ...props, token: token }));
    }
  }, [createMission.fetchProps.token, setCreateMissionFetch]);

  const handleChange = (event, skill) => {
    if (event.target.name == "skills" && event.target.checked) {
      console.log('d');
      setForm({
        ...form,
        [event.target.name]: [...form.skills, skill],
      });
    } else {
      console.log(event.target.name);

      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }

    console.log(form);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMission.fetchData();

    console.log(form);

    // router.push("/missions");
  };

  return (
    <Layout title="Projet Dev Front - Profile">
      <NavBar />
      <Header>
        <span>New </span>
        <span>mission</span>
      </Header>
      <form>
        <div styles="row">
          <div styles="col">
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
          <div styles="col">
            <Input
              name="dateStart"
              label="Start:"
              type="date"
              onChange={handleChange}
              value={form.dateStart}
              required
            />
            <Input
              name="dateEnd"
              label="End:"
              type="date"
              onChange={handleChange}
              value={form.dateEnd}
              required
            />
            <Input
              name="amount"
              label="Amout:"
              type="number"
              onChange={handleChange}
              value={form.amount}
              required
            />
          </div>
        </div>
        <List.Skills onChange={handleChange} />
      </form>
      <div styles="btn-row-center">
        <div styles="row">
          <Button type="submit" onClick={handleSubmit}>
            Create mission
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
