<template>
  <div>
    <Nav />
    <NuxtPage />

  </div>
</template>
<script setup>
useHead({
  titleTemplate: '%s | Next Dev',
    title: 'The Next Dev Delivery',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&amp;display=swap"},
      {rel: "stylesheet", type: "text/css", href: "/vendor/font-awesome/css/all.min.css"},
      {rel: "stylesheet", type: "text/css", href: "/vendor/bootstrap-icons/bootstrap-icons.css"},
      {id: "style-switch", rel: "stylesheet", type: "text/css", href: "/css/style.css"},
      {rel: "stylesheet", type: "text/css", href: "/css/custom.css"},
      {rel: "shortcut icon", href: "/images/suns.png"}
    ],
    script: [

      
    ]
})
</script>