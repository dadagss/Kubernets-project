# Kubernetes Project - Node.js API com MySQL

Este projeto foi desenvolvido como parte de um desafio proposto pela RocketSeat, onde o objetivo era consolidar os conhecimentos sobre Kubernetes. A aplicação consiste em uma API Node.js conectada a um banco de dados MySQL, rodando em um cluster Kubernetes. O desafio envolveu a configuração de Deployments, Services, Persistent Volumes (PV/PVC), ConfigMaps, e a implementação de estratégias de escalonamento automático com Horizontal Pod Autoscaler (HPA). Além disso, foi configurado um Service do tipo NodePort para expor a API fora do cluster.

## Índice

- [Kubernetes Project - Node.js API com MySQL](#kubernetes-project---nodejs-api-com-mysql)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Requisitos](#requisitos)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Como executar](#como-executar)
  - [Recursos Criados](#recursos-criados)
  - [Conclusão e Desafios](#conclusão-e-desafios)
  - [Referências](#referências)

## Visão Geral

Este projeto visa demonstrar a configuração de uma aplicação Node.js conectada a um banco de dados MySQL em um cluster Kubernetes. A solução cria os seguintes recursos:

- **API Node.js**: Uma aplicação backend que realiza operações no banco de dados.
- **MySQL**: Um banco de dados relacional configurado no cluster.
- **Persistent Volume (PV) e Persistent Volume Claim (PVC)**: Para garantir a persistência dos dados do banco.
- **Horizontal Pod Autoscaler (HPA)**: Para escalar automaticamente a API com base na utilização de CPU.
- **Service do tipo NodePort**: Para expor a API fora do cluster, permitindo acesso via navegador ou cliente HTTP (Postman, cURL, etc.).
## Requisitos

- [Minikube](https://minikube.sigs.k8s.io/docs/) ou [Kind](https://kind.sigs.k8s.io/) instalado.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) instalado.
- [Docker](https://docs.docker.com/get-docker/) instalado.

## Estrutura do Projeto

```bash
Kubernetes-Project/
├── api/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── k8s/
│   ├── api-deployment.yaml
│   ├── app-service.yaml
│   ├── db-deployment-db.yaml
│   ├── db-service.yaml
│   ├── network-policy.yaml
│   ├── pvc.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── secret-db.yaml
│   └── hpa.yaml
│   └── nodeport.yaml
├── gitignore
├── docker-compose.yml
├── Dockerfile
├── index.js
├── Package-lock.json
├── package.json
└── README.md
````
## Como executar

   1. **Iniciar o Cluster Kubernetes:**
   
  - basta botar a aplicação para rodar
      ```bash
      Kubectl apply -f .
      ```
   2. **Verifique o status dos pods:**

  -  Verifique se os pods estão rodandos
      ```bash
      kubectl get pods -n desafio-api
      kubectl get pods -n desafio-db
      ```
    
   3. **Expor a API com NodePort:**
   
  - Aplique o Service do tipo NodePort para expor a API fora do cluster:
      ```bash
      kubectl apply -f api-nodeport.yaml 
    ```
    5. **Acessar a API:**
  - Use o comando abaixo para obter a URL de acesso à API:
    ```bash
    kind service api-nodeport-service -n desafio-api
    ````

## Recursos Criados

**API Node.js:** Deployment e Service para a aplicação Node.js.

**MySQL:** Deployment e Service para o banco de dados MySQL.

**Persistent Volume (PV) e Persistent Volume Claim (PVC):** Para persistência dos dados do banco.

**Horizontal Pod Autoscaler (HPA):** Para escalonamento automático da API.

**Service do tipo NodePort:** Para expor a API fora do cluster.
      

## Conclusão e Desafios
  Este projeto foi um grande desafio, mas também uma excelente oportunidade para aprender sobre Kubernetes. Tive algumas dificuldades, especialmente na conexão da aplicação Node.js com o banco de dados MySQL, mas com persistência e algumas boas sacadas, consegui superar todos os obstáculos. Foi incrível ver tudo funcionando perfeitamente no final, e isso me motiva a querer aprender cada vez mais sobre Kubernetes e infraestrutura em geral.

Configurar o Service do tipo NodePort foi uma das partes mais interessantes, pois permitiu expor a API para acesso externo sem a necessidade de PortForward. Isso trouxe um novo nível de entendimento sobre como os Services funcionam no Kubernetes.

## Referências
[Documentação do Kubernetes](https://kubernetes.io/docs/home/)

[Kind](https://kind.sigs.k8s.io)

[Formação DevOps RockestSeat](https://app.rocketseat.com.br/journey/devops/contents)