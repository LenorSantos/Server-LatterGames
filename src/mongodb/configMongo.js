const mongoose = require('mongoose');
require('dotenv/config');

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('\nConectado ao MongoDB com sucesso');
  } catch (error) {
      console.error('\nErro ao conectar ao MongoDB:', error);
  }
}

module.exports = { connectDB };