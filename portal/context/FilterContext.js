import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [id, setId] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchParam, setSearchParam] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [usage, setUsage] = useState([]);
  const [topic, setTopic] = useState("");
  const [position, setPosition] = useState("");

  return (
    <FilterContext.Provider
      value={{
        id,
        setId,
        sortOrder,
        setSortOrder,
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
