import { concat, useQuery } from "@apollo/client";
import { useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import { GET_ACADEMIC_POSITIONS } from "../queries/getAcademicPositions";
import { GET_CATEGORIES } from "../queries/getCategories";
import { GET_COUNTRIES } from "../queries/getCountries";
import { GET_THEMATIC_FOCUS } from "../queries/getThematicFocus";
import { GET_USAGES } from "../queries/getUsages";
import styles from "../styles/Filter.module.scss";

export const Filter = ({ executeScroll }) => {
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
  // const { data: dataThematicFocus } = useQuery(GET_THEMATIC_FOCUS);
  // const { data: dataAcademicPositions } = useQuery(GET_ACADEMIC_POSITIONS);

  const categories = dataCategories?.demo_item;
  const countries = dataCountries?.demo_item;
  const usages = dataUsages?.demo_item;

  // const usagesArray = [
  //   ...new Set(
  //     [].concat.apply(
  //       [],
  //       usages?.map((x) => x.language)
  //     )
  //   ),
  // ];

  // const topics = dataThematicFocus?.research_db_thematicfocus;
  // const positions = dataAcademicPositions?.research_db_academicposition;

  const handleUsage = (event) => {
    const newUsageList = [...state.usage];
    const index = state.usage.indexOf(event.target.value);
    if (index != -1) {
      newUsageList.splice(index, 1);
    } else {
      newUsageList.push(event.target.value);
    }

    setState((prevState) => ({ ...prevState, usage: newUsageList }));
  };

  const handleResetFilter = () => {
    setSearchParam("");
    setCategory("");
    setCountry("");
    setUsage([]);
    setTopic("");
    setPosition("");
  };

  const [state, setState] = useState({
    search: searchParam,
    category: category,
    country: country,
    usage: usage,
    topic: topic,
    position: position,
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilterSearch = (event) => {
    event.preventDefault();
    executeScroll();

    setSearchParam(`${state.search && "%" + state.search + "%"}`);
    setCategory(state.category);
    setCountry(state.country);
    setUsage(state.usage);
    setTopic(state.topic);
    setPosition(state.position);
  };
  return (
    <div className="container">
      <div className={styles.filterArea}>
        <div className="card p-3">
          <div className="card-body">
            <h4 className="cart-title">Search Items</h4>
            <form onSubmit={(event) => handleFilterSearch(event)}>
              <div className="row mt-4">
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text to filter by..."
                    name="search"
                    value={state.search}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="col-md-9 col-lg-9">
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <label>Complete</label>
                      <select
                        className="form-select"
                        name="category"
                        value={state.category}
                        onChange={handleFieldChange}
                      >
                        <option value="">All</option>
                        {categories?.length > 0 &&
                          categories.map((category) => (
                            <option key={category.id} value={category.complete}>
                              {category.complete}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <label>Item Type</label>
                      <select
                        className="form-select"
                        name="country"
                        value={state.country}
                        onChange={handleFieldChange}
                      >
                        <option value="">All Types</option>
                        {countries?.length > 0 &&
                          countries.map((country) => (
                            <option key={country.id} value={country.item_type}>
                              {country.item_type}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* <div className="col-md-6 col-lg-6">
                      <label>Thematic Focus</label>
                      <select
                        className="form-select"
                        name="topic"
                        value={state.topic}
                        onChange={handleFieldChange}
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
                        name="position"
                        value={state.position}
                        onChange={handleFieldChange}
                      >
                        <option value="">All Positions</option>
                        {positions?.length > 0 &&
                          positions.map((position) => (
                            <option key={position.id} value={position.name}>
                              {position.name}
                            </option>
                          ))}
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <label>Language</label>
                  <div className={styles.checkbox}>
                    {usages?.length > 0 &&
                      usages.map((usage) => (
                        <div className="form-check mb-2" key={usage.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={usage.language}
                            onClick={handleUsage}
                          />
                          <label className="form-check-label">
                            {usage.language}
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
