const crypto = require("crypto");
const criptoModel = require("../models/cripto.model");

const cripto = async () => {
  console.log("Executando função cripto...");
  // contornando o serveless armazenando temporariamente as chaves no banco
  try {
    // função principal
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

    async function saveNewCripto() {
      return criptoModel.deleteMany({}).then(() => {
        return new criptoModel({
          publicKey: publicKey,
          privateKey: privateKey,
          createdAt: new Date(),
        }).save().then(result => {
          console.log("cripto criado.");
          return {publicKey: result.publicKey, privateKey: result.privateKey}
        }).catch(err => {
          if (err) throw new Error(err);
        });
      }).catch(err => {
        if (err) throw new Error(err);
      });
    }

    async function checkTimeAndAtt(cripto) {
      if ((new Date() - cripto[0].createdAt) > (60 * 60 * 1000)) {
        console.log("atualizando cripto...");
        return await saveNewCripto();
      } else if (!cripto[0].createdAt || !cripto[0].publicKey || !cripto[0].privateKey) {
        console.log("campos do cripto errados, recriando...");
        return await saveNewCripto();
      } else {
        return {publicKey: cripto[0].publicKey, privateKey: cripto[0].privateKey}
      }
    }

    return criptoModel.find().then(async result => {
      return result[0] ? await checkTimeAndAtt(result) : await saveNewCripto();
    }).catch(err => {
      console.log(err);
      if (err) throw new Error(err);
    });

  } catch (err) {
    console.log(err);
    console.log("ocorreu algum problema ao checar, apagar ou atualizar o cripto");
  }
};

module.exports = { cripto };