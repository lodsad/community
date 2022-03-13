import React from 'react';
import './App.css';
// import styles from "./module/App.module.css";
import { Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
// import ShowPosts from './component/ShowPosts';
// import ShowPost from './component/ShowPost';
import WritePost from './component/WritePost';
import ShowBodyBox from './component/ShowBodyBox';

export default function App(){

  return (
    <BrowserRouter>
      <div className="App">
        <Link to={"/"} className="front_img" style={{color: "green"}}>Cafe</Link>
        <Routes>

          <Route exact path="/*" element={<ShowBodyBox/>}/>

          <Route exact path="/writepost" element={<WritePost/>} />
            {/* 글쓰기 컴포넌트 제작 필요 */}
            
          {/* <Route element={<ShowBodyBox/>}/> */}
            {/* 글쓰기 제외하고는 전부 시작페이지로 이동 */}

        </Routes>
        
      </div>
    </BrowserRouter>
  )
};
