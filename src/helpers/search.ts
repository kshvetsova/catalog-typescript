import { Option } from "./utils";

export const initialValue = {
  phones: '',
  tablets: '',
  watches: '',
  favorites: '',
}

export const setValueInput = (pathname: string, value: Option ) => {
  switch(pathname) {
    case 'phones':
      return value.phones;
    case 'tablets':
      return value.tablets;
    case 'watches':
      return value.watches;
    case 'favorites':
      return value.favorites;
    default:
      break;
  }
}