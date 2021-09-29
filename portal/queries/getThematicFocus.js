import gql from "graphql-tag";

export const GET_THEMATIC_FOCUS = gql`
  query ThematicFocus {
    research_db_thematicfocus {
      id
      name
    }
  }
`;
