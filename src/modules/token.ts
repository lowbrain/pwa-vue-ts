const VERIFY_KEY: string = import.meta.env.VITE_APP_VERIFY_KEY;

function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function importRsaKey(pem: string) {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "").replace(/\n/g, "");
  console.log(pemContents);
  const binaryDerString = atob(pemContents);
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    true,
    ["verify"]
  );
}
const verify = async (data: ArrayBuffer, signature: ArrayBuffer): Promise<boolean> => {
  const key = await importRsaKey(VERIFY_KEY);
  return await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, signature, data);
};

export { verify };
