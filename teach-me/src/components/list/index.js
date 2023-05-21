import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import useFetch from "@/util/useFetch";
import Loading from "../UI/loading";
import SearchBar from "../UI/searchbar";
import Button from "../UI/button";
import Item from "./item";
import Input from "../UI/input";
import Notification from "../UI/notification";
import { useRouter } from "next/router";
import UserContext from "../context";

const List = {
  Skills({ onChange }) {
    const { user } = useContext(UserContext);

    const [dataList, setDataList] = useState();

    const [isLoading, setLoading] = useState(true);

    const [form, setForm] = useState({
      name: "",
    });

    const [fetchSkills, setFetchSkills] = useFetch({
      url: "/skill",
      method: "GET",
      body: null,
    });

    const [fetchAddSkills, setFetchAddSkills] = useFetch({
      url: "/skill",
      method: "POST",
      body: form,
    });

    useEffect(() => {
      setLoading(fetchSkills.loading);
    }, [fetchSkills.loading]);

    const listItems = dataList?.map((skill, index) => (
      <Item.Skill
        key={index}
        skill={skill}
        updateList={fetchSkills.fetchData}
        isAdmin={user.isAdmin}
        onChange={onChange}
      />
    ));

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!fetchSkills.fetchProps.token) {
        setFetchSkills((props) => ({ ...props, token: token }));
      }
    }, [fetchSkills.fetchProps.token, setFetchSkills]);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!fetchAddSkills.fetchProps.token) {
        setFetchAddSkills((props) => ({ ...props, token: token }));
      }
    }, [fetchAddSkills.fetchProps.token, setFetchAddSkills]);

    useEffect(() => {
      if (fetchSkills.data.success) {
        setDataList(fetchSkills.data.skills);
      } else {
        fetchSkills.fetchData();
      }
    }, [fetchSkills.data]);

    useEffect(() => {
      if (fetchAddSkills.data.success) {
        fetchSkills.fetchData();
        Notification.success(fetchAddSkills.data.message);
      }
    }, [fetchAddSkills.data]);

    useEffect(() => {
      if (fetchAddSkills.error) {
        Notification.success(fetchAddSkills.error.message);
      }
    }, [fetchAddSkills.error]);

    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    };

    const handleClick = (event) => {
      fetchAddSkills.fetchData();
    };

    return (
      <>
        <div className={styles.list}>
          <span className={styles.title}>
            <b>Skills</b>
          </span>
          <div className={styles.body}>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                {listItems}
                {user.isAdmin && (
                  <div className={styles.panel}>
                    <Input
                      name="name"
                      type="text"
                      placeholder="ex. Java"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Button onClick={handleClick}>+ Add skill</Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.panel}>
            <Button
              onClick={() => {
                fetchSkills.fetchData();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </>
    );
  },

  Students() {
    const [dataList, setDataList] = useState();

    const [isLoading, setLoading] = useState(true);

    const [fetchUsers, setFetchUsers] = useFetch({
      url: "/user/admin/users",
      method: "GET",
      body: null,
      token: localStorage.getItem("token"),
    });

    useEffect(() => {
      setLoading(fetchUsers.loading);
    }, [fetchUsers.loading]);

    const listItems = dataList?.map((user, index) => (
      <Item.User key={index} user={user} updateList={fetchUsers.fetchData} />
    ));

    useEffect(() => {
      if (fetchUsers.data.success) {
        setDataList(fetchUsers.data.users);
      } else {
        fetchUsers.fetchData();
      }
    }, [fetchUsers.data]);

    return (
      <>
        <div className={styles.list}>
          <span className={styles.title}>
            <b>Users</b>
          </span>
          <div className={styles.body}>
            {isLoading ? (
              <Loading />
            ) : dataList ? (
              <div>{listItems}</div>
            ) : (
              <div className={styles.item}>
                <div>
                  <span>No Data</span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.panel}>
            <SearchBar
              dataList={dataList}
              setDataList={setDataList}
              setLoading={setLoading}
            />
            <Button
              onClick={() => {
                fetchUsers.fetchData();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </>
    );
  },

  Users() {
    const [dataList, setDataList] = useState();

    const [isLoading, setLoading] = useState(true);

    const [fetchUsers, setFetchUsers] = useFetch({
      url: "/user/admin/users",
      method: "GET",
      body: null,
      token: localStorage.getItem("token"),
    });

    useEffect(() => {
      setLoading(fetchUsers.loading);
    }, [fetchUsers.loading]);

    const listItems = dataList?.map((user, index) => (
      <Item.User key={index} user={user} updateList={fetchUsers.fetchData} />
    ));

    useEffect(() => {
      if (fetchUsers.data.success) {
        setDataList(fetchUsers.data.users);
      } else {
        fetchUsers.fetchData();
      }
    }, [fetchUsers.data]);

    return (
      <>
        <div className={styles.list}>
          <span className={styles.title}>
            <b>Users</b>
          </span>
          <div className={styles.body}>
            {isLoading ? (
              <Loading />
            ) : dataList ? (
              <div>{listItems}</div>
            ) : (
              <div className={styles.user}>
                <div>
                  <span>No Data</span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.panel}>
            <SearchBar
              dataList={dataList}
              setDataList={setDataList}
              setLoading={setLoading}
            />
            <Button
              onClick={() => {
                fetchUsers.fetchData();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </>
    );
  },

  Lessons() {
    const router = useRouter();

    const [dataList, setDataList] = useState();

    const [isLoading, setLoading] = useState(true);

    const [fetchLessons, setFetchMission] = useFetch({
      url: "/missions/missions",
      method: "GET",
      body: null,
      token: localStorage.getItem("token"),
    });

    useEffect(() => {
      setLoading(fetchLessons.loading);
    }, [fetchLessons.loading]);

    const listItems = dataList?.map((lesson, index) => (
      <Item.Lesson
        key={index}
        mission={lesson}
        updateList={fetchLessons.fetchData}
      />
    ));

    useEffect(() => {
      if (fetchLessons.data.success) {
        setDataList(fetchLessons.data.skills);
      } else {
        fetchLessons.fetchData();
      }
    }, [fetchLessons.data]);

    const handleClick = (event) => {
      router.push("/lessons/new-lesson");
    };

    return (
      <>
        <div className={styles.list}>
          <div className={styles.body}>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                {listItems}
                <div className={styles.panel}>
                  <Button onClick={handleClick}>+ Add lesson</Button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.panel}>
            <SearchBar
              dataList={dataList}
              setDataList={setDataList}
              setLoading={setLoading}
            />
            <Button
              onClick={() => {
                fetchLessons.fetchData();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </>
    );
  },
};

export default List;
