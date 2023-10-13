const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

//REGISTER
router.post("/register", async (req, res) => {
 
try{
  const {firstName, lastName, email, password, date_Birth}= req.body
  if(firstName == ""|| lastName == "" || email =="" || password == "") {
      res.status(401)
      json({message: "Input empty"})
  }
  if (!/^[a-zA-Z]+$/.test(firstName)){
        res.status(401)
            .json({ message: "Invalid name entered"
    })
    }else if (!/^[a-zA-Z]+$/.test(lastName)){
        res.status(401)
            .json({message: "Invalid name entered"
    })

    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){  
        res.status(401)
            .json({message: "Invalid email entered"})
    
     } else if (password.length<8){
         res.status(401)
             .json({message: "Password is too short!"
     })
     }else if(password.length >16){  
         res.status(401)
            .json({message: "Password is too long!"})
    }else if (!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/.test(password)){
        res.status(401).json({message:"incorrect"})
    } else{
  let user = await User.findOne({email:req.body.email})
  if (user) return res.status(400).send({message: 'Email Already Used!'})

  const hashedPass = await bcrypt.hash(password, 10);

        user = new User({
                    firstName, 
                    lastName,
                    email, 
                    date_Birth,
                    password: hashedPass,

                    });
        await user.save()
        res.status(200).json(user)
    }

}catch(err){
      res.status(500).json(err)
}

})

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    if(!user) res.status(404).json({message:"email not found "})
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).json({
                    message: "Login not successful",
                  })
            }else{
               res.status(200).json(user)
            
            }
    } catch (err) {
        res.status(500)
            .json(err)
  }
});

//Update User

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });
  

//Delete User
router.delete('/delete/:id', async (req, res) =>{
   
    try {
      const delete_User = await User.findByIdAndDelete(req.params.id)
              if(!delete_User)
                 return  res.status(404).json({ 
                   success :false,
                   message : `Cannot Delete with id Maybe id is not found`})
              
              
              res.status(200).send({message : "User deleted"})
      }catch { err =>{
          return  res.status(500).send({ err, message : `Erro`})
    
      }}
  })
  

module.exports = router;