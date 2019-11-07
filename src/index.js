// imports
import './styles/main.css';
import $ from 'jquery';
import 'normalize.css';
import store from './scripts/store';
import api from './scripts/api';
import handler from './scripts/handler';

const main = function() {
  api.getItems().then(res => {
    res.forEach(item => store.addBookmark(item));
    handler.render();
  });
  handler.bindEventListeners();
};

$(main);
