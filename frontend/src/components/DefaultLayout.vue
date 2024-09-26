<script setup lang="ts">
import {computed} from "vue";
import {Auth} from "@/services/APIService";
import {useAuthStore} from "@/stores/auth";
import {useDark, useToggle} from "@vueuse/core";

let userAuth = useAuthStore();
const items = computed(() => {
  if (userAuth.getToken().value?.length > 0) {
    return [
      {
        label: 'Каталог',
        icon: 'pi pi-fw pi-th-large',
        to: 'catalog'
      },
      {
        label: 'Корзина',
        icon: 'pi pi-fw pi-shopping-cart layout-menuitem-icon',
        to: 'cart'
      },
      {
        label: 'Оформленные заказы',
        icon: 'pi pi-fw pi-shopping-bag layout-menuitem-icon',
        to: 'orders'
      },
      {
        label: 'Выйти',
        icon: 'pi pi-fw pi-sign-out layout-menuitem-icon',
        command: async () => {
          await Auth.logout();
          userAuth.setToken('');
        },
        to: 'login'
      },
    ]
  } else {
    return [
      {
        label: 'Каталог',
        icon: 'pi pi-fw pi-th-large',
        to: 'catalog'
      },
      {
        label: 'Войти',
        icon: 'pi pi-fw pi-sign-in layout-menuitem-icon',
        to: 'login'
      },
      {
        label: 'Зарегистрироваться',
        icon: 'pi pi-fw pi-user-edit',
        to: 'register'
      },
    ]
  }
});
const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <section class="flex align-items-center flex-column gap-5">
    <Menubar
      :model="items"
      class="flex justify-content-between wrapper"
    >
      <template #start>
        <div class="flex align-items-center">
          <router-link to="/">
            <img
              alt="logo"
              src="../assets/images/just-buy-logo-cut.png"
              height="50"
              class="logo"
            >
          </router-link>

          <i
            v-if="!isDark"
            class="pi pi-circle-fill text-yellow-500 pr-2"
          />
          <i
            v-if="isDark"
            class="pi pi-star-fill text-white-alpha-70 pr-2"
          />
          <InputSwitch
            v-model="isDark"
            icon="pi pi-shopping-cart"
            @click="toggleDark"
          />
        </div>
      </template>
    </Menubar>
    <div class="wrapper flex justify-content-center">
      <slot />
    </div>
  </section>
</template>

<style>
.logo {
  cursor: pointer;
}

.wrapper {
  width: 60%;
}

@media (max-width: 1000px) {
  .wrapper {
    width: 100%;
  }
}

</style>