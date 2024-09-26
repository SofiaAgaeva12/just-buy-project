import type Product from "@/assets/helpers/interfaces/Product";

export default interface Order {
    id: number;
    products: number[] | Product[];
    order_price: number;
}