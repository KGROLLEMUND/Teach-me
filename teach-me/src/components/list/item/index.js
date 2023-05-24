import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import useFetch from '@/util/useFetch';
import Button from '@/components/UI/Button';
import Notification from '@/components/UI/notification';
import Input from '@/components/UI/Input';
import Loading from '@/components/UI/loading';

const Item = {
  Proposition({ propos }) {
    return (
      <>
        <div className={styles.item}>
          <div>
            <span>{propos.cours.title}</span>
          </div>
          <div>
            <span>{propos.datetime.replace('T', ' ')}</span>
          </div>
          <div>
            <span>{propos.status}</span>
          </div>
        </div>
      </>
    );
  },

  LessonProposition({ propos }) {
    const [fetchPropos, setFetchPropos] = useFetch({
      url: `/proposition/update/${propos._id}`,
      method: 'PUT',
      token: localStorage.getItem('token'),
    });

    const [status, setStatus] = useState(propos.status);

    useEffect(() => {
      if (fetchPropos.fetchProps.body) {
        fetchPropos.fetchData();
      }
    }, [fetchPropos.fetchProps.body]);

    useEffect(() => {
      if (fetchPropos.data.success) {
        Notification.success(`Success: ${fetchPropos.data.message}`);
      }
    }, [fetchPropos.data]);
    useEffect(() => {
      console.log(fetchPropos.error);
    }, [fetchPropos.error]);

    const handleClick = (event) => {
      if (event.target.name == 'accept') {
        setFetchPropos((props) => ({
          ...props,
          body: { status: 'ACCEPTED' },
        }));
        setStatus('ACCEPTED');
      }
      if (event.target.name == 'declice') {
        setFetchPropos((props) => ({
          ...props,
          body: { status: 'REFUSED' },
        }));
        setStatus('REFUSED');
      }
    };

    return (
      <>
        <div className={styles.item}>
          <div>Student</div>
          <div>
            <span>{propos.student?.firstName.toUpperCase()}</span>
            <span>{propos.student?.lastName.toUpperCase()}</span>
            <span>{propos.datetime.replace('T', ' ')}</span>
          </div>
          <div>
            {status == 'PENDING' ? (
              <>
                <Button name="accept" onClick={handleClick}>
                  Accept
                </Button>
                <Button name="decline" onClick={handleClick}>
                  Decline
                </Button>
              </>
            ) : (
              <span>{status}</span>
            )}
          </div>
        </div>
      </>
    );
  },

  Lesson({ lesson, updateList, user }) {
    const [deleteLesson, setFetchDeleteLesson] = useFetch({
      url: `/cours/${lesson._id}`,
      method: 'DELETE',
      body: null,
      token: localStorage.getItem('token'),
    });

    const [form, setForm] = useState();
    const route = useRouter();

    const [joinLesson, setFetchJoinLesson] = useFetch({
      url: `/proposition/create/${lesson._id}`,
      method: 'POST',
      body: form,
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

    useEffect(() => {
      console.log(joinLesson.data);
      if (joinLesson.data.success) {
        Notification.success(
          `Success: Join to "${joinLesson.data}" `
        );
      }
    }, [joinLesson.data]);

    useEffect(() => {
      console.log(joinLesson.error);
    }, [joinLesson.error]);

    const handleClick = (event) => {
      if (event.target.name == 'delete') {
        deleteLesson.fetchData();
      }

      if (event.target.name == 'details') {
        route.push(`/lessons/details/${lesson._id}`);
      }

      if (event.target.name == 'join' && form) {
        joinLesson.fetchData();
      }
    };

    const handleChange = (event) => {
      setForm(() => ({
        datetime: event.target.value,
      }));
    };

    return (
      <>
        <div className={styles.item}>
          <div>
            <span>{lesson.title}</span>
          </div>
          {user.userType == 'PROF' && (
            <div>
              <Button name="details" onClick={handleClick}>
                Details
              </Button>
              <Button name="delete" onClick={handleClick}>
                Delete
              </Button>
            </div>
          )}
          {user.userType == 'STUDENT' && (
            <div>
              <Input
                name="datetime"
                type="datetime-local"
                onChange={handleChange}
                required
              />
              <Button name="join" type="submit" onClick={handleClick}>
                Join
              </Button>
            </div>
          )}
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
