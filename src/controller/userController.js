const usermodel = require('../model/userSchema.js');
const { GeneratePassword, GenerateSignature, } = require('../utils/index.js');

 
module.exports={
    userSignup:async(req,res)=>{
        const {name,email,password,number,pancard,scores} = req.body;
        console.log(password);
        const hashedPassowrd = await GeneratePassword(password);
        try{
            let user = new usermodel({name,email,number,password:hashedPassowrd,pancard,scores});
            user.save();
            const token = await GenerateSignature(name,email,pancard);
            return res.status(201).json({token});

        }catch(error){
            console.log(`error in creation ${error}`);
            return res.status(500).send({"message":"Error in user creation"});

        }
        

    },
    userLogin:async(req,res)=>{
        const {email, password} = req.body;
        try{
            const user = await usermodel.findOne({email});
            if(!user){
                return res.status(403).send("Invalid Email or Password");
            }
            const validated = await ComparePassword(password,user.password);
            if(!validated) return res.status(403).send("Invalid Email or Password");
            return res.status(200).send({message:user});

        }catch(error){

        }

    },
    userList:async(req,res)=>{
        const {email} = req.body;
        try{
            const user = await usermodel.find();
            return res.status(200).send({user:user})  // will give array containing all user


        }catch(error){
            return res.status(400).send({message:"something went wrong"});

        }

    },
    userLeaderboard:async(req,res)=>{
        const {email} = req.body;
        try{
            const user = await usermodel.aggregate([{$group:{_id:"$name",totalsum:{$sum:"$scores"}}},{$sort:{"$totalsum":-1}}]);
            console.log(user);
            return res.status(200).send({leadershipboard:user})

        }catch(error){
            console.log(error);
            return res.status(400).send({'message':error.message})

        }

    }
}