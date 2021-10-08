import styles from "../styles/Footer.module.scss";
export const Footer = () => {
  return (
    <footer className={`${styles.footer} mt-4 py-5`}>
      <div className="container">
        <div className="footer-row row">
          <div className="copyright text-center text-xl-left">
            © 2021{" "}
            <a className="font-weight-bold ml-1" href="/" target="_blank">
              APCRepo.{" "}
            </a>
            All rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
