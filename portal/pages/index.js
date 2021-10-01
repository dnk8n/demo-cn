import { useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { Error } from "../components/Error";
import { Filter } from "../components/Filter";
import { FundList } from "../components/FundList";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { MoreLoader } from "../components/MoreLoader";
import { NoResult } from "../components/NoResult";
import { useFilterContext } from "../context/FilterContext";
import {
  buildAggregateSchema,
  buildFundingSchema,
} from "../queries/buildSchema";
import styles from "../styles/Home.module.scss";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Home() {
  const {
    id,
    sortOrder,
    setSortOrder,
    searchParam,
    category,
    country,
    usage,
    topic,
    position,
  } = useFilterContext();

  const [sortField, setSortField] = useState("deadline");
  const [showLoader, setShowLoader] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(
    buildFundingSchema(country, topic),
    {
      variables: {
        limit: 10,
        offset: 0,
        id: id || null,
        orderTypeName: sortField == "name" ? sortOrder : null,
        orderTypeDeadline: sortField == "deadline" ? sortOrder : null,
        searchParam: searchParam || null,
        category: category || null,
        country: country || null,
        usage: usage.length > 0 ? usage : null,
        topic: topic || null,
        position: position || null,
      },
    }
  );
  const fundings = data?.research_db_fundingprogram;

  const {
    loading: loadingTotal,
    error: errorTotal,
    data: dataTotal,
  } = useQuery(buildAggregateSchema(country, topic), {
    variables: {
      offset: 0,
      id: id || null,
      orderTypeName: sortField == "name" ? sortOrder : null,
      orderTypeDeadline: sortField == "deadline" ? sortOrder : null,
      searchParam: searchParam || null,
      category: category || null,
      country: country || null,
      usage: usage.length > 0 ? usage : null,
      topic: topic || null,
      position: position || null,
    },
  });

  const count = dataTotal?.research_db_fundingprogram_aggregate;

  const searchResultsRef = useRef();
  const executeScroll = () => scrollToRef(searchResultsRef);

  return (
    <>
      <Header />
      <Filter executeScroll={executeScroll} />
      <div className="container">
        <div className={styles.results} ref={searchResultsRef}>
          <div className="row mb-4">
            <div className="col-md-4 col-lg-4">
              <h4>{count?.aggregate.count} Results</h4>
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="d-flex justify-content-end">
                <div className="mt-2" style={{ fontWeight: "500" }}>
                  Sort by:
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <select
                    className="form-select"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>
                <div className={`d-flex ${styles.orderButton}`}>
                  <button
                    value="asc"
                    className={`btn ${sortOrder == "asc" && styles.active}`}
                    onClick={(e) => {
                      setSortOrder(e.target.value);
                    }}
                  >
                    Asc
                  </button>
                  <button
                    value="desc"
                    className={`btn ${sortOrder == "desc" && styles.active}`}
                    onClick={(e) => {
                      setSortOrder(e.target.value);
                    }}
                  >
                    Desc
                  </button>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : fundings?.length > 0 ? (
            fundings.map((funding) => (
              <FundList
                key={funding.id}
                id={funding.id}
                title={funding.title}
                description={funding.description}
                categories={funding.categories}
                deadline={funding.deadline}
                organisation={funding.funded_by}
                url={funding.url_links}
                usages={funding.usages}
              />
            ))
          ) : (
            <NoResult />
          )}
          <div className={`${styles.loadMore} text-center pt-5 pt-lg-13`}>
            <a
              className="text-uppercase"
              // href="#"
              onClick={() => {
                const lens = fundings?.length;
                setShowLoader(true);

                fetchMore({
                  variables: {
                    offset: lens,
                    orderType: sortOrder,
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.research_db_fundingprogram = [
                      ...prevResult.research_db_fundingprogram,
                      ...fetchMoreResult.research_db_fundingprogram,
                    ];
                    setShowLoader(false);
                    return fetchMoreResult;
                  },
                });
              }}
            >
              {fundings?.length >= 10 && "Load More"}
              {showLoader && <MoreLoader />}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
