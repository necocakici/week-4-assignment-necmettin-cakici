const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

/*contactSchema.pre("save", function () {
  console.log("pre save");
  console.log(this);
});

contactSchema.post("save", (result) => {
  console.log(`result`, result);
});*/

//Export the model
module.exports = mongoose.model("Contact", contactSchema);
