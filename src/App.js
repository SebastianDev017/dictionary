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
 
    function toggleDark(){
      const body = document.querySelector("body");
      const toggleBtn = document.getElementById("toggle");
  
      toggleBtn.addEventListener("click", function(){
        if (toggleBtn.checked) {
          body.classList.add("black")
          body.classList.remove("light")
        } else {
          body.classList.add("light")
          body.classList.remove("black")
        }
      })
      const textarea = document.querySelector('textarea');

      textarea.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
    }
    toggleDark();
    if(!text.trim()) return;
    const debounce = setTimeout(() => {
      dictionaryApi(text)
    }, 500);
    return () => clearTimeout(debounce)
  }, [text])
  
    
  return (
  <div className="container" id='container'>
    <h1>English Dictionary</h1>
    <header>
      <div className='book'>
      <i className="fa-solid fa-book"></i>
      </div>
      <div className='moon'>
        <div className="cl-toggle-switch">
          <label className="cl-switch">
            <input type="checkbox" id='toggle' />
            <span></span>
          </label>
        </div>
        <i className="fa-solid fa-moon"></i>
      </div>
    </header>
      <form>
        <div className='row'>
        <textarea cols="1" rows="1" value={text} 
        onChange={e => setText(e.target.value)} id='textarea' />
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