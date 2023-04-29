<template>
  <div class="app">
    <h1 class="app__title">Тест скорости печати</h1>
    <TextView v-if="started" :text="text" @restart="restartTrain" />
    <div v-else-if="!restartLoad" class="app__stater">
      <AppButton @click="init" text="Начать тренировку" :loading="loading" />
    </div>
    <SpinnerLoader v-if="restartLoad" class="app__loader" width="60" height="60"/>
    <notifications position="top center" :max="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useMainStore } from "@/stores/mainStore"
import TextView from "@/components/TextView.vue"
import AppButton from "@/components/appButton.vue"
import SpinnerLoader from "@/components/SpinnerLoader.vue"

export default defineComponent({
  name: "App",
  data: (): AppDataI => ({
    text: "",
    started: false,
    loading: false,
    restartLoad: false
  }),
  components: {
    SpinnerLoader,
    TextView,
    AppButton
  },
  methods: {
    async init(): Promise<void> {
      this.loading = true

      const mainStore = useMainStore()
      await mainStore.fetchText()
      this.text = mainStore.getText

      this.loading = false
      this.started = true
    },
    async restartTrain(): Promise<void> {
      this.restartLoad = true
      this.started = false
      await this.init()
      this.restartLoad = false
    }
  }
})

interface AppDataI {
  text: string
  started: boolean
  loading: boolean
  restartLoad: boolean
}
</script>

<style scoped lang="sass">
.app
  &__title
    text-align: center
    padding-bottom: 20px

  &__button
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

  &__stater
    display: flex
    justify-content: center
    align-items: center
    border-radius: 2px

  &__loader
    margin: 0 auto
</style>
