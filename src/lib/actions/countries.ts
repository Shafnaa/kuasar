import { gql, useQuery } from "@apollo/client";

import { hardRegEx } from "@/lib/utils";

const GET_COUNTRIES = gql`
  query getCountries($name: String!) {
    countries(filter: { name: { regex: $name } }) {
      code
      name
      emoji
      capital
      currencies
    }
  }
`;

const GET_COUNTRY = gql`
  query getCountry($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      continent {
        code
        name
      }
      languages {
        code
        name
        rtl
      }
      native
      currencies
    }
  }
`;

function useCountries({ name }: { name: string }) {
  return useQuery(GET_COUNTRIES, {
    variables: { name: hardRegEx(name) },
  });
}

function useCountry({ code }: { code: string }) {
  return useQuery(GET_COUNTRY, {
    variables: { code },
  });
}

export { useCountries, useCountry };
