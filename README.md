### Regras da aplicação

[x] Deve ser possível cadastrar um pet
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma estado
- Deve ser possível filtrar pets por suas características
[] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível se cadastrar como um USER
[] Deve ser possível se autenticar como uma ORG
[] Deve ser possível se autenticar como uma USER

### Regras de negócio

[x] Para listar os pets, obrigatoriamente precisamos informar estado e a cidade se usar o filtro de cidade.
[x] Uma ORG precisa ter um endereço e um número de WhatsApp
[x] Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[x] Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada