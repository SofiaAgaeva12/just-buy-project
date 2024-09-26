<template>
  <div class="card p-fluid w-full p-0">
    <DataTable
      :value="props.numberOfSkeleton"
      responsive-layout="stack"
      :paginator="false"
      :rows="5"
      removable-sort
      breakpoint="960px"
    >
      <Column class="w-4">
        <template #body>
          <Skeleton
            width="100%"
            height="7rem"
            class="product-image"
          />
        </template>
      </Column>
      <Column field="name">
        <template #header>
          <Skeleton
            width="35%"
            class="my-2"
            height="1.2rem"
          />
        </template>

        <template #body>
          <Skeleton
            width="100%"
            class="my-2"
            height="1.2rem"
          />
        </template>
      </Column>

      <Column
        field="description"
        class="w-4 gap-4"
      >
        <template #header>
          <div>
            <Skeleton
              width="5rem"
              class="my-2"
              height="1.2rem"
            />
          </div>
        </template>
        <template #body>
          <div class="table-description">
            <Skeleton
              width="100%"
              class="my-2"
              height="0.7rem"
            />
            <Skeleton
              width="70%"
              class="my-2"
              height="0.7rem"
            />
            <Skeleton
              width="40%"
              class="my-2"
              height="0.7rem"
            />
          </div>
        </template>
      </Column>
      <Column field="price">
        <template #header>
          <Skeleton
            width="35%"
            class="my-2"
            height="1.2rem"
          />
        </template>
        <template #body>
          <Skeleton
            width="100%"
            height=".7rem"
            class="my-1"
          />
        </template>
      </Column>
      <template #footer>
        <div class="flex justify-content-between gap-3">
          <Skeleton
            width="25%"
            class="my-2"
            height="1.2rem"
          />
          <Skeleton
            width="25%"
            class="my-2"
            height="1.2rem"
          />
          <Skeleton
            width="25%"
            class="my-2"
            height="1.7rem"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  numberOfSkeleton: {type: Number, required: true},
})
</script>

<style scoped lang="scss">

.card {
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
}


.product-grid-item {
  border: 1px solid var(--surface-border);
  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product-grid-item-content {
    text-align: left;
  }
}

.product-grid-item-skeleton {
  box-shadow: none;
  min-width: 20rem;
}


@media screen and (max-width: 576px) {
  .product-image {
    width: 100%;
  }
}

</style>