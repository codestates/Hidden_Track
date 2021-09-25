module.exports =  {  
   
    post: async (req, res) =>{ 
        const image = req.file.location
        if (image === undefined) {
         return res.status(400).send({message:"no image"})
       }
        return res.status(201).send({ image_url: image })
    },
}
     