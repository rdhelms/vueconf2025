---
theme: default
themeConfig:
  primary: '#fff'
background: /saucer-separation.jpg
# some information about your slides (markdown enabled)
title: Vueconf 2025
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Dependency Injection in Vue

---

# Ask ChatGPT:
What Vue features are most underutilized by Vue devs?

<v-clicks>

1. Teleport
2. Suspense
3. defineAsyncComponent
4. Provide / Inject <span v-click="6">🌟</span>
5. Custom Directives

</v-clicks>

<img v-drag="[524,132,340,NaN]" src="./nature-of-the-universe.jpg">

---

# What is Dependency Injection?

> Where an object or function **receives** other objects or functions that it requires, as opposed to creating them itself

<div class="mt-2 mb-8" />

<div v-click class="mb-2"> → Let's say you're doing some math </div>
<div v-click> → "I'd like a calculator" </div>
<ul class="ml-8">
  <li v-click> With dependency injection, someone hands you a calculator </li>
  <li v-click> Without dependency injection, you have to build your own calculator </li>
</ul>

<img v-drag="[93,296,305,NaN]" v-click="4" src="./tricorder.webp">

---
clicks: 5
---

# Examples of Dependency Injection in Vue

<v-clicks>

<ul>
  <li> Props </li>
  <li> Slots </li>
  <li> Shared data stores (pinia, etc) </li>
  <li class="examples__provide-inject" v-mark.circle.orange="5"> Provide / Inject </li>
</ul>

</v-clicks>

<style>
  .examples__provide-inject {
    width: 130px;
  }
</style>

---
layout: two-cols
---

# `provide` and `inject`

#### Parent.vue

```vue
<script setup>
import { provide } from 'vue'

provide('message', 'hello')
</script>
```

<v-click at="3">

<div class="pt-3"></div>

App-level provide

```ts
import { createApp } from 'vue'
const app = createApp({})
app.provide('message', 'hello!')
```

</v-click>

::right::

<div class="pt-14"></div>

<v-click at="1">

#### Child.vue (or any descendant)

````md magic-move {at: 2}

```vue
<script setup>
import { inject } from 'vue'

const msg = inject('message')
</script>
```

```vue {4-5}
<script setup>
import { inject } from 'vue'

// Can set a default value, if nothing provided
const msg = inject('message', 'default message')
</script>
```

````

</v-click>

<img v-drag="[621,274,300,NaN]" v-click="[1, 4]" src="./worf-and-son.jpg">

<v-click at="4">

With TypeScript

```vue twoslash
<script setup lang="ts">
import { provide, inject } from 'vue'

provide<string>('message', 'hello')
provide<string>('message', 5)

const msg1 = inject<string>('message')
const msg2 = inject<string>('message', 'default')
</script>
```

</v-click>

<style>
  .twoslash-popup-code {
    width: 400px;
  }
</style>

---
layout: two-cols
---

# Providing reactive data

#### Parent.vue

````md magic-move {at: 2}

```ts
import { provide, ref } from 'vue'

const dynamicMsg = ref('hello')
provide('message', dynamicMsg)
```

```ts
import { provide, ref } from 'vue'

const dynamicMsg = ref('hello')
provide('message', dynamicMsg)

// Change will be reflected in Child 👍
dynamicMsg.value = 'hi there'
```

```ts
import { provide, ref } from 'vue'

const dynamicMsg = ref('hello')
provide('message', dynamicMsg)

// Change will be reflected in Child 👍
dynamicMsg.value = 'hi there'
```

```ts {1-4}
import { provide, ref, readonly } from 'vue'

const dynamicMsg = ref('hello')
provide('message', readonly(dynamicMsg))

// Change will be reflected in Child 👍
dynamicMsg.value = 'hi there'
```

```ts
import { provide, ref, readonly } from 'vue'

const dynamicMsg = ref('hello')
provide('message', readonly(dynamicMsg))

// Change will be reflected in Child 👍
dynamicMsg.value = 'hi there'
```

```ts
import { provide, ref, readonly } from 'vue'

const dynamicMsg = ref('hello')
provide('message', readonly(dynamicMsg))

// Change will be reflected in Child 👍
dynamicMsg.value = 'hi there'
```

```ts
import { provide, ref, readonly } from 'vue'

const dynamicMsg = ref('hello')
provide('message', readonly(dynamicMsg))

// Providing an update function
// keeps the provider in control
const updateMsg = (newMsg) => {
  dynamicMsg.value = newMsg
}
provide('updateMsg', updateMsg)
```

````

::right::

<div class="pt-14"></div>

<v-click>

#### Child.vue

````md magic-move {at: 3}

```ts
import { inject } from 'vue'

const msg = inject('message')   // Ref<string>
```

