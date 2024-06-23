const crypto = require("crypto");
// passphrase: process.env.CRYPTO_PASS,
const cripto = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: process.env.CRYPTO_PASS,
    }
  });

  return { publicKey, privateKey }
};

module.exports = { cripto };