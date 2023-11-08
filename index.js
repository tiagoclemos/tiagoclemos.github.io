document.getElementById('pesquisar').addEventListener('click', buscar);

function buscar() {
  fetch('tl.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da solicitação');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data); 
      if (data.Clientes) { 
        exibirDados(data.Clientes); 
      } else {
        console.error('A chave "Clientes" não foi encontrada no JSON.');
      }
    })
    .catch(error => console.error('Erro ao ler tarefas:', error));
}

function exibirDados(clientes) { 
  const resultadoTbody = document.getElementById('resultado');
  resultadoTbody.innerHTML = '';

  clientes.forEach(cliente => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = cliente.id;
    
    const nomeCell = document.createElement('td');
    nomeCell.textContent = cliente.nome;
    
    const emailCell = document.createElement('td');
    emailCell.textContent = cliente.email;
    
    const foneCell = document.createElement('td');
    foneCell.textContent = cliente.telefone;


    row.appendChild(idCell);
    row.appendChild(nomeCell);
    row.appendChild(emailCell);
    row.appendChild(foneCell);
    
    resultadoTbody.appendChild(row);
  });
}
//----------------------------------

document.getElementById('criar').addEventListener('click', criarNovo);

var pessoas = [];

function criarNovo() {
  var id = document.getElementById('id').value;
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var telefone = document.getElementById('telefone').value;

  var cadastro = {
    id: id,
    nome: nome,
    email: email,
    telefone: telefone,
  };
  pessoas.push(cadastro);
  console.log(cadastro);
  adicionaNovo(cadastro);
}

function adicionaNovo(cadastro) {
  fetch('http://localhost:3000/Clientes', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(cadastro)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Dados adicionados com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao adicionar dados:', error);
    });
}
//---------------------------------

document.getElementById('apagar').addEventListener('click', apagarNovo);

function apagarNovo(){
  const taskIDtoDelete = document.getElementById('id').value;

  fetch(`http://localhost:3000/Clientes/${taskIDtoDelete}`,{
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok){
      console.log('Tarefa excluída com sucesso');
     console.log('Tarefa excluída com sucesso');
    } else {
      throw new Error(`Erro ao excluir a tarefa: ${response.status}`);
    }
  })
  .catch(error => console.error(`Erro ao excluir tarefa:`,error));
}

//----------------------------------------

const atualizarButton = document.getElementById('atualizar',buscar());

if (atualizarButton) {
  atualizarButton.addEventListener('click', atualizarCliente);
}

function atualizarCliente() {
  const idInput = document.getElementById('id');
  if (!idInput) {
    console.error('Elemento com ID "id" não encontrado.');
    return;
  }

  const id = idInput.value;

  if (!id) {
    console.error('O campo de ID está vazio.');
    return;
  }

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const updatedCliente = {
    id: id,
    nome: nome,
    email: email,
    telefone: telefone
  };

  fetch(`http://localhost:3000/Clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCliente)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da solicitação');
      }
      return response.json();
    })
    .then(data => {
      console.log();('Cliente Atualizado:', data);
    })
    .catch(error => {
      console.log();('Erro ao atualizar cliente:', error);
    });
}
