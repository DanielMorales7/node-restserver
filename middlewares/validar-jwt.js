import jwt from 'jsonwebtoken';

const validarJWT =(req, res , next)=>{

    const token = req.header('x-token');
    
    if(!token){

        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY); //verifica que el JWT sea válido.

        // req.ui = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        });
    }

}

export {validarJWT}