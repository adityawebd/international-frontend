export interface Product {
    _id: Number;
    title: string;
    description: string;
    price: Number;
    images: Array<string>;
    property: Array<string>;
    quantity?: number
}