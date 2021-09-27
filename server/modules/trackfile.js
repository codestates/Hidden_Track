const multer = require("multer")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const dotenv = require("dotenv")
dotenv.config()

aws.config.update({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.PASS,
  region: "ap-northeast-2",
})

const s3 = new aws.S3()

const trackfile = multer(
  {
    storage: multerS3({
      s3: s3,
      bucket: "hidden-track-bucket/trackfile",
      acl: "public-read",
      key: function (req, file, cb) {
        cb(null, Date.now() + "." + file.originalname.split(".").pop() ) // 이름 설정
      },
    }),
  },
  "NONE"
)

module.exports = trackfile
