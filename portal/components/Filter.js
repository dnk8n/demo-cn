import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import { GET_ACADEMIC_POSITIONS } from "../queries/getAcademicPositions";
import { GET_CATEGORIES } from "../queries/getCategories";
import { GET_COUNTRIES } from "../queries/getCountries";
import { GET_THEMATIC_FOCUS } from "../queries/getThematicFocus";
import { GET_USAGES } from "../queries/getUsages";
import styles from "../styles/Filter.module.scss";

export const Filter = ({ executeScroll, refetch }) => {
  const {
    searchParam,
    setSearchParam,
    category,
    setCategory,
    country,
    setCountry,
    usage,
    setUsage,
    topic,
    setTopic,
    position,
    setPosition,
  } = useFilterContext();

  const { data: dataCategories } = useQuery(GET_CATEGORIES);
  const { data: dataCountries } = useQuery(GET_COUNTRIES);
  const { data: dataUsages } = useQuery(GET_USAGES);
  const { data: dataThematicFocus } = useQuery(GET_THEMATIC_FOCUS);
  const { data: dataAcademicPositions } = useQuery(GET_ACADEMIC_POSITIONS);

  const categories = dataCategories?.research_db_category;
  const countries = dataCountries?.research_db_country;
  const usages = dataUsages?.research_db_usage;
  const topics = dataThematicFocus?.research_db_thematicfocus;
  const positions = dataAcademicPositions?.research_db_academicposition;

  const handleFilterByUsage = (event) => {
    const newUsageList = [...usage];
    const index = usage.indexOf(event.target.value);
    if (index != -1) {
      newUsageList.splice(index, 1);
    } else {
      newUsageList.push(event.target.value);
    }

    setUsage(newUsageList);
  };

  const [search, setSearch] = useState("");

  const handleResetFilter = () => {
    setSearchParam("");
    setCategory("");
    setCountry("");
    setUsage([]);
    setTopic("");
    setPosition("");
  };

  const handleFilterSearch = (event) => {
    event.preventDefault();
    executeScroll();
    setSearchParam(`%${search}%`);
    refetch({ searchParam: searchParam });
  };
  return (
    <div className="container">
      <div className={styles.filterArea}>
        <div className="card p-3">
          <div className="card-body">
            <h4 className="cart-title">Search Fundings</h4>
            <form onSubmit={(event) => handleFilterSearch(event)}>
              <div className="row mt-4">
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text to filter by..."
                    // value={searchParam}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-9 col-lg-9">
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <label>Categories</label>
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="">All Categories</option>
                        {categories?.length > 0 &&
                          categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <label>Country</label>
                      <select
                        className="form-select"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      >
                        <option value="">All Countries</option>
                        {countries?.length > 0 &&
                          countries.map((country) => (
                            <option key={country.id} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-md-6 col-lg-6">
                      <label>Thematic Focus</label>
                      <select
                        className="form-select"
                        value={topic}
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      >
                        <option value="">All Topic</option>
                        {topics?.length > 0 &&
                          topics.map((topic) => (
                            <option key={topic.id} value={topic.name}>
                              {topic.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <label>Academic Positions</label>
                      <select
                        className="form-select"
                        value={position}
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                      >
                        <option value="">All Positions</option>
                        {positions?.length > 0 &&
                          positions.map((position) => (
                            <option key={position.id} value={position.name}>
                              {position.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <label>Usage</label>
                  <div className={styles.checkbox}>
                    {usages?.length > 0 &&
                      usages.map((usage) => (
                        <div className="form-check mb-2" key={usage.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={usage.name}
                            onClick={handleFilterByUsage}
                          />
                          <label className="form-check-label">
                            {usage.name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12">
                  {/* <button className={`btn ${styles.moreButton}`}>
                    More filters
                  </button> */}
                  <button
                    type="reset"
                    className={`btn ${styles.resetButton}`}
                    onClick={handleResetFilter}
                  >
                    Clear all
                  </button>
                </div>
                <div className="col-lg-12">
                  <button
                    type="submit"
                    className={`btn ${styles.filterButton}`}
                  >
                    Filter Results
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
