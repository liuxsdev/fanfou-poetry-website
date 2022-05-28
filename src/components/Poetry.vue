<template>
    <div class="poetry" :class="{ custom_fonts: font_is_active }">
        <p v-show="loading">Loading</p>
        <div id="header">
            <TitleBar @font_click="font_toggle"></TitleBar>
        </div>

        <div id="info" v-show="!loading">
            {{ extra_info.type }} {{ extra_info.collection }} / {{ poetry_data.author }} /
            {{ poetry_data.rhythmic || poetry_data.title }}
            /
            {{ extra_info.id }}
        </div>
        <div id="title">
            <div>
                <span v-if="!poetry_data.rhythmic">{{ poetry_data.title }}</span>
                <span>{{ poetry_data.rhythmic }}</span>
                <span class="shareicon">
                    <Icon color="#32323287" @click="share" size="20" class="share"
                        ><Share16Regular
                    /></Icon>
                </span>
            </div>
        </div>
        <div id="author">
            <span id="time" v-show="!loading">{{ extra_info.poetry_time }}</span>
            <span>{{ poetry_data.author }}</span>
        </div>
        <div id="para">
            <p
                v-for="paragraph in poetry_data.paragraphs"
                :key="paragraph"
                @click="select"
            >
                {{ paragraph }}
            </p>
        </div>
    </div>
</template>
<script>
import { get_poetry_data_by_uid } from "@liuxsdev/poetry";
import TitleBar from "./TitleBar.vue";
import { Share16Regular } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { ff, updateStatus } from "../utils/ff.js";
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
        };
    },
    components: {
        TitleBar,
        Share16Regular,
        Icon,
    },
    computed: {
        fontButtonColor: function () {
            return this.font_is_active ? "green" : "#9a9a9a";
        },
    },
    methods: {
        font_toggle: function (value) {
            this.font_is_active = value;
        },
        select: function (event) {
            const selDOM = event.target;
            if (selDOM.getAttribute("class") != "sele_para") {
                selDOM.setAttribute("class", "sele_para");
            } else {
                selDOM.setAttribute("class", "");
            }
        },
        share: async function () {
            const para = document.getElementsByClassName("sele_para");
            var selected_para = "";
            for (let i = 0; i < para.length; i++) {
                selected_para += para[i].innerText;
            }
            const poetry_time = this.extra_info.poetry_time;
            const author = this.poetry_data.author;
            const title = this.poetry_data.rhythmic || this.poetry_data.title;
            const share_msg = `${selected_para}——﹝${poetry_time}﹞${author}《${title}》`;
            console.log(share_msg);

            // const oauthToken = localStorage.getItem("oauthToken");
            // const oauthTokenSecret = localStorage.getItem("oauthTokenSecret");
            // if (oauthToken && oauthTokenSecret) {
            //     ff.oauthToken = oauthToken;
            //     ff.oauthTokenSecret = oauthTokenSecret;
            // }
            // const status = await updateStatus(ff, share_msg);
            // console.log(status);
            /** TODO
             * 选择诗句
             * 组成分享 XXXX  ——﹝宋﹞王之道《西江月》
             * 弹出窗口
             * 确认发送
             *
             */
        },
    },
    async created() {
        set_data(this.id, this);
        this.$watch(
            () => this.$route.params,
            async (toParams) => {
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

.sele_para {
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

div#title {
    margin-top: 1.5em;
    margin-bottom: 1em;
}

span.shareicon {
    margin-left: 0.5em;
    cursor: pointer;
}
span.share svg:hover {
    color: #ff5722;
    font-weight: 600;
}
</style>
