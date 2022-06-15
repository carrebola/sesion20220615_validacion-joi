const express = require('express')
const joi = require('joi')

app = express()
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res)=>{
    res.json({
        mensaje: 'estas en la raiz '
    })
})

//creamos una ruta con función callback que valida los datos pasados en el body
app.post('/validacion', async (req, res)=>{
    try {
        //capturamos los datos del body
        const datos = req.body
        console.log(datos);
        
        //creamos el esquema de validación
        const schema = joi.object({
            user: joi
                .string() //user será de tipo strin
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            pass: joi
                .string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })
        //intentamos validar los datos mediante el esquema
        const value = await schema.validateAsync(datos);
        //si no hay error de validación mostramos el mensaje de ok
        res.json({
            error: '',
            datos,
            mensaje: 'validación correcta '
        })
    } catch (error) {
        //si la validación ha disparado un error mostramos el error
        res.json({
            error,
            mensaje: 'Se ha producido un error de validación: '
        })
    }
})

app.listen(8000 , ()=>{
    console.log('Escuchando en 8000');
})

