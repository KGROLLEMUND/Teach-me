import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useFetch from "@/util/useFetch";
import Button from "@/components/UI/button";
import Notification from "@/components/UI/notification";
import Input from "@/components/UI/input";
import Loading from "@/components/UI/loading";

const Item = {
  Lesson({ lesson, updateList }) {
    const [deleteLesson, setFetchDeleteLesson] = useFetch({
      url: `/cours/${lesson._id}`,
      method: "DELETE",
      body: null,
      token: localStorage.getItem("token"),
    });

    useEffect(() => {
      if (deleteLesson.data.success) {
        updateList();
        Notification.success(
          `Success: Lesson "${deleteLesson.data.skill.name}" is deleted`
        );
      }
    }, [deleteLesson.data]);

    const handleClick = (event) => {
      if (event.target.name == "delete") {
        deleteLesson.fetchData();
      }

      if (event.target.name == "edit") {
      }
    };

    return (
      <>
        <div className={styles.item}>
          <div>
            <Input
              name="name"
              type="text"
              placeholder={skill.name}
              onChange={handleChange}
              value={form.name}
              disabled={!isEdit}
              required
            />
          </div>
          <div>
            <Button name="edit" type="submit" onClick={handleClick}>
              Edit
            </Button>
            <Button name="delete" onClick={handleClick}>
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  },

  User({ user, updateList }) {
    const [deleteUser, setFetchDeleteUser] = useFetch({
      url: `/user/admin/user/${user._id}`,
      method: "DELETE",
      body: null,
      token: localStorage.getItem("token"),
    });

    useEffect(() => {
      if (deleteUser.data.success) {
        updateList();
        Notification.success(
          `Success: User "${deleteUser.data.user.email}" is deleted`
        );
      }
    }, [deleteUser.data]);

    const handleClick = () => {
      deleteUser.fetchData();
    };

    return (
      <>
        <div className={styles.item}>
          <div>
            <span>
              {user.firstName.length > 0
                ? `${user.firstName[0].toUpperCase()}${user.firstName.slice(1)}`
                : ""}{" "}
              {user.lastName.length > 0
                ? `${user.lastName[0].toUpperCase()}${user.lastName.slice(1)}`
                : ""}
            </span>
            <span>{user.email}</span>
            <span>{user.userType}</span>
          </div>
          <div>
            <Button onClick={handleClick} disabled={user.isAdmin}>
              Delete user
            </Button>
          </div>
        </div>
      </>
    );
  },
};

export default Item;
