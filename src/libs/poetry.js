import axios from "axios";
import { randomNum } from './util'


//随机uid
function get_random_uid() {
    // 1：全唐诗 57611
    // 2：全宋诗 254247
    // 3：全宋词 21052
    var random_type = randomNum(1, 3);
    switch (random_type) {
        case 1:
            return `${random_type}${randomNum(1, 57611)}`;
        case 2:
            return `${random_type}${randomNum(1, 254247)}`;
        case 3:
            return `${random_type}${randomNum(1, 21052)}`;
        default:
            return "37227";
    }
}

//uid解析
function parse_uid(uid) {
    var len = uid.length;
    var type = parseInt(uid[0]);
    var type_string = [0, "tang", "song", "ci"][type];
    var collection = ["", "全唐诗", "全宋诗", "全宋词"][type];
    var poetry_time = ["", "唐", "宋", "宋"][type];
    var id = parseInt(uid.slice(1, len));
    return {
        type,
        id,
        type_string,
        collection,
        poetry_time,
    };
}

//获取数据
async function get_poetry(type, id) {
    var url = "https://m38cryeg.lc-cn-e1-shared.com/1.1/classes/" + type;
    var headers = {
        "X-LC-Id": "M38cryEGk6U4mdqxSWWxOTTA-9Nh9j0Va",
        "X-LC-Key": "Ds0CwcsECyqLCTKRJJNnk5nN",
        "Content-Type": "application/json",
    };
    var axios_config = {
        method: "get",
        url,
        headers,
        params: {
            where: { id },
        },
    };
    return await axios(axios_config);
}

export { get_random_uid, get_poetry, parse_uid }