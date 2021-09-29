import gql from "graphql-tag";

export const GET_REGIONS = gql`
  query Regions {
    research_db_region {
      id
      name
    }
  }
`;
