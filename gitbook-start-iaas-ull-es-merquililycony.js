
    function initialize (){// Inicialize del plugin deploy-iaas-ull
        
        var exec_ssh = require('ssh-exec');
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
            port: '8080',
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
            
        
        
	require('shelljs/global');
	exec_ssh("npm install gitbook-start-iaas-ull-es-merquililycony --save");

	//       var pck = require("./package.json");

	//         exec("rm iaas*; cd ~/.ssh; rm iaas*", function(code, stdout, stderr) {
	//            	if(stderr){
	//              console.log("Creando claves");          
	//         	}
	//        });

	console.log("Creamos el fichero con la clave publica")
    exec_ssh("ssh-keygen -f iaas");      
    console.log("Introduzca la clave para configurar la clave authorized_keys \n");
    exec_ssh("ssh-copy-id -i iaas " + dato.iaas.user + "@" + dato.iaas.ip);//añadiendo clave a fichero 

    
 //      exec("ssh-copy-id -i iaas " + pck.iaas.user + "@" + pck.iaas.ip);
 //      console.log("Clave añadida al fichero authorized_keys\n");


        // scp_.send(datos, function(err) {
        //   if (err) 
        //     console.log("ERROR2");
        //   else
        //   {
        //     exec_ssh("ssh-copy-id -i iaas " + dato.iaas.user + "@" + dato.iaas.ip);//añadiendo clave a fichero 
        //     exec_ssh("mv iaas ~/.ssh; mv iaas.pub ~/.ssh",function(err) {
        //         if(err)
        //             console.log("Error con las claves");
        //         else{
        //             console.log("Tranferencia de archivo iaas.pub a la maquina IAAS realizada correctamente")
        //         }
            
        //     }); 
        //   }
        // });
         
        
};

function deploy() {
        

        console.log("Empezando el despliegue...");
        
        var dir = process.cwd() + '/';
        var dato = require(dir + "package.json");
        var exec_ssh = require('ssh-exec');
        var fs = require('fs-extra');
        var url = 'https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-merquililycony.git'
        
            // // Hacemos clone del repositorio
        exec_ssh('cd '+dato.iaas.ruta+';git clone'+url+'',{
            user: dato.iaas.user,
            host: dato.iaas.ip,
            key: '~/.ssh/iaas.pub'
        },function(err){
            if(err){
                console.log("Error al clonar")
            }


    });
                  
};


exports.initialize = initialize;
exports.deploy = deploy;
