import gql from "graphql-tag";

// export const GET_USAGES = gql`
//   query Usages {
//     research_db_usage {
//       id
//       name
//     }
//   }
// `;

export const GET_USAGES = gql`
  query Language {
    demo_item(distinct_on: language) {
      id
      language
    }
  }
`;
