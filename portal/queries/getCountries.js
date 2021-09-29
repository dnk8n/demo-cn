import gql from "graphql-tag";

export const GET_COUNTRIES = gql`
  query Countries {
    research_db_country {
      id
      name
    }
  }
`;
