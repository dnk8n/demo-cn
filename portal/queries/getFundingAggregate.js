import gql from "graphql-tag";

export const GET_FUNDING_AGGREGATE = gql`
  query FundingAggregate(
    $offset: Int
    $id: Int
    $orderTypeName: order_by
    $orderTypeDeadline: order_by
    $searchParam: String
    $category: String
    $country: String
    $usage: [String!]
    $topic: String
    $position: String
  ) {
    research_db_fundingprogram_aggregate(
      offset: $offset
      order_by: { title: $orderTypeName, deadline: $orderTypeDeadline }
      where: {
        _or: [
          { title: { _ilike: $searchParam } }
          { description: { _ilike: $searchParam } }
          { eligibility: { _ilike: $searchParam } }
        ]
        categories: { category: { name: { _eq: $category } } }
        countries: { country: { name: { _eq: $country } } }
        academic_positions: { academic_position: { name: { _eq: $position } } }
        thematic_focuses: { thematic_focus: { name: { _eq: $topic } } }
        usages: { usage: { name: { _in: $usage } } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
