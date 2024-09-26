import type Product from "@/assets/helpers/interfaces/Product";

export type CartProduct = Product & {
    products?: Product[]
    count?: number;
    product_id?: number
};