<template>
    <footer class="footer">
        <span class="author">
            <a href="https://fanfou.com/%7E5vWI0IgzJHI">@小诗词</a>
        </span>
        <span>
            | Hosted On
            <a href="https://vercel.com/" target="_blank">
                <img src="../assets/vercel-logotype-dark.svg" width="50" />
            </a>
        </span>
        <span>
            | 诗词整理自
            <a
                href="https://github.com/chinese-poetry/chinese-poetry"
                target="_blank"
                >chinese-poetry</a
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
    text-align: center;
    font-family: "Microsoft Yahei";
    width: 100%;
    font-size: 0.8em;
}

a {
    color: #766686;
    text-decoration: none;
}
</style>