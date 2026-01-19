    const clodinary = require('cloudinary').v2

    clodinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_KEY,
        api_secret:process.env.CLOUD_SECRET,
    })

    const uploadfile = async (file) => {      
        return new Promise((res,rej) => {
            const uploadStream = clodinary.uploader.upload_stream(
                {
                    folder:"chat_Application",
                    public_id:Date.now().toString(),
                    resource_type:"auto"
                },
                (error,result) => {
                    if(error){
                        console.error("Cloudinary error",error);
                        rej(error)   
                    }else{
                        console.log("cloudinar result",result.secure_url);
                        res(result)
                    }
                }
            )
            uploadStream.end(file.buffer)
        })
    }

    module.exports = uploadfile