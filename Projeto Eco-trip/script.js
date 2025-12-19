/**
 * CALCULADORA DE EMISSÃO DE CO2
 * Aplicação interativa para cálculo de pegada de carbono
 * 
 * Autor: Eco-trip
 * Data: 2025
 * Descrição: Sistema completo de cálculo com fórmulas reais de emissão
 */

// ============================================
// FATORES DE EMISSÃO (kg CO2e por unidade)
// ============================================

const EMISSION_FACTORS = {
    // Transporte (kg CO2e/km)
    transport: {
        'carro-gasolina': 0.192,      // Carro a gasolina
        'carro-diesel': 0.165,        // Carro a diesel
        'carro-eletrico': 0.045,      // Carro elétrico
        'moto': 0.096,                // Moto/Scooter
        'onibus': 0.089,              // Ônibus (por passageiro)
        'trem': 0.041,                // Trem/Metrô (por passageiro)
        'bicicleta': 0                // Zero emissão
    },

    // Energia (kg CO2e/kWh)
    energia: {
        'combustivel': 0.92,          // Gerada por combustível fóssil
        'renovavel': 0.05,            // Energia renovável
        'media_brasil': 0.089         // Média brasileira
    },

    // Alimentação (kg CO2e/semana)
    dieta: {
        'vegan': 1.5,                 // Dieta vegana
        'vegetariana': 2.8,           // Dieta vegetariana
        'mista': 4.5,                 // Dieta mista
        'baixo-carboidrato': 6.2      // Dieta carnívora
    },

    // Consumo (kg CO2e/kg de plástico)
    plastico: 2.5,

    // Compras online (kg CO2e por encomenda)
    compra_online: 1.2
};

// ============================================
// EQUIVALÊNCIAS (para contextualização)
// ============================================

const EQUIVALENCES = {
    arvore_por_ano: 20,              // kg CO2 que uma árvore absorve/ano
    voo_nyc: 1200,                   // kg CO2 por voo ida e volta NYC
    netflix_4k_hora: 0.07,           // kg CO2 por hora streaming 4K
    smartphone_carga: 0.017,         // kg CO2 por carga completa
    carro_gasolina_km: 0.192,        // kg CO2 por km carro gasolina
    casa_mes_energia: 450             // kg CO2 por mês casa média
};

// ============================================
// SELEÇÃO DE ELEMENTOS DO DOM
// ============================================

const form = document.getElementById('co2Form');
const resultsSection = document.getElementById('results');
const transportType = document.getElementById('transport-type');
const kmDiarios = document.getElementById('km-diarios');
const diasSemana = document.getElementById('dias-semana');
const kwhMensal = document.getElementById('kwh-mensal');
const energiaRenovavel = document.getElementById('energia-renovavel');
const renovavelValue = document.getElementById('renovavel-value');
const reciclagem = document.getElementById('reciclagem');
const reciclagemValue = document.getElementById('reciclagem-value');
const consumoPlastico = document.getElementById('consumo-plastico');
const comprasOnline = document.getElementById('compras-online');
const dietaOptions = document.querySelectorAll('input[name="dieta"]');

// Resultados
const totalCO2 = document.getElementById('total-co2');
const monthlyCO2 = document.getElementById('monthly-co2');
const transportResult = document.getElementById('transport-result');
const energiaResult = document.getElementById('energia-result');
const consumoResult = document.getElementById('consumo-result');

// Progress bars
const transportProgress = document.getElementById('transport-progress');
const energiaProgress = document.getElementById('energia-progress');
const consumoProgress = document.getElementById('consumo-progress');

// Equivalências
const equivTrees = document.getElementById('equiv-trees');
const equivFlights = document.getElementById('equiv-flights');
const equivNetflix = document.getElementById('equiv-netflix');
const equivSmartphone = document.getElementById('equiv-smartphone');
const equivCarro = document.getElementById('equiv-carro');
const equivCasa = document.getElementById('equiv-casa');

