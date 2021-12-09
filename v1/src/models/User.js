const mongoose = require("mongoose"); // Erase if already required
const CryptoJS = require("crypto-js");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function () {
  this.password = CryptoJS.AES.encrypt(this.password, "myHashKey").toString();
});

userSchema.statics.login = async function (userData) {
  //console.log("user login", userData);
  //o username'e göre db'de aramaa yapıyorum
  const { username, password } = userData;
  const user = await this.findOne({ username });
  //console.log(user);
  //varsa
  if (user) {
    //şifreleri crypt ile karşılaştırıyorum
    const bytes = CryptoJS.AES.decrypt(user.password, "myHashKey");
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(`originalText`, originalText);
    //true dönerse user'ı döndürüyorum
    if (originalText === password) {
      return user;
    } else {
      return "Parola hatalı";
    }
  } else {
    return "Kullanıcı bulunamadı.";
  }
};

//Export the model
module.exports = mongoose.model("User", userSchema);
