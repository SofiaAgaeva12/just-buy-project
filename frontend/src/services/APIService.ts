import fetcher from "@/services/fetcher";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";
import type SignUpInterface from "@/assets/helpers/interfaces/SignUpInterface";
import axios from "axios";
import {ref} from "vue";


export const Auth = {
    login(model: LoginInterface) {
        return fetcher.post("login", model).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    signup(model: SignUpInterface) {
        return fetcher.post("signup", model).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    logout() {
        return fetcher.get("logout").then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

}

export const ProductRequest = {
    async get() {
        const res = await fetcher.get("products")
        if (res.data.error) return res.data.error
        return res
    },
}

export const CartRequest = {
    add(product_id: number) {
        return fetcher.post(`cart/${product_id}`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

    remove(product_id: number) {
        return fetcher.delete(`cart/${product_id}`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

    get() {
        return fetcher.get(`cart`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
}

export const OrderRequest = {
    create() {
        return fetcher.post(`order`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    get() {
        return fetcher.get(`order`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
}

export const ImageRequest = {
    get(inputQuery: string) {
        const query = `https://api.unsplash.com/search/collections?client_id=tlzRN1hxSp_9wH-R5d6Ps6CFJWCo8EbXyuL0Xu1fSqg&Accept-Version=v1&query=${inputQuery}&per_page=35 `;
        return axios
            .get(query)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async getImage(inputQuery: string) {
        const images = ref();
        const res = await ImageRequest.get(inputQuery);
        images.value = res.map((image: { preview_photos: any; }) => image.preview_photos.map((preview_photos: {
            urls: { small: any; };
        }) => preview_photos.urls.small)).flat();
        return images.value
    }
}





