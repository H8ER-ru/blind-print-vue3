import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import Notifications from "@kyvg/vue3-notification"
import "./assets/main.css"

const app = createApp(App)

app.use(Notifications)
app.use(createPinia())

app.mount("#app")
