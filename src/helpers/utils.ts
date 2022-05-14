export interface Value {
  phones: string;
  tablets: string;
  watches: string;
  favorites: string;
}

export interface Item {
  name: string;
  price: number;
  image: string;
  id: number;
  count?: number;
};

export interface Price {
  count: number;
  price: number;
}

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

