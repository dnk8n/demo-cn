import styles from "../styles/Header.module.scss";

export const Header = () => {
  return (
    <div className="row row-fluid">
      <div className="col">
        <div className={styles.wrapper}>
          <div className={styles.banner}>
            <div className={styles.bgimg}>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className={styles.content}>
                      <h1>All Funds Starts With a Search </h1>
                      <h5>
                        Explore all the fundings & find just what you need with
                        extreme ease{" "}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
