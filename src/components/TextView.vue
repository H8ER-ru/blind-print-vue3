<template>
  <div class="text-view">
    <div class="text-view__end" v-if="isEnded">
      Поздравляю. Вы напечатали текст длинной {{ symbolsLengthText }} за
      {{ completeTime }}. Количество ошибок - {{ mistakeCount }}.
      <br />
      (Теперь можно и офер автору приложения предложить 😂)
      <br />
      <AppButton @click="emit('restart')" text="Начать заново" />
    </div>
    <div v-else class="text-view__task">
      <p class="text-view__subtitle">Отсчет времени начнется после ввода первого символа</p>
      <div class="text-view__statistic">
        <p>Скорость печати: {{printSpeed}}</p>
        <p>Точность: {{accuracy}}</p>
      </div>
      <div class="text-view__wrapper">
        <span
          v-for="(word, wordIndex) in dividedText"
          :key="wordIndex + '__word'"
          :class="{
            'text-view__word--current': wordIndex === activeWordIndex,
            'text-view__word--error': wordIndex === activeWordIndex && wrongWord
          }"
          class="text-view__word"
        >
          {{ word }}
        </span>
      </div>
      <AppButton class="text-view__again" text="Заново" @click="emit('restart')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useNotification } from "@kyvg/vue3-notification"
import AppButton from "@/components/appButton.vue"
import { getTextByNumber, secondsWords, symbolsWords } from "@/utils/timeUtils"
import { accuracyPercentCount, speedCount } from "@/utils/countUtils"

const { notify } = useNotification()

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["restart"])

const isEnded = ref<boolean>(false)
const inputText = ref<string[]>([])
const activeWordIndex = ref<number>(0)
const wrongWord = ref<boolean>(false)
const completeTime = ref<string>("")
const mistakeCount = ref<number>(0)

let timeStart: number = 0
let timeEnd: number = 0

const dividedText = computed((): string[] => {
  return props.text.split("")
})

const symbolsLengthText = computed((): string => {
  const length = dividedText.value.length
  return `${length} ${getTextByNumber(length, symbolsWords)}`
})

const printSpeed = computed((): string => {
  return speedCount(timeStart, activeWordIndex.value)
})

const accuracy = computed((): string => {
  return accuracyPercentCount(mistakeCount.value, activeWordIndex.value)
})

const keyboardHandler = (event: KeyboardEvent): void => {
  const input = event.key

  if (wrongWord.value === false && activeWordIndex.value === 0) {
    timeStart = Date.now()
  }

  if (/^[a-zA-Z,.\s-"'()]$/.test(input)) {
    inputHandler(input)
  } else if (/^[a-яA-Я]$/.test(input)) {
    notify({
      title: "Смените раскладку",
      duration: 2000
    })
  }
}

const inputHandler = (word: string): void => {
  if (word === dividedText.value[activeWordIndex.value]) {
    wrongWord.value = false
    activeWordIndex.value++
    inputText.value.push(word)

    if (activeWordIndex.value === dividedText.value.length) {
      taskEndHandler()
    }
  } else {
    mistakeCount.value++
    wrongWord.value = true
  }
}

const taskEndHandler = (): void => {
  timeEnd = Date.now()
  const seconds = Math.round((timeEnd - timeStart) / 1000)

  completeTime.value = `${seconds} ${getTextByNumber(seconds, secondsWords)}`

  isEnded.value = true
}

onMounted(() => {
  document.addEventListener("keyup", keyboardHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener("keyup", keyboardHandler)
})
</script>

<style scoped lang="sass">
.text-view
  max-width: 800px
  margin: 0 auto
  padding: 10px
  border: 1px solid var(--base-border-color)
  border-radius: 20px

  &__wrapper
    font-size: 21px
    line-height: 32px

  &__word
    padding: 1px
    transition: background-color .1s linear
    border-radius: 5px

    &--current
        background: var(--base-success-color)

    &--error
        background: var(--base-error-color)

  &__end
    text-align: center
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 10px

  &__subtitle
    text-align: center
    padding-bottom: 10px

  &__again
    margin-left: auto
    margin-top: 10px
</style>
