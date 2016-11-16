const exec_ssh = require('ssh-exec');
const fs = require('fs-extra');
const path = require('path');
const gitUrlParse = require("git-url-parse");
var scp_ = require('scp');//Send a file to a remote host (in your ~/.ssh/config)






function reply (stdout,stderr,error){
    if(error){
        console.error("Se ha producido un error:"+error);
        console.log("Stdout:"+stdout);
        console.log("Stderr:"+stderr);
    }
};


function initialize(ip,user,url,route){
    
    
    var dir = process.cwd() + '/';
    var r = path.join(__dirname, 'gulpfile.js')
    var datos = {
        user: user,
        host: ip,
        file: 'iaas.pub',
        path: '~/.ssh/'
    }
    
    // console.log("Leemos fichero gulpfile que esta dentro del directorio dir")
    
    
   fs.readFile(dir + 'gulpfile.js',"utf-8", (err,data) => {
        if(err)  throw err;
        
        if(data.find("deploy-iaas-ull") != -1){
            
            console.log("La tarea ya está creada")
            
        }else{//en el caso de que no
            fs.readFile(r,function(err,data){
                if (err)
                    throw err;
                    
                fs.appendFile(dir +'gulpfile.js', data, (err) => {
                    if (err) 
                        throw err;
            
                });
            });
        } 
    });
    
    
    
    // exec_ssh("rm iaas*; cd ~/.ssh; rm iaas*", function(code, stdout, stderr) {
    //     if(stderr){
    //       console.log("Eliminando");          
    //     }
    // });
    
    // console.log("Creamos el fichero con la clave publica")
    
    exec_ssh("ssh-keygen -f iaas");
    
    scp_.send(datos, (err) => {
      if (err) console.log(err);
      else
      {
        exec_ssh("mv iaas ~/.ssh; mv iaas.pub ~/.ssh",function(err){
            if(err){
                console.log(err);
            }else{
                
                console.log("Tranferencia de archivo iaas.pub a la maquina IAAS realizada correctamente")
            }
        
        }); 
      }
    });
    
    
    exec_ssh('cd'+route+ ';git clone' + url+ '', {
      user: user,
      host: ip,
      key: '~/.ssh/iaas.pub'
    }, reply);
    
};  



function deploy (ip,user,url,route){
    
    var doc = gitUrlParse(url);
    
    console.log("Iniciando despliegue en Iaas...");
    console.log('Direccion IP : '+ip);
    console.log('Usuario : '+user);
    console.log('Url : '+url);
    console.log('Ruta : '+route+'/'+doc.name);
    
    
    // console.log('Hacemos pull del repositorio');
    
    exec_ssh('cd '+route+'/'+doc.name+';git pull',{
        user: user,
        host: ip,
        key: '~/.ssh/iaas.pub'
    },reply); 
    
};


module.exports = {
  initialize,
  reply,
  deploy
}
