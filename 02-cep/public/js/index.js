const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const input = document.querySelector('input');
form.addEventListener('submit', function (e) {
  busca(form.cep.value);
  e.preventDefault();
});
function digita (evento) {
  let start = input.selectionStart;
  if ((evento.keyCode >= 48) && (evento.keyCode <= 57) || (evento.keyCode === 8)) {
    // if (start <= 8) {
    //   if (evento.keyCode === 8) {
    //     input.value = input.value.substring(0, start) + '0' + input.value.substring(start + 1);
    //     input.selectionEnd = start + 1;
    //   } else {
    //     input.value = input.value.substring(0, start) + String.fromCharCode(evento.keyCode) + input.value.substring(start + 1);
    //     input.selectionEnd = start + 1;
    //   }
    //   if(start === 8) {
    //     input.value = input.value.substring(0, 8);
    //   }
      return true;
    // }
  } else {
    return false; 
  }
}
function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}
function busca(cep) { // cep: 96201460
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function (e) {
    const string = JSON.stringify(e.target.response);
    if (string.indexOf('erro') != -1) {
      erro('CEP não encontrado');
      document.querySelector('table').innerHTML = '';
    } else {
      document.querySelector('div.mensagem').innerHTML = '';
      printa(JSON.parse(e.target.response));
    }
    console.log(JSON.parse(e.target.response));
  });
}
function printa(json) {
  const template = scriptTemplate.innerText;
  const handlebars = Handlebars.compile(template);
  const html = handlebars(json);
  divResultado.innerHTML = html;
}
function erro(mensagem) {
  const source = document.querySelector('#errocep').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({
    mensagem: mensagem
  });
  document.querySelector('div.mensagem').innerHTML = html;
}