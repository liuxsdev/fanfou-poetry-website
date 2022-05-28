<template>
    <div class="title-bar">
        <div class="control">
            <div class="user">
                <span v-if="!isLogined">
                    <span @click="goAuth">登录</span>
                </span>
                <p v-else>
                    <img class="useravatar" v-bind:src="userinfo.avatar" alt="" />
                    <span>{{ userinfo.name }}</span>
                    <span @click="logout">退出</span>
                </p>
            </div>

            <span @click="pre" title="上一首">
                <Icon :color="ctrl_bottom_color"><AngleLeft /></Icon>
            </span>
            <span @click="next" title="下一首">
                <Icon :color="ctrl_bottom_color"><AngleRight /></Icon>
            </span>
            <span @click="random" title="随机">
                <Icon :color="ctrl_bottom_color"><ArrowSync12Regular /></Icon>
            </span>
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
import { TextFont20Filled, ArrowSync12Regular } from "@vicons/fluent";
import { Github, AngleLeft, AngleRight } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import queryString from "query-string";
import { get_random_uid } from "@liuxsdev/poetry";
import { ff, getUserInfo } from "../utils/ff.js";

function get_uid_from_href(href) {
    const host = href.split("#/")[0];
    const uid = href.split("#/")[1];
    return `${host}?uid=${uid}`;
}

export default {
    name: "TitleBar",
    components: {
        TextFont20Filled,
        Icon,
        Github,
        AngleLeft,
        AngleRight,
        ArrowSync12Regular,
    },
    data() {
        return {
            font_is_active:
                localStorage.getItem("font_is_active") == "true" ? true : false,
            ctrl_bottom_color: "#383838",
            isLogined: localStorage.getItem("isLogined") == "true" ? true : false,
            userinfo: {},
        };
    },
    computed: {
        fontButtonColor: function () {
            return this.font_is_active ? "green" : "#9a9a9a";
        },
    },
    async created() {
        const _this = this;
        // 如果有search参数，说明刚从饭否认证页面返回
        // 设置uid为登录前的uid
        // 存储oauth_token到localStorage
        if (location.search) {
            const parsed = queryString.parse(location.search);
            console.log(parsed);
            const { oauth_token: oauthToken } = parsed;
            localStorage.setItem("oauthToken", parsed.oauth_token);

            // 获取oauth_token_secret
            const oauthTokenSecret = localStorage.getItem("requestTokenSecret");
            if (oauthTokenSecret) {
                const result = await ff.getAccessToken({ oauthToken, oauthTokenSecret });
                console.log(result);
                localStorage.setItem("oauthToken", result.oauthToken);
                localStorage.setItem("oauthTokenSecret", result.oauthTokenSecret);
                localStorage.removeItem("requestTokenSecret");
            }
            // 跳转到登录前的首页
            const host = location.href.split("?")[0];
            location.replace(host + "#/" + parsed.uid);
        }
        const oauthToken = localStorage.getItem("oauthToken");
        const oauthTokenSecret = localStorage.getItem("oauthTokenSecret");
        if (oauthToken && oauthTokenSecret) {
            console.log("已经登录");
            ff.oauthToken = oauthToken;
            ff.oauthTokenSecret = oauthTokenSecret;
            _this.userinfo = await getUserInfo(ff);
            _this.isLogined = true;
            localStorage.setItem("isLogined", true);
        }
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
        random: function () {
            let uid = get_random_uid();
            location.hash = "#/" + uid;
        },
        next: function () {
            if (location.hash != "#/") {
                let num = parseInt(location.hash.split("/")[1]);
                location.hash = "#/" + (num + 1);
            }
        },
        pre: function () {
            if (location.hash != "#/") {
                let num = parseInt(location.hash.split("/")[1]);
                location.hash = "#/" + (num - 1);
            }
        },
        goAuth: async function () {
            // 生成未授权的requestToken，并存储到localStorage
            const result = await ff.getRequestToken();
            localStorage.setItem("requestTokenSecret", result.oauthTokenSecret);
            // 跳转到授权页面, 并获取oauthToken
            const callback_url = get_uid_from_href(window.location.href);
            window.location.replace(
                `https://fanfou.com/oauth/authorize?oauth_token=${result.oauthToken}&oauth_callback=${callback_url}`
            );
        },
        logout: function () {
            localStorage.setItem("isLogined", false);
            localStorage.removeItem("oauthToken");
            localStorage.removeItem("oauthTokenSecret");
            location.reload();
        },
    },
};
</script>
<style scoped>
.hidden {
    display: none;
}

span {
    cursor: pointer;
    margin-right: 0.2em;
}

span a {
    color: #1b1d1d;
    text-decoration: none;
}

div.control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
}

img.useravatar {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-right: 0.5em;
}

div.user p {
    margin: 0;
}
</style>
