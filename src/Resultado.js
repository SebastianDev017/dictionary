import React from 'react'

const Resultado = ({word, phonetics, meanings, setText}) => {
  return (
    <ul>
        <li className='word'>
            <h2>{word}</h2>
            {
                phonetics.map((phonetic, index) => (
                    <span key={index}>{phonetic.text}</span>
                ))
            }
        </li>
{
    meanings.map((meaning, index) => (
    <li>
        <h3>noun</h3>
        <hr className='noun_hr' />
        <div className='details meaning'>
            <h3>Meanings</h3>
            {
                meaning.definitions.map((definition, index) => (
                    <p key={index}>-{definition.definition} </p>
                ))
            }
        </div>
        {
        meaning.synonyms.length !== 0 && 
        <div className='details synonyms'>
            <h3>Synonyms</h3>
            {
                meaning.synonyms.map((synonym, index) => (
                    <li key={index}
                    onClick={() => setText(synonym)}>{`${synonym}`} </li>
                ))
            }
        </div>
        }
            </li>
            ))
        }
</ul>
)}

export default Resultado

