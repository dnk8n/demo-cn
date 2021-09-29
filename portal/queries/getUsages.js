import gql from "graphql-tag";

export const GET_USAGES = gql`
  query Usages {
    research_db_usage {
      id
      name
    }
  }
`;
