import api from "./api";
import { serializeBytes, serializeDate } from "./generationHelpers";

export default {
    // TODO Refactor internal usages to always use `api`.
    constructors: api,
    requests: api,
    serializeBytes,
    serializeDate,
};

export {
    // TODO Refactor internal usages to always use `api`.
    api as constructors,
    api as requests,
    serializeBytes,
    serializeDate,
};
