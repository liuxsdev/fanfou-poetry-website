import Fanfou from "fanfou-sdk-browser";
export const consumerKey = "30041d6601721fbba6d8c800ff2b0920";
export const consumerSecret = "ca9024f9921621bd3453950291624fdb";

const ff = new Fanfou({
    consumerKey,
    consumerSecret,
    apiDomain: "api.fanfou.com",
    oauthDomain: "fanfou.com",
    protocol: "https:",
    hooks: {
        baseString: (string) => string.replace("https", "http"),
    },
});

// https://github.com/FanfouAPI/FanFouAPIDoc/wiki/account.verify-credentials
// 检查用户名密码是否正确，作为登录的依据，返回用户信息和头像
async function getUserInfo(ff) {
    const user = await ff.get("/account/verify_credentials");
    const name = user["name"];
    const avatar = user["profile_image_origin_large"];
    return {
        name,
        avatar,
    };
}

async function updateStatus(ff, s) {
    const status = await ff.post("/statuses/update", { status: s });
    return status;
}

export { ff, getUserInfo, updateStatus };
