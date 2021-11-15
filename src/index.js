import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import ListTasks from "./components/listTasks";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={ <main style={{ padding: "1rem" }}> <p>Выберите список</p> </main> } />
        <Route path=":listId" element={<ListTasks />} />
      </Route>
      <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>Страница не найдена!</p> </main> } />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
