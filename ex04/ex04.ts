// Exercício 04: Meta de economia

type Formatador = (valor: number) => string;

type ResultadoMeta = { meses: number; saldo: number; depositado: number };

const LIMITE_MESES = 600; // 50 anos

// ---------- Regras de negócio (não acessam o document) ----------

// Formata um valor em reais: R$ 1234.50
const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

// Converte meses em texto: "1 ano e 7 meses", "2 anos e 1 mês", "8 meses"
const formatarMeses: (meses: number) => string = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;

  const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) {
    return textoMeses;
  }
  return resto === 0 ? textoAnos : `${textoAnos} e ${textoMeses}`;
};

// Simula mês a mês: primeiro o saldo rende, depois entra o depósito.
// Todo mês 12, 24, 36... o depósito é dobrado (13º salário).
function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoMeta {
  let saldo = 0;
  let depositado = 0;
  let meses = 0;

  while (saldo < meta) {
    if (meses === LIMITE_MESES) {
      break; // meta inalcançável em 50 anos
    }
    meses++;

    const valorDepositado = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo = saldo * (1 + taxa / 100) + valorDepositado;
    depositado += valorDepositado;
  }

  return { meses, saldo, depositado };
}

// Monta uma linha "Rótulo: valor" usando a função de formatação recebida
function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

// ---------- Página ----------

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const meta = campoMeta.valueAsNumber;
  const deposito = campoDeposito.valueAsNumber;

  // Retorno antecipado: valores vazios (NaN) ou não positivos
  if (Number.isNaN(meta) || Number.isNaN(deposito) || meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  // Rendimento vazio: chama sem o terceiro argumento (usa 0,5%)
  const resultado = campoTaxa.value === ''
    ? calcularMeses(meta, deposito)
    : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);

  if (resultado.saldo < meta) {
    saida.textContent =
      'Meta inalcançável em 50 anos.\n' +
      exibirValor(`Saldo após ${LIMITE_MESES} meses`, resultado.saldo, formatarReal);
    saida.className = 'erro';
    return;
  }

  const rendimento = resultado.saldo - resultado.depositado;
  saida.textContent =
    `Você atinge a meta em ${resultado.meses} meses (${formatarMeses(resultado.meses)}).\n` +
    exibirValor('Saldo final', resultado.saldo, formatarReal) + '\n' +
    exibirValor('Total depositado', resultado.depositado, formatarReal) + '\n' +
    exibirValor('Rendimento', rendimento, formatarReal);
  saida.className = 'sucesso';
});
