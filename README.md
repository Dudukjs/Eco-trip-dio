# 🌿 Calculadora de Emissão de CO2 - Eco-trip

Uma aplicação web **interativa**, **acessível** e **responsiva** para calcular sua pegada de carbono e receber dicas personalizadas para redução de emissões.

## 📋 Índice

- [Características](#características)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Cálculos Implementados](#cálculos-implementados)
- [Equivalências](#equivalências)
- [Acessibilidade](#acessibilidade)
- [Responsividade](#responsividade)
- [Contribuições](#contribuições)
- [Licença](#licença)

## ✨ Características

### Cálculo Completo de Pegada de Carbono

- 🚗 **Transporte**: Carro, moto, ônibus, trem, bicicleta
- ⚡ **Energia Residencial**: Consumo kWh com opção de energia renovável
- 🍽️ **Alimentação e Consumo**: Dieta, plástico, reciclagem, compras online

### Interface Intuitiva

- Formulário segmentado em seções lógicas
- Tooltips explicativos em cada campo
- Validação em tempo real
- Feedback visual imediato

### Resultados Visuais

- **Card principal** com emissão anual e mensal
- **Breakdown** por categoria com barras de progresso
- **6 equivalências criativas** para contextualização:
  - 🌳 Árvores para absorver a emissão
  - ✈️ Voos internacionais
  - 📺 Horas de streaming 4K
  - 📱 Carregamentos de smartphone
  - 🚗 Quilômetros em carro a gasolina
  - 🏠 Casas aquecidas por 1 mês

### Gráfico Comparativo

- Sua pegada vs. média brasileira vs. meta sustentável
- Visualização clara do impacto individual

### Compartilhamento Social

- WhatsApp, Twitter, Facebook
- Copiar resultado para compartilhar manualmente

### 60+ Dicas Personalizadas

- Transporte sustentável
- Economia de energia
- Alimentação consciente
- Consumo responsável
- Impacto coletivo
- Tecnologia sustentável

## 🛠️ Tecnologias

| Tecnologia | Função |
|-----------|--------|
| **HTML5** | Estrutura semântica e acessível |
| **CSS3** | Design responsivo, variáveis CSS, flexbox/grid |
| **JavaScript (Vanilla)** | Lógica de cálculo, interatividade, DOM |

### Sem Dependências Externas
- Zero bibliotecas
- Zero CDN
- Totalmente offline

## 📁 Estrutura do Projeto

```
Projeto Eco-trip/
├── index.html          # Arquivo HTML principal (550+ linhas)
├── style.css           # Estilos CSS com variáveis (900+ linhas)
├── script.js           # Lógica JavaScript (550+ linhas)
└── README.md           # Este arquivo
```

## 🚀 Instalação

### Rápido (Sem instalação)

1. Abra `index.html` diretamente no navegador
2. Tudo funciona localmente, sem necessidade de servidor

### Com Servidor Local (Recomendado)

**Python 3:**
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Node.js:**
```bash
npx http-server
# Acesse: http://localhost:8080
```

**PHP:**
```bash
php -S localhost:8000
```

## 📖 Como Usar

### 1. Preencha o Formulário

**Seção Transporte:**
- Selecione seu tipo de transporte principal
- Indique quantos km você percorre por dia
- Especifique quantos dias da semana usa esse transporte

**Seção Energia:**
- Informar consumo mensal (verifique na conta de luz)
- Ajustar percentual de energia renovável

**Seção Alimentação/Consumo:**
- Selecionar tipo de dieta
- Estimativa de resíduos plásticos
- Percentual de itens reciclados
- Número de compras online mensais

### 2. Clique em "Calcular Minha Pegada"

O sistema processará seus dados e exibirá:
- Emissão total anual e mensal
- Breakdown por categoria
- 6 equivalências criativas
- Comparação com média brasileira

### 3. Compartilhe seus Resultados

Clique em "Compartilhar Resultado" para:
- Enviar via WhatsApp
- Tweetar no Twitter
- Compartilhar no Facebook
- Copiar resultado

### 4. Leia Dicas Personalizadas

Scroll até a seção "Dicas" para encontrar 60+ sugestões práticas.

## 🧮 Cálculos Implementados

### Fórmula de Transporte
```
Emissão Anual = km/dia × dias/semana × 52 semanas × fator de emissão
```

**Fatores de Emissão (kg CO2e/km):**
- Carro (gasolina): 0.192
- Carro (diesel): 0.165
- Carro (elétrico): 0.045
- Moto: 0.096
- Ônibus: 0.089
- Trem: 0.041
- Bicicleta: 0

### Fórmula de Energia
```
Emissão Anual = kWh/mês × 12 × fator ponderado
```

**Fatores de Emissão (kg CO2e/kWh):**
- Combustível fóssil: 0.92
- Energia renovável: 0.05

**O fator é ponderado pelo percentual de energia renovável:**
```
Fator = (% não renovável × 0.92) + (% renovável × 0.05)
```

### Fórmula de Alimentação
```
Emissão Anual = emissão semanal × 52
```

**Por tipo de dieta (kg CO2e/semana):**
- Vegana: 1.5
- Vegetariana: 2.8
- Mista: 4.5
- Carnívora/Alta proteína: 6.2

### Fórmula de Consumo
```
Emissão = (plástico não reciclado × fator) + (compras × fator × 12)
```

**Fatores:**
- Plástico: 2.5 kg CO2e/kg
- Compra online: 1.2 kg CO2e/encomenda

### Bases Científicas

- **IPCC** (Painel Intergovernamental de Mudanças Climáticas)
- **IPEA** (Instituto de Pesquisa Econômica Aplicada - Brasil)
- **EPA** (Environmental Protection Agency - EUA)

## 🎯 Equivalências

| Equivalência | Fator | Descrição |
|-------------|-------|-----------|
| 🌳 Árvore/ano | 20 kg | Uma árvore absorve 20kg CO2e por ano |
| ✈️ Voo NYC | 1.200 kg | Voo ida e volta Nueva York |
| 📺 Netflix 4K/hora | 0.07 kg | Uma hora de streaming em 4K |
| 📱 Carga smartphone | 0.017 kg | Uma carga completa da bateria |
| 🚗 Carro/km | 0.192 kg | Quilômetro em carro a gasolina |
| 🏠 Casa/mês | 450 kg | Casa média aquecida com energia comum |

## ♿ Acessibilidade

### WCAG 2.1 Level AA

- ✅ **Semântica HTML5**: `<main>`, `<section>`, `<article>`, `<fieldset>`
- ✅ **ARIA Labels**: Descrições para leitores de tela
- ✅ **Contraste**: Razão mínima 4.5:1
- ✅ **Navegação por teclado**: Totalmente funcional
- ✅ **Focus visível**: Destaque claro
- ✅ **Modo reduzido de movimento**: Respeita `prefers-reduced-motion`
- ✅ **Modo escuro**: Detecta `prefers-color-scheme`
- ✅ **Tooltips interativos**: Suportam mouse e teclado

## 📱 Responsividade

### Breakpoints

| Breakpoint | Largura | Uso |
|-----------|---------|-----|
| Desktop | 1200px+ | Layout completo |
| Tablet | 768px - 1199px | Layout adaptado |
| Mobile | 480px - 767px | 2 colunas |
| Pequeno | < 480px | 1 coluna |

### Otimizações por Device

- **Touch targets**: 44px mínimo
- **Fonte legível**: Escalada automática
- **Imagens responsivas**: Suporte futuro para SVG
- **Orientação**: Suporta landscape e portrait

## 🎨 Design

### Paleta de Cores

| Cor | Uso |
|-----|-----|
| #2E7D32 | Verde primário (sustentabilidade) |
| #FFF | Fundo branco (clareza) |
| #F9FAFB | Fundo cinza claro |
| #D32F2F | Vermelho (alertas) |
| #F57C00 | Laranja (avisos) |

### Tipografia

- **Font family**: Segoe UI, Roboto, sans-serif
- **Escalas**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- **Line-height**: 1.6 (legibilidade)

### Animações

- Transições suaves (200ms)
- Slide-in para resultados
- Fade-in para modais
- Hover effects em botões

## 🔐 Privacidade

- **Sem coleta de dados**: Tudo é processado localmente
- **Sem cookies**: Nenhuma rastreamento
- **Sem armazenamento**: Os dados não são salvos
- **Open source**: Código disponível para auditoria

## 🧪 Testado em

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Recursos Úteis

- [IPCC Calculator](https://www.ipcc.ch/)
- [Carbon Trust UK](https://www.carbontrust.com/)
- [Our World in Data - CO2](https://ourworldindata.org/co2)
- [EPA Carbon Calculator](https://www.epa.gov/carbon-footprint-calculator)

## 🤝 Contribuições

Sugestões, melhorias e correções são bem-vindas!

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

Sinta-se livre para usar, modificar e distribuir.

---

**Desenvolvido com ❤️ para o planeta** 🌍

Eco-trip - Viagens e Vida Sustentáveis | 2025