// Comparativo
const userBar = document.getElementById('user-bar');
const userValue = document.getElementById('user-value');

// Botões
const shareButton = document.getElementById('share-button');
const backButton = document.getElementById('back-button');
const shareModal = document.getElementById('share-modal');
const modalClose = document.querySelector('.modal-close');
const shareWhatsapp = document.getElementById('share-whatsapp');
const shareTwitter = document.getElementById('share-twitter');
const shareFacebook = document.getElementById('share-facebook');
const shareCopy = document.getElementById('share-copy');
const shareMessage = document.getElementById('share-message');
const shareCO2 = document.getElementById('share-co2');

// ============================================
// LISTENERS DE EVENTOS
// ============================================

form.addEventListener('submit', handleFormSubmit);

// Atualizar labels de range em tempo real
energiaRenovavel.addEventListener('input', (e) => {
    renovavelValue.textContent = e.target.value + '%';
});

reciclagem.addEventListener('input', (e) => {
    reciclagemValue.textContent = e.target.value + '%';
});

shareButton.addEventListener('click', openShareModal);
backButton.addEventListener('click', scrollToForm);
modalClose.addEventListener('click', closeShareModal);
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) closeShareModal();
});

shareWhatsapp.addEventListener('click', shareOnWhatsapp);
shareTwitter.addEventListener('click', shareOnTwitter);
shareFacebook.addEventListener('click', shareOnFacebook);
shareCopy.addEventListener('click', copyToClipboard);

// ============================================
// TOOLTIPS
// ============================================

const tooltipIcons = document.querySelectorAll('.tooltip-icon');
const tooltip = document.getElementById('tooltip');

tooltipIcons.forEach(icon => {
    icon.addEventListener('mouseenter', showTooltip);
    icon.addEventListener('mouseleave', hideTooltip);
    icon.addEventListener('focus', showTooltip);
    icon.addEventListener('blur', hideTooltip);
});

function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    tooltip.textContent = text;
    tooltip.classList.remove('hidden');
    positionTooltip(e.target);
}

function hideTooltip() {
    tooltip.classList.add('hidden');
}

function positionTooltip(element) {
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
}

// ============================================
// FUNÇÕES PRINCIPAIS DE CÁLCULO
// ============================================

/**
 * Manipula o envio do formulário
 * @param {Event} e - Evento do formulário
 */
function handleFormSubmit(e) {
    e.preventDefault();
    calculateCO2Emissions();
}

/**
 * Calcula as emissões totais de CO2
 * Integra cálculos de transporte, energia e consumo
 */
