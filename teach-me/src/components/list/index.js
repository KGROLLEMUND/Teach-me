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
  Objects({ onChange }) {
    const { user } = useContext(UserContext);

    const [dataList, setDataList] = useState();

    const [isLoading, setLoading] = useState(true);

    const [form, setForm] = useState({
      name: "",
    });

    const [fetchObjects, setFetchObjects] = useFetch({
      url: "/matiere",
      method: "GET",
      body: null,
    });

    const [fetchAddObjects, setFetchAddObjects] = useFetch({
      url: "/matiere",
      method: "POST",
      body: form,
    });

    useEffect(() => {
      setLoading(fetchObjects.loading);
    }, [fetchObjects.loading]);

    const listItems = dataList?.map((object, index) => (
      <Item.Object
        key={index}
        object={object}
        updateList={fetchObjects.fetchData}
        isAdmin={user.isAdmin}
        onChange={onChange}
      />
    ));

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!fetchObjects.fetchProps.token) {
        setFetchObjects((props) => ({ ...props, token: token }));
      }
    }, [fetchObjects.fetchProps.token, setFetchObjects]);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!fetchAddObjects.fetchProps.token) {
        setFetchAddObjects((props) => ({ ...props, token: token }));
      }
    }, [fetchAddObjects.fetchProps.token, setFetchAddObjects]);

    useEffect(() => {
      if (fetchObjects.data.success) {
        setDataList(fetchObjects.data.objects);
      } else {
        fetchObjects.fetchData();
      }
    }, [fetchObjects.data]);

    useEffect(() => {
      if (fetchAddObjects.data.success) {
        fetchObjects.fetchData();
        Notification.success(fetchAddObjects.data.message);
      }
    }, [fetchAddObjects.data]);

    useEffect(() => {
      if (fetchAddObjects.error) {
        Notification.success(fetchAddObjects.error.message);
      }
    }, [fetchAddObjects.error]);

    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    };

    const handleClick = (event) => {
      fetchAddObjects.fetchData();
    };

    return (
      <>
        <div className={styles.list}>
          <span className={styles.title}>
            <b>Objects</b>
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
                      placeholder="ex. Math"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Button onClick={handleClick}>+ Add object</Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.panel}>
            <Button
              onClick={() => {
                fetchObjects.fetchData();
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

    const [fetchLessons, setFetchLessons] = useFetch({
      url: "/cours/cours",
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
        lesson={lesson}
        updateList={fetchLessons.fetchData}
      />
    ));

    useEffect(() => {
      if (fetchLessons.data.success) {
        setDataList(fetchLessons.data.lessons);
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
