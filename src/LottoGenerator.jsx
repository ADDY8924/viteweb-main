import React, { useState } from 'react';
import './LottoGenerator.css';

const LottoGenerator = () => {
  const [lottoNumbers, setLottoNumbers] = useState([]);

  const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    setLottoNumbers(sortedNumbers);
  };

  const getNumberColor = (number) => {
    if (number <= 10) return 'yellow';
    if (number <= 20) return 'blue';
    if (number <= 30) return 'red';
    if (number <= 40) return 'gray';
    return 'green';
  };

  return (
    <div className="lotto-container">
      <h1>Lotto Number Generator</h1>
      <button onClick={generateNumbers}>Generate Numbers</button>
      <div className="lotto-numbers">
        {lottoNumbers.map((number, index) => (
          <div key={index} className={`lotto-ball ${getNumberColor(number)}`}>
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottoGenerator;
