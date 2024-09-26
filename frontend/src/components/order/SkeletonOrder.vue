<template>
  <div class="w-full flex flex-wrap">
    <Accordion
      class="w-full"
      :multiple="true"
    >
      <AccordionTab
        v-for="skeleton in props.numberOfSkeleton"
        :key="skeleton"
      >
        <template #header>
          <div class="flex justify-content-between w-11">
            <div class="flex gap-3 ">
              <Skeleton
                shape="circle"
                size="1rem"
                border-radius="20px"
              />
              <Skeleton
                width="5rem"
                class=""
                height="1.2rem"
              />
            </div>

            <div class="flex gap-3 flex-column">
              <Skeleton
                width="11rem"
                class=""
                height="1.4rem"
              />
              <Skeleton
                width="7rem"
                class=""
                height="1.2rem"
              />
            </div>
          </div>
        </template>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  numberOfSkeleton: {type: Number, required: true},
})
</script>

<style scoped lang="scss">

.card {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

</style>