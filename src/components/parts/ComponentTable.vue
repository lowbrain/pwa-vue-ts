<script setup lang="ts">
const component = [
  {
    name: "vue",
    ver: "v3.2.45",
  },
  {
    name: "vue-router",
    ver: "v4.1.6",
  },
  {
    name: "vuetify",
    ver: "v3.1.3",
  },
  {
    name: "typescript",
    ver: "v4.7.4",
  },
  {
    name: "vite",
    ver: "v4.0.0",
  },
  {
    name: "vite-plugin-pwa",
    ver: "v0.14.1",
  },
  {
    name: "npm",
    ver: "v8.19.3",
  },
  {
    name: "node.js",
    ver: "v18.14.0",
  },
];
</script>

<template>
  <div>
    <p class="text-subtitle-1 text-center">本サンプルアプリは以下コンポーネントをもとに実装しています。</p>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Ver</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in component" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.ver }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
