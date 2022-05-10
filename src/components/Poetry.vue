<template>
    <div class="poetry" :class="{ custom_fonts: font_is_active }">
        <p v-show="loading">Loading</p>
        <div id="header">
            <div class="float hidden" id="btn" v-on:click="goAuth" v-if="!isLogined">
                登陆
            </div>
            <div class="float" v-if="isLogined">欢迎:{{ username }}</div>
            <TitleBar @font_click="font_toggle"></TitleBar>
        </div>

        <div id="info" v-show="!loading">
            {{ extra_info.type }} {{ extra_info.collection }} / {{ poetry_data.author }} /
            {{ poetry_data.rhythmic || poetry_data.title }}
            /
            {{ extra_info.id }}
        </div>
        <div id="title">
            <p v-if="!poetry_data.rhythmic">{{ poetry_data.title }}</p>
            <p>{{ poetry_data.rhythmic }}</p>
        </div>
        <div id="author">
            <span id="time" v-show="!loading">{{ extra_info.poetry_time }}</span>
            <span>{{ poetry_data.author }}</span>
        </div>
        <div id="para">
            <p v-for="paragraph in poetry_data.paragraphs" :key="paragraph">
                {{ paragraph }}
            </p>
        </div>
    </div>
</template>
<script>
import { get_poetry_data_by_uid } from "@liuxsdev/poetry";
import TitleBar from "./TitleBar.vue";
// ================= functions ===================
async function set_data(uid, app) {
    let _poetry_data = await get_poetry_data_by_uid(uid);
    let poetry_data = _poetry_data["poetry_data"];
    app.poetry_data = poetry_data;
    app.extra_info = _poetry_data["extra"];
    app.loading = false;
    // 访问首页时，将hash值设置为诗词的uid
    if (location.hash == "#/") {
        location.hash += uid;
    }
    // 设置标题
    let title_str = poetry_data.title || poetry_data.rhythmic;
    if (title_str.length > 15) {
        title_str = title_str.slice(0, 15) + "..";
    }
    document.querySelector("title").innerText = title_str;
}

export default {
    name: "Poetry",
    props: ["id"],
    data() {
        return {
            loading: true,
            font_is_active:
                localStorage.getItem("font_is_active") == "true" ? true : false,
            poetry_data: {},
            extra_info: {},
            username: "",
            isLogined: false,
        };
    },
    components: {
        TitleBar,
    },
    computed: {
        fontButtonColor: function () {
            return this.font_is_active ? "green" : "#9a9a9a";
        },
    },
    methods: {
        goAuth: async function () {},
        font_toggle: function (value) {
            this.font_is_active = value;
        },
    },
    async created() {
        // let uid = get_uid();
        set_data(this.id, this);
        this.$watch(
            () => this.$route.params,
            async (toParams) => {
                // console.log(toParams, pre);
                if (toParams.id != "") {
                    set_data(toParams.id, this);
                }
            }
        );
    },
};
</script>

<style scoped>
.hidden {
    display: none;
}

.float {
    float: left;
    margin-right: 0.5em;
}

#info {
    position: absolute;
    float: left;
    top: 2%;
    left: 2%;
    font-family: sans-serif;
    font-size: 0.5em;
    color: #9a9a9a;
}

#time {
    color: #fff;
    background-color: #c20000;
    border-radius: 3px;
    padding: 3px 4px 3px 3px;
    margin-right: 0.5em;
}

.poetry {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    font-size: calc(1.1em + 0.8vw);
    font-family: "汉仪楷体", "楷体", sans-serif;
}
#title {
    font-size: calc(1em + 0.5vw);
    font-weight: 600;
}
#author {
    font-size: 67%;
    letter-spacing: -1px;
}

#para p {
    margin: 0.8em;
    cursor: pointer;
}

#para p:hover {
    color: #ff5722;
    font-weight: 600;
}

#header {
    position: absolute;
    float: left;
    top: 2%;
    right: 2%;
    font-family: sans-serif;
    font-size: 0.8em;
    color: #9a9a9a;
}

@font-face {
    font-family: FZXJL;
    src: url("../assets/fonts/FZXJL.woff2");
}

.custom_fonts {
    font-family: "FZXJL", "汉仪楷体", "楷体", sans-serif;
}
</style>
