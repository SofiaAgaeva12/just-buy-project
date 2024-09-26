<template>
  <Toast />
  <ScrollTop class="bg-secondary" />
  <div class="card w-full">
    <DataView
      :value="products"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sort-order="sortOrder"
      :sort-field="sortField"
      class="w-full"
    >
      <template #empty>
        <SkeletonCard
          v-if="isLoading"
          :number-of-skeleton="numberOfSkeleton"
        />
      </template>

      <template #header>
        <div class="grid grid-nogutter">
          <div
            class="col-6"
            style="text-align: left"
          >
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              option-label="label"
              placeholder="Сортировка цены"
              @change="onSortChange($event)"
            />
          </div>
          <div
            class="col-6"
            style="text-align: right"
          >
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <CatalogCard
          :product="slotProps.data"
          :type="'list'"
          :image="images[Math.floor(images.length*slotProps.data.id/110)]"
          @add-to-cart="addToast"
        />
      </template>

      <template #grid="slotProps">
        <CatalogCard
          :product="slotProps.data"
          :type="'grid'"
          :image="images[Math.floor(images.length*slotProps.data.id/110)]"
          @add-to-cart="addToast"
        />
      </template>
    </DataView>
  </div>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {computed, onMounted, ref} from "vue";
import {useAsyncState} from "@vueuse/core";
import {ImageRequest, ProductRequest} from "@/services/APIService";
import type Product from "@/assets/helpers/interfaces/Product";
import SkeletonCard from "@/components/card/SkeletonCard.vue"
import CatalogCard from "@/components/card/CatalogCard.vue"
import {useToast} from "primevue/usetoast";

const layout = ref('grid');

const numberOfSkeleton = 9;
const {state , isLoading} = useAsyncState(ProductRequest.get(), []);
const products: Ref<Product[]> = computed(() => state?.value?.data?.data);

const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
  {label: 'Цена по убыванию', value: '!price'},
  {label: 'Цена по возрастанию', value: 'price'},
]);
const onSortChange = (event: { value: { value: any; }; }) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};

const toast = useToast();
const addToast = (toastData: any) => {
  const {res, product} = toastData;
  let toastMessage = {severity: 'error', summary: 'Что-то пошло не так!', detail: res?.message, life: 3000}
  if (res?.status === 201) {
    toastMessage.severity = 'success';
    toastMessage.summary = 'Товар добавлен в корзину';
    toastMessage.detail = product.name;
  }
  toast.add(toastMessage);
}

const images = ref([]);
const getImage = async () => {
  images.value = await ImageRequest.getImage('sofa');
}
onMounted(()=>getImage())

</script>

<style lang="scss" scoped>
::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    width: 100%;
    height: 12rem;
    object-fit: cover !important;
  }

  .product-grid-item-content {
    text-align: left;
    height: 25rem;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  gap: 1rem;

  img {
    width: 20rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

</style>