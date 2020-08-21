const Schema = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports ={
    async register(req, res){
        try{
            // if(await Schema.findOne({ email })) return res.status(400).send({error: "Email já cadastrado!"})

            const user = await Schema.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

            console.log('Chegou na redefinição da senha');
            
            console.log(req.body);
            
            user.password = undefined;

            return res.send({ user });
            
        }catch(err){
            return res.status(400).send({error : "Falha ao realizar registro!"});
        }
    },
    async cadastro(req,res){
        const { email, username} = req.body;

        try{
            console.log('verificou o email')
            if(await Schema.findOne({ email })){
                return res.status(400).json({error:"Email já cadastrado"})
            }
            console.log('passou na verificação')
            
            console.log(req.body)

            const user = await Schema.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            return res.json({ user });
        }catch(err){
            return res.status(400).json({error:"Registro do usuario falhou!"});
        }
    },
    async auth(req, res){
        try{
            const {email, password} = req.body;
            const data = await Schema.findOne({email}) === null ? null : await Schema.findOne({email});

            if(data === null){
                return res.status(400).json({error: "Não conseguimos encontrar o seu email :("})
            }
            
            if(!await bcrypt.compare(password, data.password)){
                return res.status(400).json({error: "Parece que a sua senha está incorreta :("})
            }

            const token = await jwt.sign({id:data._id}, process.env.SECRET,{
                expiresIn:300
            });

            res.json({
                user: data,
                token: token
            })
        }catch(err){}
    }
}