const Stopwatch = ({ time }) => {
  return (
    <div className='stopwatch'>
      {`${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${(
        "0" + Math.floor((time / 1000) % 60)
      ).slice(-2)}`}
    </div>
  );
};

export default Stopwatch;
