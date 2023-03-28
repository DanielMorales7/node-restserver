import jwt from "jsonwebtoken";

const generarJWT = (uid = '') =>{

    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        // se firma el jwt con el payload, la keyword 
        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve (token);
            }
        })

    })

}

export { 
    generarJWT
}