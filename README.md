### Regras da aplicação

[x] Deve ser possível cadastrar um pet
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma estado
[x] Deve ser possível filtrar pets por suas características
[x] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível se cadastrar como um USER
[x] Deve ser possível se autenticar como uma ORG
[x] Deve ser possível se autenticar como uma USER
[ ] Deve ser possível o usuário deletar sua própria conta;
[ ] Deve ser possível a org deletar sua própria conta;
[ ] Deve ser possível a org deletar um pet;
[ ] Deve ser possível listar todas as orgs;
[ ] Deve ser possível listar todos os users;

### Regras de negócio

[x] Para listar os pets, obrigatoriamente precisamos informar estado e a cidade se usar o filtro de cidade.
[ ] Todas as listagem devem ser paginadas com 10 item por página;
[ ] Apenas usuário MASTER poderá listar os usuários e as orgs;
[ ] Apenas usuário MASTER poderá deletar todos e quaisquer usuários e as orgs;
[ ] Apenas usuário MASTER poderá deletar todos e quaisquer pets;
[x] Uma ORG precisa ter um endereço e um número de WhatsApp
[x] Um pet deve estar ligado a uma ORG
[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[x] Todos os filtros, além da cidade, são opcionais
[x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada