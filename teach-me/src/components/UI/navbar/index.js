import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

import UserContext from "@/components/context";
import { useRouter } from "next/router";
import Loading from "../loading";
import Button from "../button";

const NavBar = () => {
  const router = useRouter();

  const { user, logout, loading } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [modeView, setModeView] = useState("Admin");

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    const handleWindowClick = () => {
      setShowMenu(false);
    };

    window.addEventListener("click", handleWindowClick);
  }, []);

  const handleClick = (event) => {
    switch (event.target.id) {
      case "0":
        const modes = ["Admin", "Freelance", "Company"];

        if (modeView == "Company") {
          setModeView(modes[0]);
        } else {
          setModeView(modes[modes.indexOf(modeView) + 1]);
        }

        break;
      case "1":
        router.push("/profile", null, { shallow: true });
        break;
      case "2":
        logout();
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <Link href="/">
          <span>
            <b>Projet Dev Front</b>
          </span>
        </Link>
      </div>
      <div className={styles.links}>
        {user.isAdmin ? (
          <>
            <Link href="/users">
              <span>Missions</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/missions">
              <span>Missions</span>
            </Link>
            <Link href="/freelances">
              <span>Freelances</span>
            </Link>
          </>
        )}
      </div>
      <div
        id="menu"
        className={styles.menu}
        onClick={() => {
          if (isLoading) return;

          setTimeout(() => {
            setShowMenu(!showMenu);
          });
        }}
      >
        {Object.keys(user).length == 0 || loading ? (
          <Loading />
        ) : (
          `Welcome, ${user.firstName[0].toUpperCase()}${user.firstName.slice(
            1
          )} ${user.lastName[0].toUpperCase()}${user.lastName.slice(1)}`
        )}

        {showMenu && (
          <div className={styles.submenu}>
            <div id="1" onClick={handleClick}>
              Profile
            </div>
            {user.isAdmin && (
              <div id="0" onClick={handleClick}>
                Mode view: {modeView}
              </div>
            )}
            <div id="2" onClick={handleClick}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
