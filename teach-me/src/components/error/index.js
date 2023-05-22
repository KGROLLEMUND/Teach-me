import Layout from "@/components/layout";
import Link from "next/link";
import styles from "./index.module.scss";
import Button from "../UI/button";

const getMessage = (code) => {
  switch (code) {
    case "404":
      return (
        <Layout title="404: Page Not Found">
          <div className={styles.body}>
            <span className={styles.head}>
              <b>ERROR</b>
            </span>
            <span className={styles.content}>
              <b>404:</b> Page Not Found
            </span>
            <div className={styles.link}>
              <Link href="/">
                <Button>
                  <span>Let&apos;s go to</span> <span>main page</span>
                </Button>
              </Link>
            </div>
          </div>
        </Layout>
      );

    default:
      break;
  }
};

const Error = ({ code }) => {
  return getMessage(code);
};

export default Error;
