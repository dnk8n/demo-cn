import gql from "graphql-tag";

export const GET_ACADEMIC_POSITIONS = gql`
  query AcademicPositions {
    research_db_academicposition {
      id
      name
    }
  }
`;
