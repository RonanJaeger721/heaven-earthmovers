const fs=require('node:fs'),path=require('node:path');
fs.mkdirSync('dist',{recursive:true});
for(const file of ['index.html','design.css','app.js'])fs.copyFileSync(file,path.join('dist',file));
fs.cpSync('assets','dist/assets',{recursive:true});
console.log('Built Haven Earthmovers static website.');
