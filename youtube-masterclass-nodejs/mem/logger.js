/*
    Função log(message) que, ao ser chamada, dispara um evento que grava uma mensagem em um arquivo log.txt
*/




const EventEmitter = require('events') // módulo nativo do Node.js para trabalhar com eventos
const fs = require('fs') // módulo de sistema de arquivos, para ler/escrever arquivos
const path = require('path') // módulo para lidar com caminhos de arquivos (cross-plataforma)

const emitter = new EventEmitter() // cria um objeto emissor de eventos

// aqui estamos dizendo: "quando acontecer o evento 'log', execute essa função"
emitter.on('log', (message) => {
    // escreve (ou adiciona) a mensagem no arquivo log.txt
    fs.appendFile(
        path.join(__dirname, 'log.txt'), // __dirname = diretório atual, caminho completo do log.txt
        message,                         // mensagem recebida pelo evento
        (err) => {
            if (err) throw err          // se der erro ao gravar, lança o erro
        }
    )
})

// dispara o evento 'log' com a mensagem como parâmetro
// isso ativa o código que está ouvindo esse evento lá em cima (emitter.on)
function log(message){
    emitter.emit('log', message) // emite o evento chamado 'log' com a mensagem como dado
    // ativa a função de gravação
}

module.exports = log // exporta a função log() para ser usada em outros arquivos