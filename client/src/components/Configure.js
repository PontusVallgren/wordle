const Configure = ({ handleChange, config, onPlay }) => {
  return (
    <div className='config-ctn'>
      <h2>Configure Game</h2>
      <form>
        <label htmlFor='wordLength'>How many letters?</label>
        <select
          name='wordLength'
          value={config.wordLength}
          onChange={handleChange}
        >
          <option value='4'>Play with 4-letters</option>
          <option value='5'>Play with 5-letters</option>
          <option value='6'>Play with 6-letters</option>
        </select>
        <label htmlFor='uniqueLetters'>
          Allow unique characters only (e.g CURLY)
        </label>
        <input
          type='checkbox'
          id='uniqueLetters'
          value='true'
          name='unique'
          onChange={handleChange}
        />
      </form>
      <button className='primary' onClick={onPlay}>
        Play!
      </button>
    </div>
  );
};

export default Configure;
