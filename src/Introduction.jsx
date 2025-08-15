import React from 'react';
import './Introduction.css';

const Introduction = () => {
  return (
    <div className="intro-container">
      <div className="intro-card">
        <div className="intro-header">
          <img src="/istar.png" alt="Profile" className="profile-pic" />
          <h1>ADDY8924</h1>
          <p className="bio">React와 게임 개발에 관심이 많은 개발자입니다.</p>
        </div>
        <div className="intro-content">
          <div className="intro-section">
            <h2>관심사</h2>
            <ul>
              <li>React.js</li>
              <li>웹 게임 개발</li>
              <li>인터랙티브 웹사이트</li>
              <li>새로운 JavaScript 프레임워크 탐구</li>
            </ul>
          </div>
          <div className="intro-section">
            <h2>기술 스택</h2>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>React.js</li>
              <li>HTML5 & CSS3</li>
              <li>Vite</li>
              <li>Git & GitHub</li>
            </ul>
          </div>
          <div className="intro-section">
            <h2>프로젝트</h2>
            <p>이 웹사이트는 Vite와 React를 사용하여 만든 개인 프로젝트입니다. 레이싱 게임, 로또 번호 생성기 등 다양한 기능을 포함하고 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
