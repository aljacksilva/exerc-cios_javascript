//Capturar evento submit do formulário
const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResultado('Peso inválido!',false);
        return;
    }

    if (!altura) {
        setResultado('Altura inválido!', false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc =  getNivelImc(imc);
    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true);
});

function getNivelImc (imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

function getImc (peso, altura) {
    const imc =  peso / altura ** 2;
    return imc.toFixed(2);
} 

function criaP () {
    const p = document.createElement('p');
    return p;
}

function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    
    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}


const h2 = document.querySelector('.container h2');
const data = new Date();

function getDiaSemanaTexto(diaSemana) {
  const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 
    'sexta', 'sábado'];
  return diasSemana[diaSemana];
}

function getNomeMes(numeroMes) {
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maior', 'junho', 
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  return meses[numeroMes];
}

function zeroAEsquerda (num) {
  return num >= 10 ? num : `0${num}`;
}

function criaData(data) {
  const diaSemana = data.getDay();
  const numeroMes = data.getMonth();

  const nomeDia = getDiaSemanaTexto(diaSemana);
  const nomeMes = getNomeMes(numeroMes);

  return (
    `${nomeDia}, ${data.getDate()} de ${nomeMes}` + 
    ` de ${data.getFullYear()} ` + 
    `${zeroAEsquerda(data.getHours())}:${zeroAEsquerda(data.getMinutes())}`
  );
}

h2.innerHTML = criaData(data);


// const h2 = document.querySelector('.container h2');
// const data = new Date();
// h2.innerHTML = data.toLocaleDateString('pt-BR', { dateStyle: 'full', timeStyle: 'short'});

// const elementos = [
//   {tag: 'p', texto: 'Frase 1'},
//   {tag: 'div', texto: 'Frase 2'},
//   {tag: 'footer', texto: 'Frase 3'},
//   {tag: 'section', texto: 'Frase 4'},
// ];

// const container = document.querySelector('.container');
// const div = document.createElement('div');

// for (let i = 0; i < elementos.length; i++) {
//   let { tag, texto } = elementos[i];
//   let tagCriada = document.createElement(tag);
//   tagCriada.innerText = texto;
//   div.appendChild(tagCriada);
// }

// container.appendChild(div);




// const paragrafos = document.querySelector('.paragrafos');
// const ps = document.querySelectorAll('p');

// const estiloBody = getComputedStyle(document.body);
// const backgroundColorBody =  estiloBody.backgroundColor;
// console.log(backgroundColorBody);

// for (let p of ps) {
//   p.style.backgroundColor =  backgroundColorBody;
//   p.style.color = 'white';
// }

function timer() {

  function getTimeFromSeconds(seconds) {
    const data = new Date(seconds * 1000);
    return data.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    });
  }

  const relogio = document.querySelector('.relogio');

  let segundos = 0;
  let timer;

  function iniciarRelogio() {
    timer = setInterval(function() {
      segundos++;
      relogio.innerHTML = getTimeFromSeconds(segundos);
    }, 1000)
  }

  document.addEventListener('click', function(e){
    const el = e.target;

    if (el.classList.contains('zerar')) {
      clearInterval(timer);
      relogio.innerHTML = '00:00:00';
      relogio.classList.remove('pausado');
      segundos = 0;
    }

    if (el.classList.contains('iniciar')) {
      relogio.classList.remove('pausado');
      clearInterval(timer);
      iniciarRelogio(); 
    }

    if (el.classList.contains('pausar')) {
      clearInterval(timer);
      relogio.classList.add('pausado');
    }
  });

}
timer();

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaIunput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('tittle', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(texttoInput) {
  const li = criaLi();
  li.innerHTML =  texttoInput;
  tarefas.appendChild(li);
  limpaIunput();
  criaBotaoApagar(li);
  salvaTarefas();
}

btnTarefa.addEventListener('click', function() {
  if(!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvaTarefas();
  }
}); 

function salvaTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto =  tarefaTexto.replace('Apagar', '');
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSlvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

adicionaTarefasSlvas();

//factory function
/*
function criaCalculadora(){
  return {
    display: document.querySelector('.display'),

    inicia() {
      this.cliqueBotoes();
      this.pressionaEnter();
    },

    pressionaEnter(){
      this.display.addEventListener('keyup', e => {
        if(e.keyCode === 13){
          this.realizaConta();
        }
      });
    },

    realizaConta(){
      let conta = this.display.value;

      try {
        conta = eval(conta);

        if(!conta){
          alert('Conta inválida!');
          return;
        }

        this.display.value = String(conta);
      } catch (error) {
        alert('Conta inválida!');
        return;
      }
    },

    clearDisplay(){
      this.display.value = '';
    },

    apagaUm(){
      this.display.value =  this.display.value.slice(0, -1);
    },

    cliqueBotoes() {
      document.addEventListener('click', e => {
        const el = e.target;

        if(el.classList.contains('btn-num')) {
          this.btnParaDispaly(el.innerText);
        }
        if(el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }
        if(el.classList.contains('btn-del')){
          this.apagaUm();
        }
        if(el.classList.contains('btn-eq')){
          this.realizaConta();
        }
      });
    },

    btnParaDispaly(valor){
      this.display.value += valor;
    },
  }
}

const calculadora = criaCalculadora();
calculadora.inicia();
*/

// Constructor function

function Calculadora(){
  this.display = document.querySelector('.display');

  this.inicia = () => {
    this.capturaCliques();
    this.capturaEnter();
  };

  this.capturaEnter = () => {
    document.addEventListener('keyup', e => {
      if (e.keycode === 13) {
        this.realizaConta();
      }
    });
  };

  this.capturaCliques = () => {
    document.addEventListener('click', event => {
      const el = event.target;
      if (el.classList.contains('btn-num')) this.addNumDisplay(el);
      if (el.classList.contains('btn-clear')) this.clear();
      if (el.classList.contains('btn-del')) this.del();
      if (el.classList.contains('btn-eq')) this.realizaConta();
    });
  };

  this.realizaConta = () => {
    try {
      const conta = eval(this.display.value);

      if(!conta) {
        alert('Conta inválida');
        return;
      }
      
      this.display.value = conta;
    } catch (error) {
      alert('Conta inválida!');
      return;
    }
  };

  this.addNumDisplay = (el) => {
    this.display.value += el.innerText;
    this.display.focus();
  }
  this.clear = () => this.display.value = '';
  this.del = () => this.display.value = this.display.value.slice(0, -1);
}

const calculadora = new Calculadora();
calculadora.capturaCliques();

//Formulário
class ValidaFormulário {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas){
      alert('Formulário enviado');
      this.formulario.submit();
    }
  }

  senhasSaoValidas(){
    let valid = true;
    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value){
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais');
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais');
    }
    if(senha.value.length < 6 || senha.value.length > 12){
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres');
    }

    return valid;
  }

  camposSaoValidos(){
    let valid = true;

    for(let erroText of this.formulario.querySelectorAll('.erro-text')){
      erroText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')){
      const label = campo.previousElementSibling.innerText;
      if(!campo.value){
        this.criaErro(campo, `Campo "${label}" não pode estar em branco`);
        valid = false;
      }
      if(campo.classList.contains('cpf')){
        if(!this.validaCPF(campo)) valid = false;
      }
      if(campo.classList.contains('usuario')){
        if(!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  validaUsuario(campo){
    const usuario = campo.value;
    let valid = true;
    
    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisa conter apenas e números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()){
      this.criaErro(campo, 'CPF inválido');
      return false;
    }
    return true;
  }
      
  criaErro(campo, msg){
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erro-text');
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulário();