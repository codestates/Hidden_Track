const { sign, verify } = require("jsonwebtoken");

module.exports = {
    isAuthorized: (req) => {
        const authorization = req.headers["accesstoken"];
        console.log(authorization);
        if (!authorization) {
          return null;
        }
        const token = authorization;
        try {
          return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
          return null;
        }
    },
    generateAccessToken: (data) => {
      return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
    },

    generateRefreshToken: (data) => {
      return sign(data, process.env.REFRESH_SECRET, { expiresIn: "14d" });
    },
    sendRefreshToken: (res, refreshToken) => {
      res.cookie("refreshToken", refreshToken, {
        HttpOnly: true,
        Secure: false, //배포 환경에서는 true로.
        SameSite: "None", //배포환경에서는 hiddentrack만..
      });
    },

};