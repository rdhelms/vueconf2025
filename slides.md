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

1. Teleport
2. Suspense
3. defineAsyncComponent
4. Provide / Inject 🌟
5. Custom Directives

<!-- TODO: Insert nature-of-the-universe image -->

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

<!-- TODO: Insert image of TNG engineering -->

---

# Examples of Dependency Injection in Vue

<ul>
  <li> Props </li>
  <li> Slots </li>
  <li> Shared data stores (pinia, etc) </li>
  <li class="examples__provide-inject" v-mark.circle.orange> Provide / Inject </li>
</ul>

<style>
  .examples__provide-inject {
    width: 130px;
  }
</style>

---

# Getting to know `provide` and `inject`

<ul>
  <li> Code example of provide </li>
  <li> Code example of inject </li>
</ul>

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
  <li> When a whole new component might be better </li>
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

# Diving deeper: Reactivity with provide / inject

- Provided data is not reactive by default

---

# Diving deeper: Injection keys

- Symbol injection keys are safer than strings
- Avoids naming collisions

---

# Diving deeper: provide / inject with TypeScript

- Provided/injected data can be typed via type parameters
- Creates a "contract" for working with injected data

---

# Recap

---

# The End!
