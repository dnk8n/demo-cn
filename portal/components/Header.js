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
                      <h1>Mapping Research Funding in Africa </h1>
                      <h5>
                        Explore funding for African researchers as scientist,
                        Higher Education manager or science policy-maker{" "}
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
