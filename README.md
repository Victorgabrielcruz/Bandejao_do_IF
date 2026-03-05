# Sistema: Bandejão do IF

## 1. Descrição Geral do Sistema

O **Bandejão do IF** é um sistema digital desenvolvido para gerenciar o
acesso ao refeitório de uma instituição de ensino por meio de **filas
virtuais, controle de tickets, gestão de cardápio e pagamentos
eletrônicos**.

O sistema permitirá que alunos e professores entrem em filas virtuais
para as refeições disponíveis, enquanto assistentes e administradores
gerenciam a organização e operação das filas.

Além disso, o sistema permitirá que determinados usuários adquiram
tickets por meio de **pagamentos online**, visualizem o **cardápio
diário do refeitório** e acompanhem seu histórico de participação nas
filas.

A solução tem como objetivo substituir filas físicas e processos manuais
por um sistema digital que ofereça **organização, transparência e
eficiência no acesso às refeições**.

------------------------------------------------------------------------

# 2. Objetivo do Software

O objetivo do sistema **Bandejão do IF** é organizar e automatizar o
acesso às refeições da instituição, garantindo:

-   controle de acesso ao refeitório
-   organização de filas virtuais
-   gestão de tickets de refeição
-   registro de presença dos usuários
-   gestão financeira relacionada aos tickets
-   visualização de cardápios
-   histórico de uso do sistema

------------------------------------------------------------------------

# 3. Escopo do Projeto

O sistema incluirá:

-   cadastro e gerenciamento de usuários
-   criação automática de filas diárias
-   entrada de usuários nas filas conforme regras
-   gerenciamento de tickets
-   compra de tickets via pagamento eletrônico
-   integração com API de pagamentos
-   gestão de cardápios
-   chamada de usuários em grupos
-   registro de presença
-   visualização de histórico
-   suspensão de alunos internos
-   controle administrativo das filas

------------------------------------------------------------------------

# 4. Stakeholders

-   Alunos do técnico (internos e externos)
-   Alunos do ensino superior
-   Professores
-   Assistentes do refeitório
-   Administradores do sistema
-   Funcionários da instituição
-   Gestão institucional

------------------------------------------------------------------------

# 5. Tipos de Usuários

## Alunos do Técnico

### Internos

Podem acessar:

-   café da manhã
-   almoço
-   café da tarde
-   jantar
-   ceia

### Externos

Podem acessar:

-   café da manhã
-   almoço

------------------------------------------------------------------------

## Alunos do Ensino Superior

Podem:

-   comprar tickets
-   gerenciar tickets
-   utilizar tickets nas filas

Possuem acesso apenas à fila do **almoço**.

------------------------------------------------------------------------

## Professores

Podem:

-   comprar tickets
-   gerenciar tickets
-   utilizar tickets

Possuem acesso a:

-   café da manhã
-   almoço (após 11:50)
-   café da tarde

------------------------------------------------------------------------

## Assistentes

Responsáveis por:

-   controle das filas
-   registrar presença
-   alterar horários das filas
-   aplicar suspensão em alunos internos

------------------------------------------------------------------------

## Administradores

Responsáveis por:

-   criar usuários
-   excluir usuários
-   cadastrar cardápios
-   configurar regras do sistema

------------------------------------------------------------------------

# 6. Requisitos Funcionais

## Gestão de Usuários

**RF01** --- Apenas administradores podem criar usuários.

**RF02** --- Apenas administradores podem excluir usuários.

**RF03** --- O sistema deve permitir diferentes perfis de usuário.

------------------------------------------------------------------------

## Gestão de Filas

**RF04** --- O sistema deve criar automaticamente novas filas todos os
dias.

Tipos de filas:

-   café da manhã
-   almoço
-   café da tarde
-   jantar
-   ceia

**RF05** --- Usuários podem entrar nas filas conforme permissões do
perfil.

------------------------------------------------------------------------

## Horários das Filas

  Refeição        Abre    Fecha
  --------------- ------- -------
  Café da manhã   06:30   07:30
  Almoço          10:50   12:30
  Café da tarde   15:00   15:30
  Jantar          18:30   19:30
  Ceia            21:00   21:30

------------------------------------------------------------------------

## Acesso às Filas

**RF06 ---** O sistema deve **criar automaticamente, a cada dia, as
filas correspondentes às refeições** e disponibilizá-las para acesso dos
usuários **nos horários padrão previamente definidos**.

