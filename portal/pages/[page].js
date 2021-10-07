import Link from "next/link";
import client from "../apolloClient";
import { buildFundingSchema } from "../queries/buildSchema";
import styles from "../styles/Details.module.scss";

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: buildFundingSchema(),
    variables: {
      limit: null,
    },
  });

  const fundings = data?.demo_item;
  const paths = fundings.map((funding) => {
    return {
      params: { page: funding.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.page;
  const { data } = await client.query({
    query: buildFundingSchema(id),
    variables: { id },
  });

  return {
    props: {
      funding: data?.demo_item,
    },
  };
};

export default function Details({ funding }) {
  const title = funding[0].title;
  const description = funding[0].description;
  const complete = funding[0].complete;
  const item_type = funding[0].item_type;
  const language = funding[0].language;
  const year_published = funding[0].year_published;

  return (
    <div className="container">
      <div className={styles.details}>
        <div
          className={`col-xl-10 col-lg-11 mt-4 ml-xxl-32 ml-xl-15 ${styles.btnBack}`}
        >
          <div className="mb-4">
            <Link href="/">
              <a className="d-flex align-items-center ml-4">
                {" "}
                <span className={styles.circle40}> {"<"} </span>
                <span className="text-uppercase">Back to Item List</span>
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.detailCard}>
          <div className="card p-3">
            <div className="card-body">
              <div className={`border-bottom ${styles.sectionOne}`}>
                <div className="row">
                  <div className="col-md-7">
                    <div className="media align-items-center">
                      <div>
                        <h3 className="mb-0">{title}</h3>
                        <div className="d-flex">
                          <span className={styles.fundedBy}>Type: </span>
                          <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                            {
                              <li>
                                <a className="mr-3 px-3 py-1 mt-2">
                                  {item_type}
                                </a>
                              </li>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 text-right">
                    <div className={styles.deadline}>
                      Year Published:<span> {year_published}</span>
                    </div>
                  </div>
                </div>

                <div className="row pt-4">
                  <div className="col-12">
                    <div className="card-btn-group">
                      <a
                        className={`btn ${styles.btnVisit} text-uppercase rounded-3 mr-4 mb-5`}
                      >
                        Call to Action
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border-bottom pb-4 ${styles.sectionTwo}`}>
                <div className="row pt-4">
                  <div className="col-md-6">
                    <div className="mb-3">Language</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {
                        <li>
                          <a className="mr-3 px-3 py-1 mt-2" href="#">
                            {language}
                          </a>
                        </li>
                      }
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">Complete</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {
                        <li>
                          <a className="mr-3 px-3 py-1 mt-2" href="#">
                            {complete}
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.sectionThree}>
                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className={`${styles.description} mb-4`}>
                      <p className="mb-4">Description</p>
                      <p>{description}</p>
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
}
