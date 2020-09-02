import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  },[])
  

  async function handleAddRepository() {
    const response = await api.post("repositories",{
      title:  `My app version ${Date.now()}`, 
      url:   "https://github.com/rocketseat-education/gostack-template-conceitos-nodejs.git", 
      techs: ["Giulia Lage", "Gustavo Lage"]
    })

    const {data} = response;
    setRepositories([...repositories, data])

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
    
    var cloneRepositories = [...repositories]
    const repositoryIndex = cloneRepositories.findIndex(element => element.id === id)
   
    cloneRepositories.splice(repositoryIndex, 1)
    
    setRepositories(cloneRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) =>{ 
        return (<li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
      })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
