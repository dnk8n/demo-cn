import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query Categories {
    research_db_category {
      id
      name
    }
  }
`;
