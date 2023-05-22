import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import useFetch from '@/util/useFetch';
import Button from '@/components/UI/button';
import Notification from '@/components/UI/notification';
import Input from '@/components/UI/input';
import Loading from '@/components/UI/loading';

const Item = {
  Lesson({ lesson, updateList }) {
    const [deleteLesson, setFetchDeleteLesson] = useFetch({
      url: `/cours/${lesson._id}`,
      method: 'DELETE',
      body: null,
      token: localStorage.getItem('token'),
    });

    useEffect(() => {
      if (deleteLesson.data.success) {
        updateList();
        Notification.success(
          `Success: Lesson "${deleteLesson.data.lesson.title}" is deleted`
        );
      }
    }, [deleteLesson.data]);

    const handleClick = (event) => {
      if (event.target.name == 'delete') {
        deleteLesson.fetchData();
      }

      if (event.target.name == 'edit') {
      }
    };

    return (
      <>
        <div className={styles.item}>
          <div>
            <span>{lesson.title}</span>
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

  Object({ object, updateList, isAdmin, onChange }) {
    const [form, setForm] = useState(object);
    const [isEdit, setIsEdit] = useState(false);

    const [deleteObject, setFetchDeleteObjects] = useFetch({
      url: `/matiere/${object._id}`,
      method: 'DELETE',
      body: null,
      token: localStorage.getItem('token'),
    });

    const [updateObject, setFetchUpdateObjects] = useFetch({
      url: `/matiere/${object._id}`,
      method: 'PUT',
      body: form,
      token: localStorage.getItem('token'),
    });

    useEffect(() => {
      if (deleteObject.data.success) {
        updateList();
        Notification.success(
          `Success: Object "${deleteObject.data.object.name}" is deleted`
        );
      }
    }, [deleteObject.data]);

    useEffect(() => {
      if (updateObject.data.success) {
        Notification.success(
          `Success: Object "${updateObject.data.object.name}" is deleted`
        );
      }
    }, [updateObject.data]);

    useEffect(() => {
      if (updateObject.error) {
        Notification.error(updateObject.error.message);
        console.log(updateObject.error);
      }
    }, [updateObject.error]);

    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    };

    const handleClick = (event) => {
      if (event.target.name == 'delete') {
        deleteObject.fetchData();
      }

      if (event.target.name == 'save') {
        updateObject.fetchData();
        setIsEdit(false);
      }

      if (event.target.name == 'edit') {
        setIsEdit(true);
      }
    };

    return (
      <>
        <div className={styles.item}>
          {isAdmin ? (
            <>
              <div>
                <Input
                  name="name"
                  type="text"
                  placeholder={object.name}
                  onChange={handleChange}
                  value={form.name}
                  disabled={!isEdit}
                  required
                />
              </div>
              <div>
                <Button
                  name={!isEdit ? 'edit' : 'save'}
                  type="submit"
                  onClick={handleClick}
                >
                  {!isEdit ? (
                    updateObject.loading ? (
                      <Loading />
                    ) : (
                      'Edit'
                    )
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button name="delete" onClick={handleClick}>
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Input
                label={object.name}
                data-content={object.name}
                name="object"
                type="checkbox"
                onChange={(e) => onChange(e, object)}
              />
            </div>
          )}
        </div>
      </>
    );
  },

  User({ user, updateList }) {
    const [deleteUser, setFetchDeleteUser] = useFetch({
      url: `/user/admin/user/${user._id}`,
      method: 'DELETE',
      body: null,
      token: localStorage.getItem('token'),
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
                ? `${user.firstName[0].toUpperCase()}${user.firstName.slice(
                    1
                  )}`
                : ''}{' '}
              {user.lastName.length > 0
                ? `${user.lastName[0].toUpperCase()}${user.lastName.slice(
                    1
                  )}`
                : ''}
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
