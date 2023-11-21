# Esfera Pró: Sistema de Gerenciamento de Clientes com SpringBoot e React

## Desenvolvimento do projeto esfera pró soluções.

### Desenvolvimento em:
- JavaScript
- Spring Boot Java Web
- MySQL
- React Js + Vite
- Java 17

---

## Desenvolvedores:

- [Antony Henrique Bresolin](https://github.com/antonybresolin) - Back End developer Java Spring Boot
- [Lucas Dreveck](https://github.com/Lucas-Dreveck) - Front End developer React jsx 
- [Vitor Luiz Duarte](https://github.com/ctrlVi) - Ux, Design system
- [Gabriel Costa](https://github.com/gabrielscostaa) - Front End Scrum master 


---

## Como rodar:

### Back end:
1. Na pasta do backend, baixe as dependências do `pom.xml` pelo Maven:
- mvn clean install

2. Crie o banco de dados pelo MySQL Workbench:
- create database esferadb;

### Front end:
1. Na pasta do front end, instale as dependências:
- npm install
2. Após as instalações, rode o `main` do back end na classe `ApiSpringBootEsferaApplication`.
3. Utilize de algum programa para post em API como a extensão Thunder Client ou o app Postman para criar o seu login com o formato JSON
```
{
    "username": "seu nome para fazer login",
    "name": "seu nome dentro do programa",
    "password": "sua senha"
}
```
Inserir o JSON no body do protocolo POST, na rota:
```
    http://localhost:8080/api/user
```
4. Na pasta do front end, rode o comando:
- npm run dev
