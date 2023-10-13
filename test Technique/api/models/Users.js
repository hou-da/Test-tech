const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
  
    firstName :{
      type :String,
      required: true,
      minlength: 3,
      maxlength: 50,
  },
  lastName :{
      type :String,
      required: true,
      minlength: 3,
      maxlength: 50,
  },

  email :{
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      
  },
  date_Birth:{
    type: String,
  }, 
  password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
  },
  
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", UserSchema);
