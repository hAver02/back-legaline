require('dotenv').config()

const config = {
    // env : process.env.NODE_ENV || "dev",

    // dbPort: process.env.PORT,
    // dbHost : process.env.DB_HOST,
    // dbName : process.env.DB_NAME,

    email : process.env.EMAIL,
    contraseñaEmail : process.env.PASSWORD_EMAIL,
    passwordMongo : process.env.PASSWORD_MONGO,
    hostDeploy : process.env.HOST_DEPLOY
    
}


module.exports = { config }