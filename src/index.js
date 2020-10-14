import './css/style.css';
import Post from './post';
import json from './assets/data.json';
import webpackLogo from './assets/icon-square-big.png.png';

const post = new Post("Webpack Post Title", webpackLogo);

console.log('Post to string', post.toString()); //сгенерируем экземпляр, преобразуем строчку в текст
console.log('JSON:', json);