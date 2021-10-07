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

  const [sortField, setSortField] = useState("year_published");
  const [showLoader, setShowLoader] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(
    buildFundingSchema(null, searchParam, category, country, usage),
    {
      variables: {
        limit: 10,
        offset: 0,
        id: id || null,
        orderTypeName: sortField == "title" ? sortOrder : null,
        orderTypeDeadline: sortField == "year_published" ? sortOrder : null,
        searchParam: searchParam || null,
        category: category || null,
        country: country || null,
        usage: usage.length > 0 ? usage : null,
        topic: topic || null,
        position: position || null,
      },
    }
  );
  const fundings = data?.demo_item;

  const {
    loading: loadingTotal,
    error: errorTotal,
    data: dataTotal,
  } = useQuery(buildAggregateSchema(searchParam, category, country, usage), {
    variables: {
      offset: 0,
      id: id || null,
      orderTypeName: sortField == "title" ? sortOrder : null,
      orderTypeDeadline: sortField == "year_published" ? sortOrder : null,
      searchParam: searchParam || null,
      category: category || null,
      country: country || null,
      usage: usage.length > 0 ? usage : null,
      topic: topic || null,
      position: position || null,
    },
  });

  const count = dataTotal?.demo_item_aggregate;

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
                    <option value="title">Title</option>
                    <option value="year_published">Year Published</option>
                  </select>
                </div>
                <div className={`d-flex ${styles.orderButton}`}>
                  <button
                    value="asc_nulls_last"
                    className={`btn ${
                      sortOrder == "asc_nulls_last" && styles.active
                    }`}
                    onClick={(e) => {
                      setSortOrder(e.target.value);
                    }}
                  >
                    Asc
                  </button>
                  <button
                    value="desc_nulls_last"
                    className={`btn ${
                      sortOrder == "desc_nulls_last" && styles.active
                    }`}
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
                categories={funding.complete}
                deadline={funding.year_published}
                organisation={funding.item_type}
                // url={funding.url_links}
                usages={funding.language}
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
                    fetchMoreResult.demo_item = [
                      ...prevResult.demo_item,
                      ...fetchMoreResult.demo_item,
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
