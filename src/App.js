/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

const inputSection = css`
  grid-auto-flow: row;
  font-family: ubuntu300;
`;

const container = css`
  background-color: black;
`;

const backGround = css`
  background-size: 100%;
  flex-wrap: wrap;
  background-image: linear-gradient(
    to left top,
    #41dad1,
    #00b8c8,
    #0095b9,
    #0073a2,
    #005185,
    #005388,
    #00568a,
    #00588d,
    #007fb0,
    #00a8cd,
    #06d2e2,
    #5ffbf1
  );
`;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const responseData = await response.json();
        setData(responseData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData().catch(() => {});
  }, [data]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [inputUp, setInputUp] = useState('');
  const [inputDown, setInputDown] = useState('');

  const [dropdown, setDropdown] = useState('aag');

  const [url, setUrl] = useState(
    `https://api.memegen.link/images/${dropdown ? dropdown : 'aag'}/${
      inputDown ? inputDown : '_'
    }/${inputUp ? inputUp : ''}.png`,
  );

  return (
    <div className="menu-container">
      <container css={container}> </container>
      <div css={backGround}>
        <h1>Memegenerator</h1>
        <label
          style={{
            fontWeight: 'bolder',
          }}
        >
          {' '}
        </label>
        <div css={inputSection}>
          Meme Template:
          <br />
          <select
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                setUrl(event.currentTarget.value);
              }
            }}
            onChange={(event) => {
              setDropdown(event.currentTarget.value);
            }}
            placeholder="Select"
          >
            {' '}
            {data.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              setUrl(
                `https://api.memegen.link/images/${dropdown}/${inputUp}/${inputDown}.png`,
              )
            }
          >
            Generate
          </button>
          {''}{' '}
          <label>
            <br />
            <br />
            Top Text
            <br />
            <input
              onChange={(event) => {
                setInputDown(event.currentTarget.value);
              }}
              value={inputDown}
            />
            <br />
          </label>
          <br />
          <br />
          Bottom Text
          <br />
          <label>
            {' '}
            <input
              onChange={(event) => {
                setInputUp(event.currentTarget.value);
              }}
              value={inputUp}
            />
          </label>
        </div>
        <div>
          <img
            style={{ height: '300px' }}
            data-test-id="meme-image"
            src={`https://api.memegen.link/images/${
              dropdown ? dropdown : 'aag'
            }/${inputDown ? inputDown : '_'}/${inputUp ? inputUp : ''}.png`}
            alt=" "
          />
          <button onClick={() => setInputDown('')(setInputUp(''))}>
            Clear
          </button>
          <button
            onClick={() =>
              saveAs(url, `${dropdown}-${inputUp}-${inputDown}.png`)
            }
          >
            Download Image
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;