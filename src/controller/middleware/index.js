const { verifySignature } = require("../../utils");

module.exports.LoginAuth=async(req,res,next)=>{
    const authorization = req.headers['authorization'];
   
    if (!authorization) {
        return res.send(401).send({'message':"unauthorize"});
    }
    const token = authorization.split(' ')[1];
    console.log(token);
    const verifyToken = await verifySignature(token);
    if(verifyToken){
        next()
    }
    return res.send(403).send({'message':"unauthorize"})
}

module.exports.validateOthers= async(req,res,next)=>{
    let {name,pancard,number} = req.body;
    number = number.toString();
    let pattern =  /^([A-Z]){3}(C|P|H|F|A|T|B|L|J|G){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/;
    
    if(!name || name.length<=3 || !pancard || !number || pancard.length<10 || number.length<10 || !pattern.test(pancard)){
        return res.status(400).send({message:"wrong data"});
    }
   next();
} 