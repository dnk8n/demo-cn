import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/404.module.scss";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      router.push("/");
    }, 5000);
  }, []);

  return (
    <div className="container">
      <div className={styles.NotFound}>
        <div className="row justify-content-center">
          <div className="col-lg-7 px-lg-5">
            <div className="text-center">
              <div className={styles.texts404}>
                <div className={styles.tag}>
                  4<span>0</span>4
                </div>
                <h3 className={styles.title}>Page is not found!</h3>

                <p className={`${styles.text}`}>
                  All Funds Starts With a Search. Explore all the fundings &
                  find just what you need with extreme ease.
                </p>

                <Link href="/">
                  <a className="btn text-white rounded-5 m-auto text-uppercase">
                    Back to home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
