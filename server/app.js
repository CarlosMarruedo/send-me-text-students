// Your server here



const http = require('http')
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    
    var q = url.parse(req.url, true);
    var directi = q.pathname.split('/');
    
    if ( directi[1] == "sendtext" && req.method == 'GET') {
        var obj = q.query;
        console.log(obj)
        if(obj.filename == "" || obj.filename == null){
            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
            return res.end()
        }
        if(obj.content.length >= 1023){
          return res.end()
        }
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.access(`files/${obj.filename}.txt`, fs.F_OK, (err) => {
           
            if (err) {

              console.log("File does not exist.")
            } else {
              console.log("File exists.")
             
            }
            if(obj.content == "" || obj.content == null){
                obj.content = "";
            }
                fs.appendFile(`files/${obj.filename}.txt`, obj.content, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
          });
        return res.end();
    }
    
    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
    
    return res.end("");
})

server.listen(3000)