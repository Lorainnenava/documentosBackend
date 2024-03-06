export const toBase64 = (
    file: File
): Promise<void | null | ArrayBuffer | string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const base64ToArrayBuffer = (
    base64: string | void | ArrayBuffer | null
): ArrayBuffer => {
    let binaryString;
    if (typeof base64 === "string" && base64) {
        binaryString = window.atob(
            base64.substring(base64.indexOf("base64,") + 7, base64.length)
        );
        const len: number = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
    return new Uint8Array();
};
