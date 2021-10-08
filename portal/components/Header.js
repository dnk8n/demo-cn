import styles from "../styles/Header.module.scss";

export const Header = () => {
  return (
    <>
      <div className="row row-fluid">
        <div className="col">
          <div className={styles.wrapper}>
            <div className={styles.banner}>
              <div className={styles.bgimg}>
                <div className={styles.overlay}></div>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className={styles.content}>
                        <h1> Community Networks Training Repository </h1>
                        {/* <h5>
                          Explore funding for African researchers as scientist,
                          Higher Education manager or science policy-maker{" "}
                        </h5> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
