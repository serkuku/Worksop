const Product = require('../Models/Product')
exports.read = async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOne({_id:id}).exec()
        //res.send('Hello Product id:'+id+':'+JSON.stringify(req.body))
        res.send(product)
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}

exports.list = async(req,res)=>{
    try{
        const product = await Product.find({}).exec()
        res.send(product)
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}

exports.create = async(req,res)=>{
    try{
        console.log(req.body);
        const product = await Product(req.body).save()
        res.send(product)
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}

exports.update = async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true}).exec()
        res.send(product)
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}

exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const product = await Product.findOneAndDelete({_id:id},req.body,{new:true}).exec()
        res.send(product)
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}