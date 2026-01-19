const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://imgs.search.brave.com/jV-zvG52KWzQJOcH8BD1kKuZxKWoLwMfnCQF4RGibNg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/NjE5LzE0Mi9zbWFs/bC9kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tb2Ytc29j/aWFsLW1lZGlhLXVz/ZXItcGhvdG8taW1h/Z2UtdmVjdG9yLmpw/Zw"}
},{
    timestamps:true
})


userSchema.methods.matchPassword = async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.pre("save",async function (next) {
    if(!this.isModified){
        next();
    }

    this.password =await bcrypt.hash(this.password,10)
})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel