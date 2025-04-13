'use client';
import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (calculated && /\d/.test(value)) {
      setDisplay(value);
      setResult(null);
      setCalculated(false);
    } else {
      setDisplay((prev) => prev + value);
      setCalculated(false);
    }
  };

  const clear = () => {
    setDisplay('');
    setResult(null);
    setCalculated(false);
  };

  const calculate = () => {
    try {
      const res = eval(display);
      setResult(res);
      setHistory((prev) => [...prev, `${display} = ${res}`]);
      setCalculated(true);
    } catch {
      setResult('Erro');
      setCalculated(true);
    }
  };

  return (
    <main style={{
      fontFamily: 'Arial',
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      gap: '40px'
    }}>
      {/* CALCULADORA */}
      <div style={{
        padding: 20,
        width: 250,
        border: '1px solid #ccc',
        borderRadius: 10,
        background: '#f9f9f9'
      }}>
        <h2 style={{ textAlign: 'center' }}>Calculadora</h2>
        <div style={{ fontSize: 24, marginBottom: 10, color: '#333' }}>
          {display || '0'}
        </div>
        <div style={{ fontSize: 20, color: 'green', marginBottom: 10 }}>
          {result !== null ? `= ${result}` : ''}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['7', '8', '9', '/'].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)} style={buttonStyle}>{btn}</button>
          ))}
          {['4', '5', '6', '*'].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)} style={buttonStyle}>{btn}</button>
          ))}
          {['1', '2', '3', '-'].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)} style={buttonStyle}>{btn}</button>
          ))}
          {['0', '.', '+'].map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)} style={buttonStyle}>{btn}</button>
          ))}
          <button onClick={clear} style={{ ...buttonStyle, gridColumn: 'span 2', background: '#ffcccc', color: '#900' }}>C</button>
          <button onClick={calculate} style={{ ...buttonStyle, gridColumn: 'span 2', background: '#ccffcc', color: '#060' }}>=</button>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div style={{
        width: 200,
        border: '1px solid #bbb',
        borderRadius: 10,
        background: '#ddd',
        padding: 15,
        overflowY: 'auto',
        maxHeight: 350
      }}>
        <h3 style={{ color: '#222' }}>Histórico</h3>
        {history.length === 0 ? (
          <p style={{ color: '#333' }}>Nenhuma operação ainda</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map((item, index) => (
              <li key={index} style={{
                marginBottom: 6,
                padding: '6px 10px',
                background: '#fff',
                color: '#222',
                borderRadius: 4,
                boxShadow: '0 0 4px rgba(0,0,0,0.15)'
              }}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: '10px',
  fontSize: '18px',
  background: '#e6e6e6',
  border: '1px solid #aaa',
  borderRadius: '5px',
  color: '#111'
};
