const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async(req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error:"Nenhum token foi enviado"});
    }

    const [scheme, token] = authHeader.split(" ");

    try{
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

        req.userId = decoded.id;

        return next();
    }catch(err){
        return res.status(401).send({error: "Token Invalido"});
    }
}