function calculateCO2Emissions() {
    // Cálculo de Transporte
    const transportEmission = calculateTransportEmission();

    // Cálculo de Energia
    const energyEmission = calculateEnergyEmission();

    // Cálculo de Alimentação e Consumo
    const consumptionEmission = calculateConsumptionEmission();

    // Total anual
    const totalAnnual = transportEmission + energyEmission + consumptionEmission;
    const totalMonthly = totalAnnual / 12;

    // Exibir resultados
    displayResults(totalAnnual, totalMonthly, transportEmission, energyEmission, consumptionEmission);

    // Calcular equivalências
    calculateEquivalences(totalAnnual);

    // Mostrar seção de resultados
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Calcula emissões de transporte anual
 * Fórmula: km/dia × dias/semana × 52 semanas × fator de emissão
 * @returns {number} Emissão anual em kg CO2e
 */
function calculateTransportEmission() {
    const type = transportType.value;
    const km = parseFloat(kmDiarios.value) || 0;
    const days = parseFloat(diasSemana.value) || 0;
    const factor = EMISSION_FACTORS.transport[type] || 0;

    // Cálculo: km/dia × dias/semana × 52 semanas × fator
    const annualEmission = km * days * 52 * factor;

    return annualEmission;
}

/**
 * Calcula emissões de energia residencial
 * Fórmula: kWh/mês × 12 meses × fator de emissão ajustado
 * @returns {number} Emissão anual em kg CO2e
 */
function calculateEnergyEmission() {
    const kwh = parseFloat(kwhMensal.value) || 0;
    const renewablePercent = parseFloat(energiaRenovavel.value) / 100;
    
    // Fator de emissão ponderado
    const nonRenewablePercent = 1 - renewablePercent;
    const emissionFactor = 
        (nonRenewablePercent * EMISSION_FACTORS.energia.combustivel) +
        (renewablePercent * EMISSION_FACTORS.energia.renovavel);

    // Cálculo: kWh/mês × 12 × fator
    const annualEmission = kwh * 12 * emissionFactor;

    return annualEmission;
}

/**
 * Calcula emissões de alimentação e consumo
 * Inclui: dieta, plástico, reciclagem e compras online
 * @returns {number} Emissão anual em kg CO2e
 */
function calculateConsumptionEmission() {
    // Emissão de dieta (por semana × 52)
    const selectedDiet = document.querySelector('input[name="dieta"]:checked').value;
    const dietEmission = EMISSION_FACTORS.dieta[selectedDiet] * 52;

    // Emissão de plástico (kg/mês × 12 × fator)
    const plastic = parseFloat(consumoPlastico.value) || 0;
    const recyclingPercent = parseFloat(reciclagem.value) / 100;
    const wastedPlastic = plastic * (1 - recyclingPercent); // Plástico não reciclado
    const plasticEmission = wastedPlastic * 12 * EMISSION_FACTORS.plastico;

    // Emissão de compras online (compras/mês × 12 × fator)
    const orders = parseFloat(comprasOnline.value) || 0;
    const shoppingEmission = orders * 12 * EMISSION_FACTORS.compra_online;

    const totalConsumption = dietEmission + plasticEmission + shoppingEmission;

    return totalConsumption;
}

/**
 * Calcula equivalências criativas
 * Contextualiza a pegada de carbono em situações do dia a dia
 * @param {number} co2Total - Emissão anual em kg CO2e
 */
function calculateEquivalences(co2Total) {
    // 1. Árvores necessárias para absorver
    const trees = Math.round(co2Total / EQUIVALENCES.arvore_por_ano);
    equivTrees.textContent = trees;

    // 2. Voos internacionais
    const flights = (co2Total / EQUIVALENCES.voo_nyc).toFixed(1);
    equivFlights.textContent = flights;

    // 3. Horas de streaming Netflix 4K
    const netflixHours = Math.round(co2Total / EQUIVALENCES.netflix_4k_hora);
    equivNetflix.textContent = netflixHours;

    // 4. Carregamentos de smartphone
    const smartphones = Math.round(co2Total / EQUIVALENCES.smartphone_carga);
    equivSmartphone.textContent = smartphones;

    // 5. Quilômetros em carro a gasolina
    const carKm = Math.round(co2Total / EQUIVALENCES.carro_gasolina_km);
    equivCarro.textContent = carKm;

    // 6. Casas aquecidas com energia comum
    const houses = (co2Total / EQUIVALENCES.casa_mes_energia / 12).toFixed(1);
    equivCasa.textContent = houses;
}

/**
 * Exibe resultados na interface
 * Atualiza cards, gráficos e barras de progresso
 * @param {number} annual - Emissão anual
 * @param {number} monthly - Emissão mensal
 * @param {number} transport - Emissão de transporte
 * @param {number} energy - Emissão de energia
 * @param {number} consumption - Emissão de consumo
 */
function displayResults(annual, monthly, transport, energy, consumption) {
    // Valores principais
    totalCO2.textContent = annual.toFixed(0);
    monthlyCO2.textContent = monthly.toFixed(1);

    // Breakdown por categoria
    transportResult.textContent = transport.toFixed(0);
    energiaResult.textContent = energy.toFixed(0);
    consumoResult.textContent = consumption.toFixed(0);

    // Calcular percentuais para progress bars
    const total = transport + energy + consumption;
    const transportPercent = (transport / total) * 100;
    const energyPercent = (energy / total) * 100;
    const consumptionPercent = (consumption / total) * 100;

    // Atualizar barras de progresso com animação
    setTimeout(() => {
        transportProgress.style.width = transportPercent + '%';
        energiaProgress.style.width = energyPercent + '%';
        consumoProgress.style.width = consumptionPercent + '%';
    }, 100);

    // Comparativo com a média brasileira
    const mediaBrasil = 4620; // kg CO2e/ano
    const goalSustentavel = 2500; // kg CO2e/ano
    const userPercent = (annual / mediaBrasil) * 100;

    userValue.textContent = annual.toFixed(0);
    userBar.style.width = Math.min(userPercent, 100) + '%';

    // Mensagem de compartilhamento
    shareCO2.textContent = annual.toFixed(0);
}

// ============================================
// FUNÇÕES DE COMPARTILHAMENTO
// ============================================

/**
 * Abre o modal de compartilhamento
 */
function openShareModal() {
    shareModal.classList.remove('hidden');
    shareModal.focus();
}

/**
 * Fecha o modal de compartilhamento
 */
function closeShareModal() {
    shareModal.classList.add('hidden');
}

/**
 * Compartilha via WhatsApp
 */
function shareOnWhatsapp() {
    const co2 = document.getElementById('total-co2').textContent;
    const text = `Descobri minha pegada de carbono: ${co2} kg CO2e/ano! 🌍 Calcule a sua em ecotrip.com e veja como reduzir seu impacto ambiental. 🌱`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

/**
 * Compartilha via Twitter
 */
function shareOnTwitter() {
    const co2 = document.getElementById('total-co2').textContent;
    const text = `Acabo de calcular minha pegada de carbono: ${co2} kg CO2e/ano! 🌍 Você já conhece a sua? Teste em ecotrip.com #SustainabilityMatters`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

/**
 * Compartilha via Facebook
 */
function shareOnFacebook() {
    const co2 = document.getElementById('total-co2').textContent;
    const text = `Descobri que minha pegada de carbono é de ${co2} kg CO2e por ano. Você sabe qual é a sua? Faça o teste e descubra como reduzir seu impacto!`;
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

/**
 * Copia o resultado para a área de transferência
 */
function copyToClipboard() {
    const text = shareMessage.textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const originalText = shareCopy.textContent;
        shareCopy.textContent = '✓ Copiado!';
        setTimeout(() => {
            shareCopy.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar para a área de transferência');
    });
}

/**
 * Scroll para o formulário
 */
function scrollToForm() {
    const calculator = document.getElementById('calculator');
    calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// VALIDAÇÃO E ACESSIBILIDADE
// ============================================

/**
 * Valida entrada de números
 * @param {HTMLInputElement} input - Campo de entrada
 */
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', (e) => {
        const value = parseFloat(e.target.value);
        const min = parseFloat(e.target.min) || 0;
        const max = parseFloat(e.target.max);

        if (value < min) {
            e.target.value = min;
        } else if (max && value > max) {
            e.target.value = max;
        }
    });
});

/**
 * Validação em tempo real do formulário
 */
form.addEventListener('change', () => {
    const isValid = form.checkValidity();
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!isValid) {
        submitButton.setAttribute('aria-disabled', 'true');
    } else {
        submitButton.setAttribute('aria-disabled', 'false');
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa a aplicação
 */
function init() {
    // Definir foco inicial
    form.querySelector('input').focus();

    // Log de inicialização (desenvolvimento)
    console.log('🌿 Calculadora de CO2 inicializada');
    console.log('Fatores de emissão carregados:', EMISSION_FACTORS);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Formata número para formato de moeda/número brasileiro
 * @param {number} num - Número a formatar
 * @returns {string} Número formatado
 */
function formatNumber(num) {
    return num.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Gera ID único para elementos
 * @returns {string} ID único
 */
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

// Exports para testes (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateTransportEmission,
        calculateEnergyEmission,
        calculateConsumptionEmission,
        calculateEquivalences,
        EMISSION_FACTORS,
        EQUIVALENCES
    };
}
