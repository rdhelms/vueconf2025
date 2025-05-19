import type { App, InjectionKey, Ref } from 'vue'
import { inject, readonly, ref } from 'vue'

const messageKey = Symbol() as InjectionKey<Ref<string>>
const updateMsgKey = Symbol() as InjectionKey<(msg: string) => void>

const message = ref('hello')
const updateMsg = (newMsg: string) => { message.value = newMsg }

export const myPlugin = {
    install (app: App) {
        app.provide(messageKey, readonly(message))
        app.provide(updateMsgKey, updateMsg)
    }
}
export const useMessage = () => {
  return inject(messageKey)
}
export const useUpdateMsg = () => {
  return inject(updateMsgKey, () => {})
}
