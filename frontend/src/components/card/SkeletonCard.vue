<template>
  <div class="w-full flex flex-wrap">
    <div
      v-for="skeleton in props.numberOfSkeleton "
      :key="skeleton"
      class="col-12 md:col-4 p-0"
    >
      <div class="product-grid-item card product-grid-item-skeleton">
        <div class="product-grid-item-top">
          <Skeleton
            shape="circle"
            size="1rem"
            border-radius="20px"
          />
        </div>

        <div class="product-grid-item-content">
          <Skeleton
            width="100%"
            height="12rem"
            class="my-5"
          />
          <Skeleton
            width="50%"
            class="my-2"
            height="1.2rem"
          />
          <Skeleton
            width="25%"
            class="my-2"
            height="1.2rem"
          />
          <Skeleton
            height=".7rem"
            class="my-1"
          />
          <Skeleton
            width="80%"
            height=".7rem"
            class="my-1"
          />
          <Skeleton
            width="60%"
            height=".7rem"
            class="my-1"
          />
        </div>
        <div class="product-grid-item-bottom">
          <Skeleton
            width="25%"
            class="my-2"
            height="1.2rem"
          />
          <Skeleton
            shape="circle"
            size="2rem"
            border-radius="4px"
          />
        </div>
      </div>
    </div>
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

</style>