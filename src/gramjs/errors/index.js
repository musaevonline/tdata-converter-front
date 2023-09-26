/**
 * Converts a Telegram's RPC Error to a Python error.
 * @param rpcError the RPCError instance
 * @param request the request that caused this error
 * @constructor the RPCError as a Python exception that represents this error
 */
import { RPCError } from "./RPCBaseErrors";
import { rpcErrorRe } from "./RPCErrorList";

function RPCMessageToError(rpcError, request) {
    for (const [msgRegex, Cls] of rpcErrorRe) {
        const m = rpcError.errorMessage.match(msgRegex);
        if (m) {
            const capture = m.length === 2 ? parseInt(m[1], 10) : undefined;
            return new Cls({
                request,
                capture,
            });
        }
    }

    return new RPCError(rpcError.errorMessage, request);
}

import Common from "./Common";
import RPCBaseErrors from "./RPCBaseErrors";
import RPCErrorList from "./RPCErrorList";

export default {
    RPCMessageToError,
    ...Common,
    ...RPCBaseErrors,
    ...RPCErrorList,
};

export {
    ReadCancelledError,
    TypeNotFoundError,
    InvalidChecksumError,
    InvalidBufferError,
    SecurityError,
    CdnFileTamperedError,
    BadMessageError,
} from './Common'
export {
    RPCError,
    InvalidDCError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    AuthKeyError,
    FloodError,
    ServerError,
    TimedOutError,
} from './RPCBaseErrors'
export {
    rpcErrorRe,
    FileMigrateError,
    FloodTestPhoneWaitError,
    FloodWaitError,
    PhoneMigrateError,
    SlowModeWaitError,
    UserMigrateError,
    NetworkMigrateError,
    MsgWaitError,
    EmailUnconfirmedError,
} from './RPCErrorList'