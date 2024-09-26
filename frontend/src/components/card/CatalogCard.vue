<template>
  <div
    v-if="type==='grid'"
    class="col-12 md:col-4 p-0"
  >
    <div class="product-grid-item card">
      <div class="product-grid-item-top">
        <div>
          <i class="pi pi-tag product-category-icon" />
        </div>
      </div>
      <div class="product-grid-item-content">
        <Image 
          :src="image"
          class="card-image w-full"
          alt="Image Text"
          preview
        />
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-description">
          {{
            product.description.slice(0, 120)
          }}{{ product.description.length > 120 ? '...' : '' }}
        </div>
      </div>
      <div class="product-grid-item-bottom">
        <span class="product-price">${{ product.price }}</span>
        <Button
          v-if="isAuth"
          icon="pi pi-shopping-cart"
          @click="addToCart(product)"
        />
      </div>
    </div>
  </div>
  <div
    v-if="type==='list'"
    class="col-12"
  >
    <div class="product-list-item">
      <Image
        class="card-image"
        :src="image"
        alt="Image Text"
        preview
      />

      <div class="product-list-detail">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-description">
          {{
            product.description.slice(0, 80)
          }}{{ product.description.length > 80 ? '...' : '' }}
        </div>
      </div>

      <div class="product-list-action">
        <span class="product-price">{{ product.price }}</span>
        <Button
          v-if="isAuth"
          icon="pi pi-shopping-cart"
          label="Add to Cart"
          @click="addToCart(product)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Product from "@/assets/helpers/interfaces/Product";
import {CartRequest} from "@/services/APIService";
import {useAuthStore} from "@/stores/auth";

const isAuth = useAuthStore().isAuth();

defineProps<{ product: Product; type?: string; image: string }>()
const emit = defineEmits(['addToCart'])
const addToCart = async (product: Product) => {
  const res = await CartRequest.add(product.id);
  emit('addToCart', {res, product});
}

</script>

<style scoped lang="scss">
.card {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

.card-image {
  margin: 2rem 0;
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;
    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center !important;
      text-align: center;
    }

    .product-list-action {
      display: flex;
    }

    .product-list-action {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

  }
}


</style>