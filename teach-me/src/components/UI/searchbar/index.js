import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

import Button from "../Button";
import Input from "../Input";
import useFetch from "@/util/useFetch";
import Notification from "../notification";

const SearchBar = ({ dataList, setDataList, setLoading, placeholder }) => {
  const [content, setContent] = useState("");

  const [findUser, setFetchFindUser] = useFetch({
    method: "GET",
    body: null,
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setLoading(findUser.loading);
  }, [findUser.loading, setLoading]);

  useEffect(() => {
    if (findUser.data.success) {
      setDataList([findUser.data.user]);
      Notification.success(
        `Success: User "${findUser.data.user.email}" is found`
      );
    } else if (findUser.fetchProps.url) {
      findUser.fetchData();
    }
  }, [findUser.data.success, findUser.fetchProps.url]);

  useEffect(() => {
    if (findUser.error) {
      Notification.error(`Error: User "${content}" is not found`);
    }
  }, [content, findUser.error]);
  
  const handleClick = () => {
    const user = dataList.filter((user) => user.email === content);
    if (user.length > 0) {
      setFetchFindUser((props) => ({
        ...props,
        url: `/user/admin/user/${user[0]._id}`,
      }));
    } else {
      Notification.error(`Error: User "${content}" is not found`);
    }
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className={styles.searchbar}>
      <Input
        className={styles.input}
        onChange={handleChange}
        value={content}
        placeholder={placeholder}
      />
      <Button onClick={handleClick}>Find</Button>
    </div>
  );
};

export default SearchBar;
