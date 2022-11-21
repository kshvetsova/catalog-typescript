export interface Option {
  phones: string;
  tablets: string;
  watches: string;
  favorites: string;
}

export interface Product {
  name: string;
  price: number;
  image: string;
  id: number;
  count: number;
};

export interface ProductCart {
  images: string[];
  name: string;
  price: number[];
  tech: Array<string[]>;
  id: number;
  type: string;
  option: string;
  model: string;
  color?: string;
}
