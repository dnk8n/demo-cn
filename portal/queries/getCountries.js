import gql from "graphql-tag";

// export const GET_COUNTRIES = gql`
//   query Countries {
//     research_db_country {
//       id
//       name
//     }
//   }
// `;

export const GET_COUNTRIES = gql`
  query ItemType {
    demo_item(distinct_on: item_type) {
      id
      item_type
    }
  }
`;
