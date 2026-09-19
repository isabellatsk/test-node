/*  
    Serve os arquivos do front-end (HTML/CSS/JS)
    Back-end leve (estático)
    Servidor porta 5000
*/


const http = require('http')    // importa o módulo nativo para criar servidor
const fs = require('fs')        // importa o módulo nativo para ler arquivos
const path = require('path')    // importa o módulo para lidar com caminhos de forma segura

http.createServer((req, res) => {
    // req = requisição que o navegador faz ao servidor
    // res = resposta que o servidor envia de volta ao navegador

    // O objeto req contém:
    // - req.url → a URL solicitada (ex: /index.html, /style.css)
    // - req.method → o método HTTP (ex: GET, POST)
    // - req.headers → cabeçalhos da requisição
    // - (em caso de POST, também pode ter corpo com dados)

    // O objeto res é usado para:
    // - escrever dados na resposta (res.write)
    // - definir cabeçalhos (res.writeHead)
    // - encerrar a resposta e enviar tudo (res.end)

    const file = req.url === '/' ? 'index.html' : req.url   // se acessar '/', mostra index.html
    const filePath = path.join(__dirname, 'public', file)   // monta o caminho completo do arquivo
    const extname = path.extname(filePath)                  // pega a extensão do arquivo pedido (ex: .html)

    const allowedFileTypes = ['.html', '.css', '.js']               // tipos de arquivos permitidos
    const allowed = allowedFileTypes.find(item => item == extname)  // verifica se é permitido

    if(!allowed) return // se não for permitido (ex: favicon), simplesmente ignora

    fs.readFile(
        filePath,               // caminho completo do arquivo a ser lido (ex: public/index.html)
        (err, content) => {     // content é parâmetro da função de callback do fs.readFile que representa o conteúdo lido do arquivo
            if(err) throw err   // se der erro ao ler, lança o erro

            res.end(content) // se ler com sucesso, envia o conteúdo como resposta
        }
    )
}).listen(5000, () => console.log('Server is running')) // servidor escutando na porta 5000





// OBS arquivo package.json serve para gerenciar as informações do projeto, suas dependências, scripts, versão e mais

// O fetch é uma API nativa do JavaScript usada para fazer requisições HTTP (como GET, POST, PUT, DELETE) para servidores web, ou seja, para buscar ou enviar dados a um servidor