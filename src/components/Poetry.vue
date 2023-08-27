<template>
  <div class="poetry text-base pb-8" :class="{ custom_fonts: font_is_active }">
    <p v-show="loading">Loading</p>
    <div id="heade" class="flex items-center flex-wrap absolute top-4 left-0 w-full">
      <div id="info" class="grow shrink-0 text-left pl-4 text-gray-600 text-sm" v-show="!loading">
        {{ extra_info.type }} {{ extra_info.collection }} / {{ poetry_data.author }} /
        <span class="hidden">{{ poetry_data.rhythmic || poetry_data.title }}</span>
        <span class="mx-1 hidden">/</span>
        <span class="hidden">{{ extra_info.id }}</span>
      </div>
      <TitleBar @font_click="font_toggle"></TitleBar>
    </div>
    <div
      id="title"
      class="font-bold text-2xl mt-8 mb-4 sm:text-4xl font-serif text-ellipsis overflow-hidden hover:text-clip"
    >
      <div>
        <span v-if="!poetry_data.rhythmic">{{ poetry_data.title }}</span>
        <span>{{ poetry_data.rhythmic }}</span>
        <span class="shareicon hidden">
          <Icon color="#32323287" @click="share" size="20" class="share"><Share16Regular /></Icon>
        </span>
      </div>
    </div>
    <div id="author" class="text-base font-serif sm:text-xl">
      <span id="time" class="text-gray-100 bg-red-800 sm:p-1 rounded-md mr-2 px-1 py-0.5" v-show="!loading">{{
        extra_info.poetry_time
      }}</span>
      <span>{{ poetry_data.author }}</span>
    </div>
    <div id="para" class="text-lg sm:text-3xl font-serif">
      <p v-for="paragraph in poetry_data.paragraphs" :key="paragraph" @click="select">
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
      font_is_active: localStorage.getItem("font_is_active") == "true" ? true : false,
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
      const website = "https://poetry.liuxs.pro/" + location.hash;
      const share_msg = `${selected_para}——﹝${poetry_time}﹞${author}《${title}》 ${website}`;
      if (selected_para.length > 0) {
        if (localStorage.getItem("isLogined") == "true") {
          const r = confirm(`是否发送？\n\n${share_msg}`);
          if (r == true) {
            console.log("发送");
            const oauthToken = localStorage.getItem("oauthToken");
            const oauthTokenSecret = localStorage.getItem("oauthTokenSecret");
            if (oauthToken && oauthTokenSecret) {
              ff.oauthToken = oauthToken;
              ff.oauthTokenSecret = oauthTokenSecret;
              try {
                const status = await updateStatus(ff, share_msg);
                console.log(status);
                alert("发送成功");
              } catch (error) {
                alert("发送失败");
              }
            }
          }
        }
      }
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
.float {
  float: left;
  margin-right: 0.5em;
}

#para p {
  margin: 0.8em;
  cursor: pointer;
}

.sele_para {
  color: #ff5722;
  font-weight: 600;
}

/* @font-face {
  font-family: FZXJL;
  src: url("../assets/fonts/FZXJL.woff2");
} */

/* .custom_fonts {
  font-family: "FZXJL", "汉仪楷体", "楷体", sans-serif;
} */

/* div#title {
  margin-top: 4em;
  margin-bottom: 1em;
} */

/* span.shareicon {
  margin-left: 0.5em;
  cursor: pointer;
}
span.share svg:hover {
  color: #ff5722;
  font-weight: 600;
} */
</style>
