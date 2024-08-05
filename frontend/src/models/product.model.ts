export interface Product {
  attributes: ProductAttributes;
  id: number;
}

export interface ProductAttributes {
  name: string;
  price: string;
  images: {
    data?: ImageData[];
  };
  description: string;
  type: string;
}

export interface ImageData {
  attributes: ImageFormat;
  id: number;
}

export interface ImageFormat {
  url: string;
  formats: {
    thumbnail: {
      url: string;
    };
  };
}
