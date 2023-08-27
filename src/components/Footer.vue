<template>
  <footer class="footer text-gray-700 font-sans">
    <span class="author">
      <a href="https://fanfou.com/%7E5vWI0IgzJHI" target="_blank">@小诗词</a>
    </span>
    <span>
      | Hosted On
      <a href="https://vercel.com/" target="_blank">
        <img class="inline-block w-12" src="../assets/vercel-logotype-dark.svg" />
      </a>
    </span>
    <span>
      | 诗词整理自
      <a
        href="https://github.com/chinese-poetry/chinese-poetry"
        target="_blank"
        class="text-orange-400 underline decoration-solid"
        >Chinese-poetry</a
      >
    </span>
    <me />
  </footer>
</template>

<script>
import Me from "./Me.vue";

export default {
  name: "Footer",
  components: {
    Me,
  },
};
</script>

<style scoped>
.footer {
  font-size: 0.8em;
}
</style>
