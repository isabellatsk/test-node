/*
    Monitor de uso de memória RAM do computador em tempo real
*/





const os = require("os"); // importa o módulo nativo 'os' do Node.js, que permite acessar informações do sistema operacional
const log = require('./logger') // importa uma função local chamada log (de logger.js)

setInterval(() => {
    const { freemem, totalmem } = os; // desestrutura os métodos freemem e totalmem do módulo os

    const mem = parseInt(freemem() / 1024 / 1024); // converte memória livre de bytes para MB
    const total = parseInt(totalmem() / 1024 / 1024); // converte memória total de bytes para MB
    const percents = parseInt((mem / total) * 100); // calcula a porcentagem de memória livre

    console.clear(); // limpa o terminal
    console.log("====== PC STATUS ======");

    // cria um objeto com os dados formatados
    const status = {
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`, // mostra quanto da memória está sendo usada
    };

    console.log(status); // exibe o status como objeto comum
    console.table(status); // exibe o status em formato de tabela

    log(`${JSON.stringify(status)}\n`) 
    // converte o objeto status para string no formato JSON e salva no log
}, 1000); // atualiza a cada 1 segundo
