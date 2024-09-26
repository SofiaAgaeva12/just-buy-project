<template>
  <SkeletonOrder
    v-if="isLoading"
    :number-of-skeleton="8"
  />

  <Accordion
    v-if="!isLoading"
    class="w-full"
    :multiple="true"
  >
    <AccordionTab
      v-for="order in ordersWithProducts"
      :key="order.id"
    >
      <template #header>
        <div class="flex justify-content-between w-11">
          <div class="flex gap-3">
            <i class="pi pi-shopping-bag" />
            <span>ID Заказа  {{ order.id }}</span>
          </div>

          <div class="flex gap-3 flex-column">
            <h3>Итого: <span class="order-price">{{ order.order_price }}</span></h3>
            <p>Количество товаров: {{ order.products.map(prod => reducer += prod.count, reducer = 0).reverse()[0] }}</p>
          </div>
        </div>
      </template>
      <div class="card">
        <OrderList
          v-model="order.products"
          list-style="height:auto"
          data-key="id"
          :controls="false"
          :paginator="true"
          :rows="9"
        >
          <template #item="slotProps">
            <div class="product-item">
              <div class="image-container">
                <img
                  :src="images[Math.floor(images.length*slotProps.item.id/110)]"
                  :alt="slotProps.item.name"
                >
              </div>
              <div class="product-list-detail">
                <h4 class="mb-2">
                  {{ slotProps.item.name }}
                </h4>
                <i class="pi pi-tag product-category-icon" />
              </div>
              <div class="product-list-detail">
                <h4 class="mb-2">
                  Количество: {{ slotProps.item.count }}
                </h4>
              </div>
              <div class="product-list-action">
                <h4 class="mb-2">
                  ${{ slotProps.item.price * slotProps.item.count }}
                </h4>
              </div>
            </div>
          </template>
        </OrderList>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import type Product from "@/assets/helpers/interfaces/Product";
import type Order from "@/assets/helpers/interfaces/Order";
import {ImageRequest, OrderRequest, ProductRequest} from "@/services/APIService";
import type {CartProduct} from "@/assets/helpers/interfaces/CartProduct";
import SkeletonOrder from "@/components/order/SkeletonOrder.vue"

let isLoading = ref(true);
const orders: Ref<Order[]> = ref([]);
const products: Ref<Product[]> = ref([]);
const ordersWithProducts: Ref<Order[]> = ref([]);

const getProducts = (order: Order) => {
  let orderProducts: (Product)[] = [];
  order.products.forEach((ord) => {
    let productInOrder = products.value.find((prod) => prod.id === ord);
    if (productInOrder) orderProducts.push(productInOrder);
  })

  return orderProducts;
};

const filterProducts = (data: Product[]) => {
  let filteredArray: any[] = [];
  let cartData: CartProduct[] = data;
  cartData.forEach((prod) => {
    let filteredProduct = filteredArray.findIndex(fp => prod.id === fp.id);
    if (filteredProduct != -1) {
      filteredArray[filteredProduct].count++;
    } else {
      filteredArray.push({...prod, count: 1});
    }
  })
  return filteredArray;
}

const getData = async () => {
  orders.value = (await OrderRequest.get()).data?.data;
  products.value = (await ProductRequest.get()).data?.data;
  isLoading.value = false;

  orders.value.forEach((order) => {
    ordersWithProducts.value.push({...order, products: filterProducts(getProducts(order))})
  });
}
onMounted(() => getData());

const images = ref([]);
const getImage = async () => {
  images.value = await ImageRequest.getImage('sofa');
}
getImage();

</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.product-item {
  display: flex;
  align-items: center;
  padding: .5rem;
  width: 100%;

  img {
    width: 75px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 1rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .product-category-icon {
    vertical-align: middle;
    margin-right: .5rem;
    font-size: .875rem;
  }

  .product-category {
    vertical-align: middle;
    line-height: 1;
    font-size: .875rem;
  }
}

@media screen and (max-width: 576px) {

  .product-list-detail {
    flex: auto !important;
    width: 100%;
    margin-bottom: 1rem;
  }
  .product-item {
    flex-wrap: wrap;
    border-bottom: 1px white solid;

    .image-container {
      width: 100%;
      text-align: center;
    }

    img {
      margin: 0 0 1rem 0;
      width: 100px;
    }
  }
}

.order-price {
  font-family: RobotoBold, sans-serif;
}


</style>