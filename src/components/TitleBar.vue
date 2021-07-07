<template>
    <div class="title-bar">
        <div class="font-control">
            <span @click="font_toggle" title="加载字体">
                <Icon :color="fontButtonColor">
                    <TextFont20Filled />
                </Icon>
            </span>
            <span>
                <a
                    href="https://github.com/liuxsdev/fanfou-poetry-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="源码"
                >
                    <Icon> <Github /> </Icon
                ></a>
            </span>
        </div>
    </div>
</template>
<script>
import { TextFont20Filled } from "@vicons/fluent";
import { Github } from "@vicons/fa";
import { Icon } from "@vicons/utils";

export default {
    name: "TitleBar",
    components: { TextFont20Filled, Icon, Github },
    data() {
        return {
            font_is_active:
                localStorage.getItem("font_is_active") == "true" ? true : false,
        };
    },
    computed: {
        fontButtonColor: function () {
            return this.font_is_active ? "green" : "#9a9a9a";
        },
    },
    methods: {
        font_toggle: function () {
            let current = localStorage.getItem("font_is_active");
            if (current == "true") {
                localStorage.setItem("font_is_active", false);
                this.font_is_active = false;
            } else {
                localStorage.setItem("font_is_active", true);
                this.font_is_active = true;
            }
            this.$emit("font_click", this.font_is_active);
        },
    },
};
</script>
<style scoped>
span {
    cursor: pointer;
    margin-right: 0.2em;
}

span a {
    color: #1b1d1d;
    text-decoration: none;
}
</style>