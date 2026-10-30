// Exercício 01: Situação do aluno no semestre
// ---------- Regras de negócio (não acessam o document) ----------
// Média simples das duas notas
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
// Notas entre 0 e 10 e frequência entre 0 e 100.
// Campos vazios viram NaN e também são inválidos.
function dadosValidos(n1, n2, frequencia) {
    if (Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(frequencia) ||
        n1 < 0 || n1 > 10 ||
        n2 < 0 || n2 > 10 ||
        frequencia < 0 || frequencia > 100) {
        return false;
    }
    return true;
}
// A frequência é testada primeiro: abaixo de 75% reprova
// por falta, mesmo com média alta.
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        const precisa = 10 - media;
        return `Exame final (precisa tirar ${precisa.toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
// ---------- Página ----------
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const frequencia = campoFrequencia.valueAsNumber;
    // Retorno antecipado quando os dados são inválidos
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = 'Dados inválidos';
        saida.className = 'erro';
        return;
    }
    const media = calcularMedia(n1, n2);
    const resultado = situacao(media, frequencia);
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
    // Ternário para escolher a classe CSS
    saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
export {};
//# sourceMappingURL=ex01.js.map