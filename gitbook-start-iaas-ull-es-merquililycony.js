"use strict"

const exec_ssh = require('ssh-exec');
const fs = require('fs-extra');
const path = require('path');
const gitUrlParse = require("git-url-parse");
var doc = gitUrlParse()


var deploy = ((ip,user,url,route) => {
    
    var doc = gitUrlParse(url);
    console.log("Iniciando despliegue en Iaas");
    console.log('Direccion IP : '+ip);
    console.log('Usuario : '+user);
    console.log('Url : '+url);
    // console.log('Ruta : '+route'/'+doc.name)
    
    // // exec_ssh('cd')
   
    
    
});
