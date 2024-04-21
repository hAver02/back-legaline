

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const casosSchema = new Schema({
    creador :{
      type : Schema.ObjectId,
      ref : 'Users'
    },
    tipo:{
      type : String,
      required : true,
      enum : ["judicial", "administrativo"]
    },
    nombre : {
        type : String, 
        required : true
    },
    apellido : {
        type : String,
        required : true,
        unique : true
    },
    documento : {
      type : Number,
      required : true
    },
    cuil : {
      type : Number,
      required : true
    },
    chat : {
        type : Schema.ObjectId,
        ref : 'Chats',
    },
    fechaNac : {
        type : Date,
        required : true
    },
    tipoJubilacion : {
      type: String,
      default : "Otra"
    },
    recoAnses : {
      type  : Boolean,
      default : false
    },
    recoIPS : {
      type  : Boolean,
      default : false
    },
    periodosTrabajados: [
        {
          lugar: {
            type: String,
            required: true
          },
          desde: {
            type: Date,
            required: true
          },
          hasta: {
            type: Date,
            required: true
          },
        },
      ],
    claves: [
      {
        nombre : {
          type : String,
          required : true
        },
        contraseña : {
          type : String,
          required : true
        },
      }
    ],
    alarmas : [{
      type : Schema.ObjectId,
      ref : 'notificaciones'
    }],
    autos : {
      type : String
    },
    juzgado : {
      type : String
    },
    fechaInicio : {
      type : Date
    } 
  
})

const casosModel = mongoose.model("casos", casosSchema)

module.exports = casosModel

