import { IGE as AESIGE } from "@cryptography/aes";
import Helpers from "../Helpers";

class IGENEW {
    constructor(key, iv) {
        this.ige = new AESIGE(key, iv);
    }

    /**
     * Decrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
     * @param cipherText {Buffer}
     * @returns {Buffer}
     */
    decryptIge(cipherText) {
        return Helpers.convertToLittle(this.ige.decrypt(cipherText));
    }

    /**
     * Encrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
     * @param plainText {Buffer}
     * @returns {Buffer}
     */
    encryptIge(plainText) {
        const padding = plainText.length % 16;
        if (padding) {
            plainText = Buffer.concat([plainText, Helpers.generateRandomBytes(16 - padding)]);
        }

        return Helpers.convertToLittle(this.ige.encrypt(plainText));
    }
}

export default IGENEW;
