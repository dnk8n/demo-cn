import Link from "next/link";
import styles from "../styles/FundList.module.scss";

export const FundList = ({
  id,
  title,
  description,
  categories,
  deadline,
  organisation,
  usages,
}) => {
  const fundPage = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-");

  return (
    <div className={styles.fundingList}>
      <div className="card p-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-7">
              <div className="media align-items-center">
                {/* <div className="square-72 d-block mr-8">
                  <img src="./image/l2/png/featured-job-logo-1.png" alt="" />
                </div> */}
                <div>
                  <h3 className="mb-0">
                    <a href={encodeURIComponent(id)}>{title}</a>
                  </h3>
                  <div className={`d-flex ${styles.fundedBy}`}>
                    <span>Funded by: </span>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {organisation.length > 0 &&
                        organisation.map((org) => (
                          <li key={org.funding_org.grid_institute.id}>
                            <a
                              className="mr-3 px-3 py-1 mt-2"
                              href={
                                org.funding_org.grid_institute.status ==
                                "active"
                                  ? `https://grid.ac/institutes/${org.funding_org.grid_institute.grid_id}`
                                  : org.funding_org.grid_institute.links[0]
                                      ?.link.name
                              }
                              target="blank_"
                            >
                              {organisation.length > 1
                                ? org.funding_org.grid_institute.acronyms[0]
                                    ?.acronym.name
                                : org.funding_org.grid_institute.name}
                              {/* {organisation.length > 1 && ", "} */}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 text-right">
              <div className={styles.deadline}>
                {/* <div className="image mr-5 mt-2">
                  <img src="./image/svg/icon-fire-rounded.svg" alt="" />
                </div>
                <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                  <span className="text-black-2">80-90K</span> PLN
                </p> */}
                Deadline:<span> {new Date(deadline).toDateString()}</span>
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-md-12">
              <p className={styles.truncate}>{description}</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-7">
              <div
                className="mb-2"
                style={{ fontWeight: "500", fontSize: "14px" }}
              >
                Categories:
              </div>
              <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                {categories.length > 0 &&
                  categories.map((category) => (
                    <li key={category.category.id}>
                      <a className="mr-3 px-3 py-1 mt-2" href="#">
                        {category.category.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="col-md-5">
              <div
                className="mb-2"
                style={{ fontWeight: "500", fontSize: "14px" }}
              >
                Usages:
              </div>
              <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                {usages.length > 0 &&
                  usages.map((usage) => (
                    <li key={usage.usage.id}>
                      <a className="mr-3 px-3 py-1 mt-2" href="#">
                        {usage.usage.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* <div className="col-md-5">
              <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                  <span className="mr-4" style={{ marginTop: "-2px" }}>
                    <img src="./image/svg/icon-loaction-pin-black.svg" alt="" />
                  </span>
                  <span className="font-weight-semibold">Berlyn, UK</span>
                </li>
                <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                  <span className="mr-4" style={{ marginTop: "-2px" }}>
                    <img src="./image/svg/icon-suitecase.svg" alt="" />
                  </span>
                  <span className="font-weight-semibold">Full-time</span>
                </li>
                <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                  <span className="mr-4" style={{ marginTop: "-2px" }}>
                    <img src="./image/svg/icon-clock.svg" alt="" />
                  </span>
                  <span className="font-weight-semibold">9d ago</span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
