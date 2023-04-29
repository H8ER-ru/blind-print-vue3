import { defineStore } from "pinia"
import { useNotification } from "@kyvg/vue3-notification"

const baseApiUrl: string = import.meta.env.VITE_BASE_API_URL
const { notify } = useNotification()

export const useMainStore = defineStore("mainStore", {
  state: (): MainStoreI => ({
    text: ""
  }),
  getters: {
    getText: (state): string => state.text
  },
  actions: {
    async fetchText(): Promise<void> {
      try {
        const response: Response = await fetch(`${baseApiUrl}/?type=meat-and-filler`)
        const text: string[] = await response.json()
        this.text = text[0]
      } catch (e) {
        notify({
          title: "Ошибка API",
          duration: 2000
        })
      }
    }
  }
})

interface MainStoreI {
  text: string
}
