module.exports = async (req, res) => {  
        console.log(req.file)
        const track = req.file.location
        if (track === undefined) {
         return res.status(400).send({message:"no image"})
       }
        return res.status(201).send({ track_url: track })
}
     