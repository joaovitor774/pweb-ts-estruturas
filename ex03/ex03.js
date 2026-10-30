// Exercício 03: Simulador de parcelamento
const PARCELA_MINIMA = 50;
const MAX_PARCELAS = 12;
const PARCELAS_SEM_JUROS = 3;
const TAXA_JUROS = 0.02; // 2% ao mês
// ---------- Regras de negócio (não acessam o document) ----------
// Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% ao mês
function calcularTotal(valor, parcelas) {
    if (parcelas <= PARCELAS_SEM_JUROS) {
        return valor;
    }
    return valor * (1 + TAXA_JUROS) ** parcelas;
}
// A loja não oferece 7, 8, 9 e 11 parcelas
function parcelaOferecida(parcelas) {
    return !(parcelas >= 7 && parcelas <= 9) && parcelas !== 11;
}
// Monta as linhas <tr> da tabela de parcelamento.
// A entrada é opcional: se não for informada, o valor financiado é o preço.
function simularParcelamento(preco, entrada) {
    let financiado = preco;
    if (typeof entrada !== 'undefined') {
        financiado = preco - entrada;
    }
    let linhas = '';
    for (let parcelas = 1; parcelas <= MAX_PARCELAS; parcelas++) {
        if (!parcelaOferecida(parcelas)) {
            continue; // pula as quantidades que a loja não oferece
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < PARCELA_MINIMA) {
            break; // parcela abaixo do mínimo: as opções acabam aqui
        }
        const juros = parcelas <= PARCELAS_SEM_JUROS ? 'sem juros' : '2% a.m.';
        linhas +=
            `<tr><td>${parcelas}x</td>` +
                `<td>R$ ${valorParcela.toFixed(2)}</td>` +
                `<td>R$ ${total.toFixed(2)}</td>` +
                `<td>${juros}</td></tr>`;
    }
    return linhas;
}
// ---------- Página ----------
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const tabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    tabela.innerHTML = '';
    if (Number.isNaN(preco) || preco <= 0) {
        saida.textContent = 'Informe um preço válido';
        saida.className = 'erro';
        return;
    }
    // Campo de entrada vazio: chama sem o segundo argumento
    if (campoEntrada.value === '') {
        saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
        saida.className = '';
        tabela.innerHTML = simularParcelamento(preco);
        return;
    }
    const entrada = campoEntrada.valueAsNumber;
    if (entrada < 0) {
        saida.textContent = 'Informe uma entrada válida';
        saida.className = 'erro';
        return;
    }
    if (entrada >= preco) {
        saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
        saida.className = 'sucesso';
        return;
    }
    saida.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    saida.className = '';
    tabela.innerHTML = simularParcelamento(preco, entrada);
});
export {};
//# sourceMappingURL=ex03.js.map