<template>
  <button @click="clickHandler" role="button" class="app-button">
    {{ text }}
    <SpinnerLoader v-if="loading" />
  </button>
</template>

<script setup lang="ts">
import SpinnerLoader from "@/components/SpinnerLoader.vue"

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["click"])

const clickHandler = () => {
  emit("click")
}
</script>

<style scoped lang="sass">
.app-button
    display: flex
    align-items: center
    justify-content: center
    gap: 5px
    font-size: 16px
    line-height: 20px
    padding: 7px
    color: var(--base-text-color)
    background: transparent
    transition: opacity .2s linear
    border: 1px solid var(--base-border-color)
    border-radius: 10px
    cursor: pointer

    &:hover
        opacity: 0.75
</style>