Assistentes ou administradores podem alterar os horários de abertura ou
fechamento de uma fila **para um dia específico**, podendo:

-   abrir a fila antes do horário padrão
-   atrasar a abertura da fila
-   fechar a fila antes do horário padrão
-   estender o horário da fila

As alterações:

-   valem apenas para aquele dia
-   não alteram os horários padrão do sistema
-   devem registrar data, hora e usuário responsável.

------------------------------------------------------------------------

# 7. Gestão de Chamadas

**RF07** --- O sistema deve chamar usuários em grupos.

**RF08** --- O grupo padrão deve ser de **10 usuários**.

**RF09** --- Assistentes podem alterar o tamanho do grupo.

**RF10** --- Usuários chamados recebem **notificação**.

**RF11** --- O usuário terá **10 minutos para comparecer**.

**RF12** --- Caso não compareça será movido para o **final da fila**.

------------------------------------------------------------------------

# 8. Registro de Presença

**RF13** --- Assistentes devem registrar presença dos usuários.

**RF14** --- Professores e alunos do superior devem apresentar **QR
Code** ao serem chamados.

------------------------------------------------------------------------

# 9. Gestão de Tickets

**RF15** --- Alunos do superior e professores podem comprar tickets.

**RF16** --- O sistema deve permitir visualizar a quantidade de tickets
disponíveis.

**RF17** --- O sistema deve descontar automaticamente um ticket ao
acessar uma fila que exige ticket.

**RF18** --- O sistema deve registrar:

-   usuário
-   data de uso
-   refeição
-   ticket utilizado

------------------------------------------------------------------------

# 10. Pagamentos

**RF19** --- O sistema deve permitir compra de tickets por pagamento
eletrônico.

**RF20** --- O sistema deve integrar pagamentos utilizando a API do
Mercado Pago.

**RF21** --- O sistema deve registrar:

-   valor da transação
-   quantidade de tickets
-   status do pagamento
-   data da compra

**RF22** --- Tickets devem ser liberados apenas após confirmação do
pagamento.

------------------------------------------------------------------------

# 11. Gestão de Cardápios

**RF23** --- Administradores podem cadastrar cardápios diários.

**RF24** --- O cardápio deve conter:

-   data
-   refeição
-   descrição dos alimentos

**RF25** --- Usuários podem visualizar o cardápio do dia.

------------------------------------------------------------------------

# 12. Histórico

**RF26** --- Usuários comuns podem visualizar:

-   posição na fila
-   horário de entrada
-   horário de chamada

**RF27** --- Assistentes e administradores podem visualizar todo o
histórico das filas.

------------------------------------------------------------------------

# 13. Suspensão

**RF28** --- Assistentes podem aplicar suspensão em alunos internos.

**RF29** --- Durante a suspensão, o aluno interno deve ser tratado pelo
sistema como **aluno técnico externo**.

------------------------------------------------------------------------

# 14. Regras de Negócio

**RN01** --- Filas são criadas automaticamente todos os dias.

**RN02** --- Chamadas devem respeitar prioridade:

-   50% alunos técnico internos
-   40% alunos técnico externos
-   10% alunos superior e professores

**RN03** --- Alunos do superior só podem acessar a fila do almoço **a
partir de 12:00**.

**RN04** --- Professores só podem acessar o almoço **após 11:50**.

**RN05** --- Usuários ausentes retornam ao final da fila.

------------------------------------------------------------------------

# 15. Requisitos Não Funcionais

### Segurança

-   autenticação de usuários
-   controle de permissões
-   proteção de dados financeiros

### Desempenho

-   resposta do sistema inferior a 2 segundos para entrada em filas

### Usabilidade

-   interface adaptada para dispositivos móveis

### Disponibilidade

-   alta disponibilidade durante horários do refeitório

------------------------------------------------------------------------

# 16. Restrições do Sistema

-   apenas administradores podem criar e excluir usuários
-   tickets são obrigatórios para alunos do superior e professores
    quando aplicável
-   pagamentos devem ocorrer via integração externa

------------------------------------------------------------------------

# 17. Riscos do Projeto

-   falhas na integração de pagamentos
-   alto volume de usuários simultâneos
-   falhas em notificações
-   erros na distribuição de prioridades nas filas
