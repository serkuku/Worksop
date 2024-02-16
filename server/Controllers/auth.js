const User = require('../Models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try{
        // console.log(req.body);
        //1.Check user exists
        const {username,password} = req.body
        var user = await User.findOne({username})
        if(user){
            return res.send('User already exists').status(400)
        }
        //2.Encrypt with bcryptjs
        const salt = await bcrypt.genSalt(10)
        user = new User({username,password})
        console.log(user.password);
        user.password = await bcrypt.hash(password,salt)
        //3.Save
        await user.save()
        res.send('Register success')
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}

exports.login = async(req,res)=>{
    try{
        //1. Check user
        const {username,password} = req.body
        var user = await User.findOneAndUpdate({username},{new:true})
        console.log(user);
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                console.log('Password incorrect');
                return res.send('Password incorrect').status(400)
                
            }
        //2.Payload
            var payload={
                user:{
                    username:user.username
                }
            }
        //3.Generate token
            jwt.sign(payload,'jwtsecret',{expiresIn:'1h'},(err,token)=>{
                if(err) throw err
                return res.json({token,payload,user})
            })
        }else{
            console.log('user not found');
            return res.send('User not found').status(400)
        }
    
    }
    catch(err){
        console.log(err);
        res.status(500)
        res.send('server error')
    }
}