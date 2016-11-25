
const path = require('path');
const fs = require('fs-extra');

// var scp_ = require('scp');//Send a file to a remote host (in your ~/.ssh/config)

    function initialize (){// Inicialize del plugin deploy-iaas-ull
        
        var exec_ssh = require('ssh-exec');
        var dir = process.cwd() + '/';
        var r = path.join(__dirname, 'gulpfile.js')//ruta
        var dato = require(dir + "package.json");

        var task = '\ngulp.task("deploy-ull-iaas-es", function () {'+ 
        '\n\tvar iaas = require("gitbook-start-iaas-ull-es-merquililycony");'+
        '\n\tvar result = iaas.deploy();'+
        '\n});\n\n';


        // Leemos fichero gulpfile que esta dentro del directorio
        
       fs.readFile(dir + 'gulpfile.js',"utf-8",function(err,data) {
            if(err) throw err;
            if(data.search("deploy-ull-iaas-es") != -1){
                console.log("Tarea encontrada!")
            }else{
                    fs.writeFileSync(path.resolve(process.cwd(),'gulpfile.js'), task,  {'flag':'a'},  function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
            }


       });
            
        
      //    // Creamos el fichero con la clave publica
        
      //   exec_ssh("ssh-keygen -f iaas");
        
        
        
      //   scp_.send(datos, (err) => {
      //     if (err) 
      //       throw err;
      //     else
      //     {
      //       exec_ssh("ssh-copy-id -i iaas " + user + "@" + ip);//añadiendo clave a fichero 
      //       exec_ssh("mv iaas ~/.ssh; mv iaas.pub ~/.ssh",(err) => {
      //           if(err){
      //               throw err;
      //           }else{
      //               console.log("Tranferencia de archivo iaas.pub a la maquina IAAS realizada correctamente")
      //           }
            
      //       }); 
      //     }
      //   });
        
            
      // exec_ssh('cd'+route+ ';git clone' + url+ '',{
      //     user: user,
      //     host: ip,
      //     key: '~/.ssh/iaas.pub'
      //   }, reply);
        
        
};

function deploy() {
        

        console.log("Empezando el despliegue...");
        
        var dir = process.cwd() + '/';
        var dato = require(dir + "package.jason");
        var exec_ssh = require('ssh-exec');
        var fs = require('fs-extra');
        var url = 'https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-merquililycony.git'
        
            // // Hacemos clone del repositorio
        exec_ssh('cd '+dato.iaas.ruta+';git clone'+url+'',{
            user: dato.iaas.user,
            host: dato.iaas.ip,
            key: 'fs.readFileSync(`${process.env.HOME}/.ssh/id_rsa`)'
        },function(err){
            if(err){
                console.log("Hacemos un pull al repositorio.")
                exec_ssh('cd '+dato.iaas.ruta+';git pull',{
                    user: dato.iaas.user,
                    host: dato.iaas.ip,
                    key: 'fs.readFileSync(`${process.env.HOME}/.ssh/id_rsa`)'
                });
            }


    });
                  
};


exports.initialize = initialize;
exports.deploy = deploy;
