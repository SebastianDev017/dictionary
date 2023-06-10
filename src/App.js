import React, {useState, useEffect} from 'react'
import Resultado from './Resultado'


const App = () => {

  const [text, setText] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [error, setError] = useState("");
  const [word, setWord] = useState("");
  
  const dictionaryApi = (text) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
    .then(res => res.json())
    .then(result => {
      console.log(result)
      setMeanings(result[0].meanings)
      setPhonetics(result[0].phonetics)
      setWord(result[0].word)
      setError("")
    })
    .catch(err => setError(err))
  }
  
  useEffect(() => {
  if(!text.trim()) return;
  const debounce = setTimeout(() => {
    dictionaryApi(text)
  }, 800);
  return () => clearTimeout(debounce)
  }, [text])
  
  return (
  <div className="container">
    <h1>English Dictionary</h1>
    <header>
      <div className='book'>
      <i className="fa-solid fa-book"></i>
      </div>
      {/* <div className='moon'>
        <div className="cl-toggle-switch">
          <label className="cl-switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>
        <i className="fa-solid fa-moon"></i>
      </div> */}
    </header>
      <form>
        <div className='row'>
          <textarea cols="" rows="" value={text} 
          onChange={e => setText(e.target.value)} />
          <div className='search_icon'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          </div>
        </form>
{
  (text.trim() !== "" && !error) &&
  <Resultado 
  word={word}
  phonetics={phonetics}
  meanings={meanings}
  setText={setText}/>
}
    </div>
  )
}

export default App
