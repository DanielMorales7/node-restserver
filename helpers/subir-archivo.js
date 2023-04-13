import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','git'], carpeta='') =>{

    return new Promise((resolve, reject) => {
        
        const { archivo } = files;  // archivo: archivo que se subió
    
        const nombreShort = archivo.name.split('.');
    
        const extension = nombreShort[nombreShort.length-1];
    
        //Validar la extension
    
        if(!extensionesValidas.includes(extension)){
            
            return reject(`La extensión ${extension} no es permitida`);
        }
        
        const nombreTemp = uuidv4()+'.'+extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        
        // console.log(uploadPath);
     
        archivo.mv(uploadPath, (err) => {
            if (err) {
            return reject(err);
            } 
            // res.json({ msg: 'Archivo subido correctamente' + uploadPath });
            resolve(nombreTemp);
        });
    });

}

export {
    subirArchivo
}