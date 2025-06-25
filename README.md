# Kanban de Tarefas

## Como rodar?
---
- npm install
- npm start
- Para acessar, basta ingressar em http://localhost:4200


## Visão Geral
Este projeto consiste em um sistema Kanban para gerenciamento de tarefas, desenvolvido utilizando Angular standalone components. A aplicação possui funcionalidades como:

- Criação e edição de tarefas
- Arrastar e soltar tarefas entre colunas
- Interface responsiva com scroll horizontal e vertical
- Feedback visual para instruir o usuário durante o drag-and-drop

---

## Decisões de Design - Baseado em Notion
As decisões de design foram documentadas e organizadas no Notion para garantir alinhamento e consistência no projeto. Os principais pontos foram:

- **Minimalismo visual**: foco na simplicidade, fundo escuro para destacar cards
- **Design modular**: componentes reutilizáveis como `card-task`, `modal`, `icons`
- **Feedback ao usuário**: animações e instruções visuais ao arrastar tarefas
- **Responsividade**: suporte a rolagem vertical nas listas e horizontal no board

> A identidade visual segue o padrão definido no Notion, com cores em RGBA para permitir transparências sutis e destacar elementos com sombreamento.

---

## Processo de Desenvolvimento

1. **Criação do projeto Angular standalone** com divisão clara entre lógica (component) e apresentação (template e CSS)
2. **Implementação das colunas dinâmicas** baseadas em tipos de tarefas (`todo` e `done`)
3. **Drag and Drop**: lógica personalizada utilizando `dragstart`, `dragover` e `drop`, com destaque visual ao passar sobre a coluna
4. **Scroll interno nas listas**: para suportar grande volume de tarefas sem comprometer a interface
5. **Modal de criação e edição** com `ngModel` e validação leve

---

## Dificuldades Encontradas

- **Scroll das listas**: inicialmente, o scroll vertical não funcionava corretamente quando havia muitas tarefas. A solução foi aplicar `max-height` e `overflow-y: auto` diretamente nas listas.
- **Feedback no drag**: não estava claro onde soltar a tarefa. Foi criada uma classe `hover-target` aplicada dinamicamente na lista de destino.
- **Estilo condicional por estado**: garantir que os estilos de destaque só aparecessem na lista correta exigiu o uso de `ngClass` e controle por variável `draggingOverType`.
- **Performance com animações**: ajustes finos em `transition` para evitar travamentos ao mover tarefas rapidamente.

---

## Conclusão
Este projeto demonstrou um fluxo completo de criação de um mini sistema Kanban com foco em usabilidade e boas práticas de frontend. A documentação no Notion foi essencial para manter a clareza do design e das funcionalidades.


---

Se desejar continuar esse projeto, recomenda-se:
- Persistir as tarefas via backend/API
- Adicionar login por usuário
- Melhorar acessibilidade (atalhos e contraste)
