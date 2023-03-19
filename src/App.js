import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [pkmnName, setPkmnName] = useState("");
  const [pkmnChosen, setPkmnChosen] = useState(false);
  const [pkmn, setPkmn] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPkmn = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
      .then(response => 
        setPkmn({
          name: pkmnName, 
          species: response.data.species.name, 
          img: response.data.sprites.front_default, 
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        }));
        setPkmnChosen(true);
  }

  return (
    <div className="App">
      <div className='TitleSection'>
        <h1> Pokémon Stats </h1>
        <input type="text" onChange={(e) => {setPkmnName(e.target.value)}}></input>
        <button type="button" onClick={searchPkmn}> Search Pokémon </button>
      </div>
      <div className='DisplaySection'>
        {!pkmnChosen ? (
          <h1>Please choose a Pokémon</h1>
        ) : (
          <>
            <h1> {pkmn.name} </h1>
            <img src={pkmn.img}></img>
            <h3> Type: {pkmn.type} </h3>
            <h4> HP: {pkmn.hp} </h4>
            <h4> Attack: {pkmn.attack} </h4>
            <h4> Defense: {pkmn.defense} </h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
