/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

const inputSection = css`
  grid-auto-flow: row;
  font-family: ubuntu300;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    width: 100px;
    margin: 10px 20px;
  }
  input {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  label {
    margin-left: 20px;
  }
  img {
    width: 500px;
  }
`;

const backGround = css`
  background-size: contain;
  margin-top: -25px;
  height: 1000px;
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
      } catch (error) {}
    }
    fetchData().catch(() => {});
  }, []);

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
    <div css={backGround} className="menu-container">
      <div>
        <div>
          <div>
            <h1>Memegenerator</h1>
          </div>
          {/* <label
            style={{
              fontWeight: 'bolder',
            }}
          >
            {' '}
          </label> */}
          <div css={inputSection}>
            <label>
              Meme template
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
            </label>
            <button
              onClick={() =>
                setUrl(
                  `https://api.memegen.link/images/${dropdown}/${inputUp}/${inputDown}.png`,
                )
              }
            >
              Generate
            </button>
            {''} <br />
            <br />
            <label>
              Top text
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
            <label>
              Bottom text
              <br />
              <input
                onChange={(event) => {
                  setInputUp(event.currentTarget.value);
                }}
                value={inputUp}
              />
            </label>
          </div>
          <div css={inputSection}>
            <img
              style={{ height: '300px' }}
              data-test-id="meme-image"
              src={`https://api.memegen.link/images/${
                dropdown ? dropdown : 'aag'
              }/${inputDown ? inputDown : '_'}/${inputUp ? inputUp : ''}.png`}
              alt=" "
            />
            <div>
              {/* <button onClick={() => setInputUp('')(setInputDown(''))}>
                Clear
              </button> */}
            </div>
            <button
              onClick={() =>
                saveAs(url, `${dropdown}-${inputUp}-${inputDown}.png`)
              }
            >
              Download
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
