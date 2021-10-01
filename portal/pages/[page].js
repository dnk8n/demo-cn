import Link from "next/link";
import client from "../apolloClient";
import { buildFundingSchema } from "../queries/buildSchema";
import styles from "../styles/Details.module.scss";

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: buildFundingSchema(null, null),
    variables: {
      limit: null,
    },
  });

  const fundings = data?.research_db_fundingprogram;
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
    query: buildFundingSchema(null, null),
    variables: { id },
  });

  return {
    props: {
      funding: data?.research_db_fundingprogram,
    },
  };
};

export default function Details({ funding }) {
  const title = funding[0].title;
  const description = funding[0].description;
  const categories = funding[0].categories;
  const countries = funding[0].countries;
  const deadline = funding[0].deadline;
  const organisation = funding[0].funded_by;
  const implemented = funding[0].implemented_by;
  const urls = funding[0].url_links;
  const usages = funding[0].usages;
  const eligibility = funding[0].eligibility;
  const positions = funding[0].academic_positions;
  const focuses = funding[0].thematic_focuses;
  const isPartnerRequired = funding[0].partner_necessary;

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
                <span className="text-uppercase">Back to Fund List</span>
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
                          <span className={styles.fundedBy}>Funded by: </span>
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
                                        : org.funding_org.grid_institute
                                            .links[0]?.link.name
                                    }
                                    target="blank_"
                                    // style={{
                                    //   display:
                                    //     (organisation.length > 1) &
                                    //       !org.funding_org.grid_institute
                                    //         .acronyms[0]?.acronym.name &&
                                    //     "none",
                                    // }}
                                  >
                                    {organisation.length > 1
                                      ? org.funding_org.grid_institute
                                          .acronyms[0]?.acronym.name
                                        ? org.funding_org.grid_institute
                                            .acronyms[0]?.acronym.name
                                        : org.funding_org.grid_institute.name
                                      : org.funding_org.grid_institute.name}
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
                      Deadline:<span> {new Date(deadline).toDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="row pt-4">
                  <div className="col-12">
                    <div className="card-btn-group">
                      <a
                        className={`btn ${styles.btnVisit} text-uppercase rounded-3 mr-4 mb-5`}
                        href={urls[0]}
                        target="blank_"
                      >
                        Apply for this fund
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border-bottom pb-4 ${styles.sectionTwo}`}>
                <div className="row pt-4">
                  <div className="col-md-6">
                    <div className="mb-3">Categories</div>
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

                  <div className="col-md-6">
                    <div className="mb-3">Usages</div>
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
                </div>

                <div className="row pt-2">
                  <div className="col-md-6">
                    <div className="mb-3">Academic Position</div>
                    {/* <ul className="list-unstyled mr-n3 mb-0">
                      {positions.length > 0 &&
                        positions.map((position) => (
                          <li
                            className="mt-2"
                            key={position.academic_position.id}
                          >
                            <span
                              className="d-inline-block mr-2"
                              style={{ marginRight: "0.375rem" }}
                            >
                              •
                            </span>
                            {position.academic_position.name}
                          </li>
                        ))}
                    </ul> */}
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {positions.length > 0 &&
                        positions.map((position) => (
                          <li key={position.academic_position.id}>
                            <a className="mr-3 px-3 py-1 mt-2" href="#">
                              {position.academic_position.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">Thematic Focus</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {focuses.length > 0 &&
                        focuses.map((focus) => (
                          <li key={focus.thematic_focus.id}>
                            <a className="mr-3 px-3 py-1 mt-2" href="#">
                              {focus.thematic_focus.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className={`row pt-4 ${styles.implementedBy}`}>
                  <div className="col-md-6">
                    <div className="mb-3">Implemented by</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {implemented.length > 0 &&
                        implemented.map((org) => (
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
                              {org.funding_org.grid_institute.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">Url links</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {urls.length > 0 &&
                        urls.map((url, id) => (
                          <li key={id}>
                            <a
                              className="mr-3 px-3 py-1 mt-2"
                              href={url}
                              target="blank_"
                            >
                              {url}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className="mb-3">Countries</div>
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {countries.length > 0 &&
                        countries.map((country) => (
                          <li key={country.country.id}>
                            <a className="mr-3 px-3 py-1 mt-2" href="#">
                              {country.country.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      Partner Required{" "}
                      <span className="badge bg-primary px-3 py-2">
                        {isPartnerRequired ? "Yes" : "No"}
                      </span>
                    </div>
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
                    <div className={`${styles.eligibility} mb-5`}>
                      <p className="mb-4">Eligibility</p>
                      <p>{eligibility}</p>
                    </div>
                    <a
                      className={`btn ${styles.btnVisit} text-uppercase rounded-3 mr-4 mb-3`}
                      href={urls[0]}
                      target="blank_"
                    >
                      Apply for this fund
                    </a>
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
