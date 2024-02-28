const Product = require('../Models/Product')
const fs = require('fs')
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
        var data = req.body        
        if(req.file){
            data.file = req.file.filename
        }
        const product = await Product(data).save()
        res.send(product)
        console.log(product);
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
        const removed = await Product.findOneAndDelete({_id:id},req.body,{new:true}).exec()
        res.send(removed);
        console.log(removed);
        if(removed?.file){
            await fs.unlink('./uploads/' + removed.file,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('remove success');
            }
        })
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}