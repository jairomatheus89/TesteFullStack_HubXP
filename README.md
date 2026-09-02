# TesteFullStack_HubXP


## Lambda

A Lambda é acionada por um evento HTTP `POST /order-created`.

O NestJS cria uma `Order`, constrói um `OrderCreatedEvent` contendo `type`, `orderId` e `total`, e envia esse evento para o endpoint HTTP disponibilizado pelo `Serverless Offline`.

O `Serverless Offline` simula localmente o ambiente de execução da Lambda e encaminha a requisição para o `orderCreatedHandler`, que processa o evento recebido.

Para o desenvolvimento e demonstração local, foi utilizado o `Serverless Framework` com `Serverless Offline`. O `LocalStack` não foi utilizado para a Lambda, conforme especificado no desafio.