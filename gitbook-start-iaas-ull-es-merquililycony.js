
    function initialize (){// Inicialize del plugin deploy-iaas-ull
        
        // var exec_ssh = require('simple-ssh');
        var sshexec = require('ssh-exec');
        var path = require('path');
        var dir = process.cwd() + '/';
        var r = path.join(__dirname, 'gulpfile.js')//ruta
        var dato = require(dir + "package.json");
        var fs = require('fs-extra');
        var scp_ = require('scp');//Send a file to a remote host (in your ~/.ssh/config)

        // var datos = {
        // 	file: 'iaas.pub',
        // 	user: dato.iaas.user,
        //     host: dato.iaas.ip,
        //     port: '22',
        //     path: '~/.ssh/' 
        // }

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
  
  // sshexec("ssh " + dato.iaas.user + "@" + dato.iaas.ip + "");
   


};

function deploy() {
        

        console.log("Empezando el despliegue...");
        
        var dir = process.cwd() + '/';
        var dato = require(dir + "package.json");
        var ssh_exec = require('ssh-exec');
        var fs = require('fs-extra');
        var aux = require('scp2');
        // var url = 'https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-merquililycony.git'
        
        aux.scp('gh-pages/', 'usuario:esperanza@10.6.128.168:/home/usuario/src/sytw/gitbook-start-iaas-ull/gh-pages', function(err) {});
   		aux.scp('app.js', 'usuario:esperanza@10.6.128.168:/home/usuario/src/sytw/gitbook-start-iaas-ull', function(err) {});
  		//client.scp('package.json', 'usuario:esperanza@10.6.128.168:/home/src/sytw/', function(err) {});
    	ssh_exec('cd /home/usuario/src/sytw/gitbook-star t-iaas-ull ; npm install express; npm install express-ejs-layouts; node app.js', 'usuario@10.6.128.168').pipe(process.stdout);



        // Hacemos clone del repositorio
        console.log("Clonando repositorio...")
        exec_ssh('cd '+dato.iaas.ruta+';git clone'+url+'',{
            user: dato.iaas.user,
            host: dato.iaas.ip,
            key: '~/.ssh/id_dsa.pub'
        },function(err){
            if(err){
                console.log("Error al clonar")
            }

    });
                  
};


exports.initialize = initialize;
exports.deploy = deploy;
