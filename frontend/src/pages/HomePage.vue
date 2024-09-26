<template>
  <div class="card w-full">
    <Timeline
      :value="timeLineOptions"
      align="alternate"
      class="customized-timeline"
    >
      <template #marker="slotProps">
        <span
          class="custom-marker shadow-2"
          :style="{backgroundColor: slotProps.item.color}"
        >
          <i :class="slotProps.item.icon" />
        </span>
      </template>
      <template #content="slotProps">
        <Card class="w-full flex align-items-center justify-content-center">
          <template #title>
            <div class="parallax-item fl-wrap ">
              <div class="parallax-header fl-wrap">
                <span>{{ slotProps.item.num }}.</span>
              </div>
              <div
                class="parallax-text"
                :class="slotProps.item.type === 'left' ? 'left-pos' : 'right-pos'"
              >
                <router-link
                  to="register"
                  style="text-decoration: none"
                >
                  <h3 class="card-title parallax-text parallax-layer">
                    {{ slotProps.item.status }}
                  </h3>
                </router-link>
              </div>
            </div>
          </template>
          <template #content>
            <img
              :src="slotProps.item.src"
              class="w-full"
              alt=""
            >
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";

const timeLineOptions = ref([
  {
    status: 'Зарегистрируйтесь',
    icon: 'pi pi-user',
    color: 'var(--primary-color)',
    image: 'game-controller.jpg',
    type: 'left',
    src: '/src/assets/images/register.png',
    num: '01',
  },
  {
    status: 'Добавьте товары в корзину',
    icon: 'pi pi-shopping-cart',
    color: 'var(--primary-color)',
    type: 'right',
    src: '/src/assets/images/add-to-cart.png',
    num: '02',
  },
  {
    status: 'Оформите заказ',
    icon: 'pi pi-check-circle',
    color: 'var(--primary-color)',
    type: 'left',
    src: '/src/assets/images/create-order.png',
    num: '03',
  },
]);

onMounted(() => {
  window.addEventListener("scroll", () => {
    // eslint-disable-next-line no-undef
    const elements = Array.from(document.getElementsByClassName('parallax-text') as HTMLCollectionOf<HTMLElement>)
    elements.forEach((el) => {
      const win = window.scrollY;
      el.style.transform = `translate(0,${-win * 0.2}px)`
    })
  })
})

</script>

<style lang="scss">

.parallax-item {
  margin: 2rem 0;
}

.parallax-item img {
  height: auto;
  opacity: 0.9;
}

.parallax-text {
  position: absolute;
  bottom: 20%;
  z-index: 10;
}

.parallax-text.right-pos {
  right: -1rem;
}

.parallax-text.left-pos {
  left: 1rem;
}

.parallax-text h3 {
  font-size: 3.0rem;
  font-family: 'Roboto', sans-serif;
  position: relative;
  cursor: pointer;
}

.parallax-text h3:before {
  content: '';
  position: absolute;
  top: -30px;
  width: 4rem;
  height: 0.3rem;
  left: 0;
  background: var(--primary-color);
}

.parallax-text h3:after {
  content: '';
  position: absolute;
  top: -5px;
  bottom: -10px;
  width: 1px;
  -webkit-transition: all 2000ms cubic-bezier(.19, 1, .22, 1) 0ms;
  right: -2rem;
  background: var(--text-color-secondary);
  z-index: -1;
}

.parallax-text h3:hover:after {
  width: 110%;
  opacity: 0.4;
}

.parallax-text h3 a {
  position: relative;
  z-index: 10;
}

.parallax-text h4 {
  text-align: left;
  color: #292929;
  padding: 15px 0;
}

.parallax-header {
  display: inline-block;
}

.parallax-header span {
  float: left;
  font-size: 2rem;
  text-align: left;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.parallax-header ul li {
  float: left;
  text-align: left;
}

.card-title {
  color: rgba(0, 0, 0, 0.94);
}

.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content),
::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {

  .parallax-text h3 {
    font-size: 2.5vh;
  }


  .parallax-text.right-pos {
    right: 2rem;
  }

  .parallax-text.left-pos {
    left: 1rem;
  }


  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}


</style>