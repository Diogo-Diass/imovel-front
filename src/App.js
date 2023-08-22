
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const obterCep = async () => {

    

   const cep = document.getElementById("cep").value

   if(cep.size < 7){

    alert("MININo 7 caracteres")
   }

   console.log(cep)
 

  const buscarCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  const endereco = await buscarCep.json()

  console.log(endereco)

  sessionStorage.setItem("endereco", JSON.stringify(endereco))

  let logradouro = document.getElementById("logradouro").value = endereco.logradouro

  let cidade = document.getElementById("cidade").value = endereco.localidade
  
  let estado = document.getElementById("estado").value = endereco.uf

  let bairro = document.getElementById("bairro").value = endereco.bairro

  let bairroSite = document.getElementById("bairroSite").value = endereco.bairro

 
     
}


  const cadastroCondominio = async (event)  => {

    const formData = new FormData(event.target)

    const dado = Object.fromEntries(formData)


    const condominio = {

      nome: dado.nome,
      cep: dado.cep,
      estado: dado.estado,
      cidade: dado.cidade,
      logradouro: dado.logradouro,
      numero: dado.numero,
      bairro: dado.bairro,
      bairroSite: dado.bairroSite
      
    }

    const result = await fetch("http://localhost:8080/api/condominio", {

      method: "POST",
      body: JSON.stringify(condominio),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      
    },


    })
    
    if(result){

    }

  }

  useEffect(() => {

    atualizaLista()
  })



  const [apar, setApar] = useState([])

  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/condominio", {
       
    }); // await = espera uma promessa
    const resultado = await result.json();
    setApar(resultado);

  }

  let endereco = sessionStorage.getItem("endereco")

 endereco = JSON.parse(endereco)

  

  return (

    

    <div className="App">
    
          <>

      <form className='condominio' onSubmit={cadastroCondominio}>

      <input placeholder="informe o nome do condominio" name='nome'/>

      <input placeholder="informe o cep do condominio" name='cep' id='cep' onBlur={obterCep} minLength={7}/>

      <input placeholder="Logradouro" name='logradouro' id='logradouro' />

      <input placeholder="Numero" name='numero'/>

      <input placeholder="Bairro" name='bairro' id="bairro"/>

      <input placeholder="Bairro do Site"name='bairroSite' id='bairroSite'/>

      <input placeholder="Cidade " name='cidade' id="cidade"/>

      <input placeholder='Estado' name='estado' id="estado"/>

      <button>Enviar</button>


      </form>

     
        
      {

        apar.map((condominio) => (

          <div className='lista'>
          <section>ID: <p> {condominio.id}</p></section> 
          <section>Nome:<p> {condominio.nome}</p></section>
          <section>Logradouro: <p>{condominio.logradouro}</p></section>
          <section>Cidade: <p>{condominio.cidade}</p></section>
          <section>Estado: <p>{condominio.estado}</p></section>
          <section>Bairro: <p>{condominio.bairro}</p></section>
          <section>Número: <p>{condominio.numero}</p></section>
          </div>

        ))
      }


      </>
    </div>
  );
}

export default App;
