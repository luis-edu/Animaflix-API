const routes = require('express').Router();
const multer = require('multer');
const multerConfig= require('./Config/multer')
const path = require('path')

const files = require('./Controllers/filecontroller');
const auth = require('./Controllers/authcontroller');

routes.post('/auth/register',auth.cadastro )
routes.post('/auth/login',auth.auth);
routes.use('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'..','/404.html'));
});


//Apartir deste ponto é necessario estar autenticado para acessar as rotas
routes.use(require('./Middlewares/auth'));

routes.get('/catalog',files.index);
routes.get('/stream/:key', files.stream);
routes.post('/create',multer(multerConfig).fields([{
    name: 'video', maxCount: 1
},{
    name: 'capa', maxCount:1
}]) ,files.create);
routes.delete('/create/:id', files.delete);



module.exports = routes;