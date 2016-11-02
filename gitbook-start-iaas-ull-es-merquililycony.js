const exec_ssh = require('ssh-exec');
const fs = require('fs-extra');
const path = require('path');
const gitUrlParse = require("git-url-parse");




function reply (stdout,stderr,error){
    if(error){
        console.error("Se ha producido un error:"+error);
        console.log("Stdout:"+stdout);
        console.log("Stderr:"+stderr);
    }
};


function initialize(ip,user,url,route){
    
    var dir = process.cwd() + '/';
    var doc = gitUrlParse(url);
    
    
    
   fs.readFile(dir + 'gulpfile.js',"utf-8",function(err,data) {
        if(err)
            throw err;
        if(data.search("deploy-iaas-ull-es") != -1){
            console.log("Ya existe!!")
        }else{ 
            
            fs.appendFile(dir +'gulpfile.js', data, function(err) {
                if (err) 
                    throw err;
            });
          
        } 
    });
        
        
        
         exec_ssh("ssh-keygen -f iaas");
    
    
};  

function deploy (ip,user,url,route){
    
    var doc = gitUrlParse(url);
    console.log("Iniciando despliegue en Iaas...");
    console.log('Direccion IP : '+ip);
    console.log('Usuario : '+user);
    console.log('Url : '+url);
    console.log('Ruta : '+route+'/'+doc.name);
    
    exec_ssh('cd '+route+';git pull '+url+' master',{
        user: user,
        host: ip,
        key: '~/.ssh/iaas.pub'
    },reply); 
    
};


module.exports = {
//   initialize,
  reply,
  deploy
}
