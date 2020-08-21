const fs = require('fs');

const Post = require('../Models/movie');

module.exports ={
  async index(req, res){
    const posts = await Post.find();
    return res.json(posts);
  },
  stream(req, res){
    const path = `assets/${req.params.key}`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  },
  async create(req, res){
    console.log(req.body, req.files);
    const post = await Post.create({
      sname: req.body.nome,
      desc: req.body.desc,
      vname: req.files['video'][0].originalname,
      cname: req.files['capa'][0].originalname,
      vsize: req.files['video'][0].size,
      csize: req.files['capa'][0].size,
      vkey:req.files['video'][0].key,
      ckey:req.files['capa'][0].key,
      vurl:'',
      curl:'',
  });

  return res.json(post);
  },
  async delete(req,res){
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  }
}