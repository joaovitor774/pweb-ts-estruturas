// Exercício 02: Conta de luz
// ---------- Regras de negócio (não acessam o document) ----------
// Tarifa por kWh de acordo com o tipo de cliente (cases agrupados)
function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
// Valor adicional da bandeira; se a bandeira não for informada, usa 'verde'
function adicionalBandeira(consumo, bandeira = 'verde') {
    let adicionalPorKwh;
    switch (bandeira) {
        case 'verde':
            adicionalPorKwh = 0;
            break;
        case 'amarela':
            adicionalPorKwh = 0.02;
            break;
        case 'vermelha1':
            adicionalPorKwh = 0.04;
            break;
        case 'vermelha2':
            adicionalPorKwh = 0.08;
            break;
    }
    return consumo * adicionalPorKwh;
}
// Mensagem exibida para cada bandeira (as duas vermelhas compartilham a mensagem)
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Bandeira desconhecida.';
    }
}
// Nome da bandeira para exibição
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'vermelha1':
            return 'vermelha (patamar 1)';
        case 'vermelha2':
            return 'vermelha (patamar 2)';
        default:
            return bandeira;
    }
}
// Teste do parâmetro padrão:
// adicionalBandeira(100) devolve 0, porque sem o segundo argumento
// a bandeira assume o valor padrão 'verde', que não tem adicional.
console.log('adicionalBandeira(100) =', adicionalBandeira(100));
// ---------- Página ----------
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    // Retorno antecipado: consumo vazio (NaN) ou menor/igual a zero
    if (Number.isNaN(consumo) || consumo <= 0) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    saida.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagemBandeira(bandeira);
    saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
export {};
//# sourceMappingURL=ex02.js.map