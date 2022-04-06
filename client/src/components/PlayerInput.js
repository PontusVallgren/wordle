import { useState } from "react";
const PlayerInput = ({ onClick, onSubmit }) => {
  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  return (
    <form className='game-form' onSubmit={onSubmit(inputText)}>
      <input
        className='textInput'
        type='text'
        value={inputText}
        placeholder='Your name'
        onChange={onChange}
      />
      <button className='submit-hs primary'>Guess</button>
    </form>
  );
};

export default PlayerInput;
