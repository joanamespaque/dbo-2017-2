const divResultado = document.querySelector('div#resultado');
const textarea = document.querySelector('textarea');
const divPalavra = document.querySelector('div.palavra');
const remove = document.querySelector('button');
function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(palavra) { // cep: 96201460
  const url = `http://dicionario-aberto.net/search-json/${palavra}`;
  ajax(url, function (e) {
    const string = JSON.stringify(e.target.response);
    console.log(JSON.parse(e.target.response));
    console.log(string);
    let i = string.indexOf('def');
    let f = string.indexOf('}', i + 1);
    console.log(string.substring(i + 8, f));
    printa(string.substring(i + 10, f - 2), palavra);
  });
}

function printa(json, palavra) {
  divResultado.innerHTML = json;
  divPalavra.innerHTML = palavra;
}
document.addEventListener('keydown', onkeydown);

const espacos = [];
  remove.addEventListener('click', function (e) {
    espacos.length = 0;
    printa('', '');
  });
function onkeydown(e) {
  let start = textarea.selectionStart;
  if (textarea.value.length > 0) {
    if (e.keyCode === 32) {
      espacos.push(start);
    }
  } else{
    printa('', '');
  }
}
textarea.addEventListener('click', function (e) {
  let start = textarea.selectionStart;
  if(textarea.value.charAt(start) === ' ') {
    printa('', '');
  } else {
    if (espacos.length === 0) {
      busca(textarea.value);
    } else {
      if (start > espacos[espacos.length - 1]) {
        busca(textarea.value.substring(espacos[espacos.length - 1] + 1, textarea.length));
      } else {
            for (let c = 0; c < espacos.length; c++) {
              if (espacos[c] > start) {
                console.log(textarea.value.substring(espacos[c - 1] + 1, espacos[c]));
                busca(textarea.value.substring(espacos[c - 1] + 1, espacos[c]));
                c = espacos.length;
              }
            }
        }
    }
  }
});
