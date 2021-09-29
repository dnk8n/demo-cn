import gql from "graphql-tag";

export const GET_ALL_FUNDINGS = gql`
  query AllFundings(
    $limit: Int
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
    research_db_fundingprogram(
      limit: $limit
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
        id: { _eq: $id }
      }
    ) {
      id
      title
      description
      eligibility
      deadline
      url_links
      partner_necessary
      funded_by {
        funding_org {
          grid_institute {
            id
            name
            grid_id
            status
            links {
              link {
                id
                name
              }
            }
            acronyms(limit: 1) {
              acronym {
                id
                name
              }
            }
          }
        }
      }
      academic_positions {
        academic_position {
          id
          name
        }
      }
      countries {
        country {
          id
          name
        }
      }
      categories(limit: 3) {
        category {
          id
          name
        }
      }
      usages {
        usage {
          id
          name
        }
      }
      thematic_focuses {
        thematic_focus {
          id
          name
        }
      }
      implemented_by {
        funding_org {
          grid_institute {
            id
            name
            grid_id
            status
            links {
              link {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
