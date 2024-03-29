import api from "./api";

const LAYER = 152;
const tlobjects = {};

for (const tl of Object.values(api)) {
    if (tl.CONSTRUCTOR_ID) {
        tlobjects[tl.CONSTRUCTOR_ID] = tl;
    } else {
        for (const sub of Object.values(tl)) {
            tlobjects[sub.CONSTRUCTOR_ID] = sub;
        }
    }
}

export default {
    LAYER,
    tlobjects,
};
