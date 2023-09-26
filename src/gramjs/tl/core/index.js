import TLMessage from "./TLMessage";
import RPCResult from "./RPCResult";
import MessageContainer from "./MessageContainer";
import GZIPPacked from "./GZIPPacked";

const coreObjects = {
    [RPCResult.CONSTRUCTOR_ID]: RPCResult,
    [GZIPPacked.CONSTRUCTOR_ID]: GZIPPacked,
    [MessageContainer.CONSTRUCTOR_ID]: MessageContainer,
};

export default {
    TLMessage,
    RPCResult,
    MessageContainer,
    GZIPPacked,
    coreObjects,
};
