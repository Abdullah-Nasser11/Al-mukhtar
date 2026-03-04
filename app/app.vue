<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <!-- Header -->
    <!-- محتوى الصفحات -->
    <main class="container mx-auto px-6 py-2">
      <NuxtPage />
    </main>

  </div>
</template>
<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo.png' }
  ]
})
</script>
