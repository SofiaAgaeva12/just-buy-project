<template>
  <Card>
    <template #header>
      <img
        src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
        alt="image"
      >
    </template>
    <template #title>
      Ваша корзина пуста
    </template>
    <template #subtitle>
      Добавьте в неё товары из каталога и оформите заказ
    </template>
    <template #footer>
      <router-link
        to="catalog"
        class="link"
      >
        <Button
          icon="pi pi-th-large"
          label="В каталог"
        />
      </router-link>

      <router-link
        to="orders"
        class="link"
      >
        <Button
          icon="pi pi-shopping-bag"
          label="Мои заказы"
          class="p-button-secondary"
          style="margin-left: .5em"
        />
      </router-link>
    </template>
  </Card>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
}
</style>