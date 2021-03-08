// Pega o array de locais de trabalho salvos na sessão 'arrLocaisTrabalho'
function getArrLocaisTrabalho() {
  return JSON.parse(sessionStorage.getItem('arrLocaisTrabalho') || '[]');
}

// Salva um array de locais de trabalho salvos na sessão 'arrLocaisTrabalho'
function gravaArrLocaisTrabalho(arrLocaisTrabalho) {
  sessionStorage.setItem(
    'arrLocaisTrabalho',
    JSON.stringify(arrLocaisTrabalho)
  );
}

// Atribui o valor do array de locais de trabalho salvos na sessão 'arrLocaisTrabalho',
//  para a variável local arrLocaisTrabalho
var arrLocaisTrabalho = getArrLocaisTrabalho();

// Função de Geração de Tabela, de acordo com a manipulação dos dados persistidos na sessão.
function geraTabela(table, data) {
  var num = 0;
  var contaTec = 0;
  for (let element of data) {
    let row = table.insertRow();
    contaTec = 0;
    for (key in element) {
      let cell = row.insertCell();
      if (contaTec == 2) {
        // Add Button de Edição
        var editaBotao = document.createElement('button');
        editaBotao.setAttribute('onClick', 'editInput(this)');
        editaBotao.setAttribute('class', 'btn');
        editaBotao.setAttribute('type', 'button');
        editaBotao.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editaBotao.setAttribute('id', 'edit_' + num);
        cell.appendChild(editaBotao);

        // Add Button de Exclusão
        var delBotao = document.createElement('button');
        delBotao.setAttribute('onClick', 'excluiCell(this)');
        delBotao.setAttribute('class', 'btn_del');
        delBotao.setAttribute('type', 'button');
        delBotao.innerHTML = '<i class="fas fa-trash-alt"></i>';
        delBotao.setAttribute('id', 'remove_' + num);
        cell.appendChild(delBotao);

        // Add Button de Confirmação
        var confBotao = document.createElement('button');
        confBotao.setAttribute('onClick', 'confirmEdit(this)');
        confBotao.innerHTML = '<i class="fas fa-check"></i>';
        confBotao.setAttribute('class', 'btn_conf');
        confBotao.setAttribute('type', 'button');
        confBotao.setAttribute('id', 'confirm_' + num);
        confBotao.style.display = 'none';
        cell.appendChild(confBotao);

        // Add Button de Cancelar Edição
        var cancBotao = document.createElement('button');
        cancBotao.setAttribute('onClick', 'cancelEdit(this)');
        cancBotao.innerHTML = '<i class="fas fa-times"></i>';
        cancBotao.setAttribute('class', 'btn_canc');
        cancBotao.setAttribute('type', 'button');
        cancBotao.setAttribute('id', 'cancelling_' + num);
        cancBotao.style.display = 'none';
        cell.appendChild(cancBotao);
      } else if (contaTec == 1) {
        // Adiciona um input text para as opções de Local de Trabalho.
        var insere = document.createElement('INPUT');
        insere.setAttribute('type', 'text');
        insere.setAttribute('disabled', true);
        insere.setAttribute('id', key + '_' + num);
        insere.value = element[key];
        cell.appendChild(insere);
      } else {
        // Adiciona um select para as opções de Prédio.
        var select = document.createElement('SELECT');
        select.setAttribute('disabled', true);
        select.setAttribute('id', key + '_' + num);

        for (var i = 0; i < 3; i++) {
          var opcao = document.createElement('option');
          opcao.setAttribute('value', 'Predio ' + (i + 1));
          opcao.innerHTML = 'Predio ' + (i + 1);
          select.appendChild(opcao);
        }

        select.value = element[key] || 'Predio 1';
        cell.appendChild(select);
      }
      contaTec++;
    }
    num++;
  }
}

let table = document.querySelector('table');
let data = Object.keys(arrLocaisTrabalho[0]);

geraTabela(table, arrLocaisTrabalho);

function limpaTabela() {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

function insereLocal() {
  let predio = document.getElementById('txtpredio').value;
  let local = document.getElementById('txtlocal').value;

  if (!predio || !local) {
    alert('TODOS OS CAMPOS SAO OBRIGATORIOS');
    return;
  }

  arrLocaisTrabalho.push({
    predio: predio,
    local_de_trabalho: local,
    edit: false,
  });
  gravaArrLocaisTrabalho(arrLocaisTrabalho);
  limpaTabela();
  geraTabela(table, arrLocaisTrabalho);
}

function editInput(element) {
  var elementId = element.id.split('_')[1];
  console.log('Edit on ' + elementId);

  let predio = document.getElementById('predio_' + elementId);
  let localDeTrabalho = document.getElementById(
    'local_de_trabalho_' + elementId
  );
  let editaBotao = document.getElementById('edit_' + elementId);
  let delBotao = document.getElementById('remove_' + elementId);
  let confBotao = document.getElementById('confirm_' + elementId);
  let cancBotao = document.getElementById('cancelling_' + elementId);

  predio.disabled = false;
  localDeTrabalho.disabled = false;

  editaBotao.style.display = 'none';
  delBotao.style.display = 'none';
  confBotao.style.display = 'inline';
  cancBotao.style.display = 'inline';
}

function excluiCell(element) {
  var index = element.id.split('_')[1];
  console.log(arrLocaisTrabalho);
  arrLocaisTrabalho.splice(index, 1);
  gravaArrLocaisTrabalho(arrLocaisTrabalho);
  limpaTabela();
  geraTabela(table, arrLocaisTrabalho);
}

function cancelEdit(element) {
  var elementId = element.id.split('_')[1];

  let predio = document.getElementById('predio_' + elementId);
  let localDeTrabalho = document.getElementById(
    'local_de_trabalho_' + elementId
  );
  let editaBotao = document.getElementById('edit_' + elementId);
  let delBotao = document.getElementById('remove_' + elementId);
  let confBotao = document.getElementById('confirm_' + elementId);
  let cancBotao = document.getElementById('cancelling_' + elementId);

  predio.disabled = true;
  localDeTrabalho.disabled = true;

  editaBotao.style.display = 'inline';
  delBotao.style.display = 'inline';
  confBotao.style.display = 'none';
  cancBotao.style.display = 'none';

  limpaTabela();
  geraTabela(table, arrLocaisTrabalho);
}

function confirmEdit(element) {
  var elementId = element.id.split('_')[1];

  let predio = document.getElementById('predio_' + elementId);
  let localDeTrabalho = document.getElementById(
    'local_de_trabalho_' + elementId
  );
  let editaBotao = document.getElementById('edit_' + elementId);
  let delBotao = document.getElementById('remove_' + elementId);
  let confBotao = document.getElementById('confirm_' + elementId);
  let cancBotao = document.getElementById('cancelling_' + elementId);

  predio.disabled = true;
  localDeTrabalho.disabled = true;

  editaBotao.style.display = 'inline';
  delBotao.style.display = 'inline';
  confBotao.style.display = 'none';
  cancBotao.style.display = 'none';

  arrLocaisTrabalho[elementId].predio = predio.value;
  arrLocaisTrabalho[elementId].local_de_trabalho = localDeTrabalho.value;
  gravaArrLocaisTrabalho(arrLocaisTrabalho);
}
