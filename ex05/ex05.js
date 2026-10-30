// Exercício 05: Caixa do mercado
const MAX_ITENS = 20;
const DESCONTO_FIDELIDADE = 5; // %
// ---------- Regras de negócio (não acessam o document) ----------
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Lê um preço por linha. Aceita ponto ou vírgula.
// Linhas vazias são puladas; linhas inválidas são puladas e contadas.
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        if (precos.length === MAX_ITENS) {
            break; // limite de itens por compra
        }
        const linha = linhas[i].trim();
        if (linha === '') {
            continue; // linha vazia: ignora sem contar
        }
        const preco = Number(linha.replace(',', '.'));
        if (Number.isNaN(preco) || preco <= 0) {
            ignorados++;
            continue; // linha inválida: ignora e conta
        }
        precos.push(preco);
    }
    return { precos, ignorados };
}
// Soma qualquer quantidade de preços (parâmetro rest)
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, descontoOuCupom) {
    if (typeof descontoOuCupom === 'number') {
        return total * descontoOuCupom / 100;
    }
    switch (descontoOuCupom.toUpperCase()) {
        case 'BEMVINDO':
            return total * 10 / 100;
        case 'PROMO20':
            return total * 20 / 100;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
// ---------- Página ----------
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    const linhas = [];
    // Quantidade de itens e, se houver, de linhas ignoradas
    let textoItens = `Itens: ${precos.length}`;
    if (ignorados > 0) {
        textoItens += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
    }
    linhas.push(textoItens);
    linhas.push(`Subtotal: ${formatarReal(subtotal)}`);
    // Desconto do cupom (somente se o campo não estiver vazio)
    let total = subtotal;
    if (cupom !== '') {
        const descontoCupom = calcularDesconto(subtotal, cupom);
        if (descontoCupom > 0) {
            linhas.push(`Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`);
            total -= descontoCupom;
        }
        else {
            linhas.push('Cupom inválido ou não aplicável');
        }
    }
    // Fidelidade: 5% sobre o valor já com o cupom
    if (campoFidelidade.checked) {
        const descontoFidelidade = calcularDesconto(total, DESCONTO_FIDELIDADE);
        linhas.push(`Fidelidade (${DESCONTO_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
        total -= descontoFidelidade;
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    saida.textContent = linhas.join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map