```ts {3-6}
import { inject } from 'vue'

const msg = inject('message')

// Whoops...this changes the parent's value 👎
msg.value = 'goodbye'
```

```ts {5}
import { inject } from 'vue'

const msg = inject('message')
```

```ts
import { inject } from 'vue'

const msg = inject('message')
```

```ts
import { inject } from 'vue'

const msg = inject('message')

// [Vue warn] Set operation on key "value" failed: target is readonly. 👍
msg.value = 'goodbye'
```

```ts
import { inject } from 'vue'

const msg = inject('message')

// [Vue warn] Set operation on key "value" failed: target is readonly. 👍
msg.value = 'goodbye'
```

```ts
import { inject } from 'vue'

const msg = inject('message')
const updateMsg = inject('updateMsg')

updateMsg('live long and prosper')
```

````

</v-click>

<img v-drag="[724,277,199,NaN]" v-click="8" src="./live-long-and-prosper.png">

---
layout: two-cols
---

# Injection Key Naming Collisions

````md magic-move

```ts
import { provide, inject } from 'vue'

// Parent.vue
provide('message', 'hello')

// Child.vue
const msg = inject('message')
```

```ts
import { provide, inject } from 'vue'

// Parent.vue
provide('message', 'hello')

// Grandparent.vue
provide('message', 'greetings')

// plugin
provide('message', 'nuq’neH')

// Child.vue...what will we get?
const msg = inject('message')
```

````

::right::

<img v-drag="[529,125,363,NaN]" v-click="1" src="./saucer-crash.jpg">

---

# Symbol Injection Keys

```ts {monaco}
import { provide, inject } from 'vue'

// injectionKeys.ts
export const messageKey = Symbol()

// Parent.vue
provide(messageKey, 'hello')

// Child.vue
const msg = inject(messageKey)

// Symbols are great, but how do we get types?
const str: string | undefined = msg
```

---

# Typed Symbol Injection Keys

```ts twoslash
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

// injectionKeys.ts
export const messageKey = Symbol() as InjectionKey<string>

// Parent.vue
provide(messageKey, 'hello')

// type-checking provide()
provide(messageKey, 5)

// Child.vue
const msg = inject(messageKey)

const msgWithDefault = inject(messageKey, 'default value')
```

<style>
  .twoslash-popup-code {
    width: 700px;
  }
</style>

---
layout: two-cols-header
---

# Putting it all together

Let's make a Vue plugin 🔧

::left::

```ts {monaco}
// my-plugin
import type { App, InjectionKey, Ref } from 'vue'
import { inject, readonly, ref } from 'vue'

const message = ref('hello')
const updateMsg = (newMsg: string) => { message.value = newMsg }

// const messageKey = Symbol() as InjectionKey<typeof message>
// const updateMsgKey = Symbol() as InjectionKey<typeof updateMsg>

// export const myPlugin = {
//     install (app: App) {
//         app.provide(messageKey, readonly(message))
//         app.provide(updateMsgKey, updateMsg)
//     }
// }
// export const useMessage = () => {
//   return inject(messageKey)
// }
// export const useUpdateMsg = () => {
//   return inject(updateMsgKey, () => {})
// }
```

::right::

<v-click>

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { myPlugin } from 'my-plugin'

const app = createApp(App).use(myPlugin).mount('#app')
```

</v-click>

<v-click>

```vue twoslash
<!-- Component.vue -->
<script setup lang="ts">
import { useMessage, useUpdateMsg } from 'my-plugin'

const msg = useMessage()
const updateMsg = useUpdateMsg()
</script>

<template>
  <div>
    {{ msg }}
    <button @click="updateMsg('engage')">Engage</button>
  </div>
</template>
```

</v-click>

<style>
  .twoslash-popup-code {
    width: 700px;
  }
</style>

---

# When you may want to use provide / inject

<ul>
  <li> Sharing data between a component and its descendants </li>
  <li> When you have a large number of props being passed through many components </li>
  <li> When you don't have access to a store (pinia, etc) </li>
  <li> Plugins </li>
  <li> Component libraries </li>
</ul>

---

# When you may NOT want to use provide / inject

<ul>
  <li> When you can use simple props </li>
  <li> When you have access to a store (pinia, etc) </li>
  <li> When the relationship between provider and injector is too complex </li>
</ul>

---

# Real world examples using provide / inject

<ul>
  <li> vue-router </li>
  <li> pinia </li>
  <li> vue-i18n </li>
  <li> vuetify </li>
  <li> quasar </li>
  <li> primevue </li>
  <li> vueuse </li>
</ul>

---

<div class="flex justify-center text-4xl">The End</div>

<img v-drag="[284,133,431,NaN]" src="./engage.jpg" >
