
    function initialize (){// Inicialize del plugin deploy-iaas-ull
        
        var exec_ssh = require('simple-ssh');
        var exec_ssh2 = require('ssh-exec');
        var path = require('path');
        var dir = process.cwd() + '/';
        var r = path.join(__dirname, 'gulpfile.js')//ruta
        var dato = require(dir + "package.json");
        var fs = require('fs-extra');
        var scp_ = require('scp');//Send a file to a remote host (in your ~/.ssh/config)

        var datos = {
        	file: 'iaas.pub',
        	user: dato.iaas.user,
            host: dato.iaas.ip,
            port: '22',
            path: '~/.ssh/' 
        }

        var task = '\ngulp.task("deploy-ull-iaas-es", function () {'+ 
        '\n\tvar iaas = require("gitbook-start-iaas-ull-es-merquililycony");'+
        '\n\tvar result = iaas.deploy();'+
        '\n});\n\n';


        // Leemos fichero gulpfile que esta dentro del directorio
        
       fs.readFile(dir + 'gulpfile.js',"utf-8",function(err,data) {
            if(err) console.log("ERROR");
            if(data.search("deploy-ull-iaas-es") != -1){
                console.log("Tarea encontrada!")
            } else{
                    fs.writeFileSync(path.resolve(process.cwd(),'gulpfile.js'), task,  {'flag':'a'},  function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
            }
       });
  
     
};

function deploy() {
        

        console.log("Empezando el despliegue...");
        
        var dir = process.cwd() + '/';
        var dato = require(dir + "package.json");
        var exec_ssh = require('simple-ssh');
        var fs = require('fs-extra');
        var url = 'https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-merquililycony.git'
        
            // // Hacemos clone del repositorio
        exec_ssh('cd '+dato.iaas.ruta+';git clone'+url+'',{
            user: dato.iaas.user,
            host: dato.iaas.ip,
            // key: '~/.ssh/iaas.pub'
            agent: process.env.SSH_AUTH_SOCK,
            agentForward: true

        },function(err){
            if(err){
                console.log("Error al clonar")
            }


    });
                  
};


exports.initialize = initialize;
exports.deploy = deploy;
