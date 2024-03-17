# Server-LatterGames
 My backend to manage my main page.

 This is an update to Request-server-using-SQL doing local request.

# pkg to compile

Para instalar o compilador use esse comando:
```
npm i -g pkg
```

No arquivo package.json adicionar os seguintes comandos:
```
"bin": "src/index.js",
"pkg": {
    "targets": ["latest-win-x64"]
}
```
Isso garante que o programa compile corretamente.

Assim realizar deploy, enviar o programa para um cliente, aplicar correções diversas e etc, fica mais facil já que não é necessário adicionar pacotes adicionais, tudo esta embutido no programa compilado.