// imports
import './styles/main.css';
import $ from 'jquery';
import handlers from './scripts/handler';

const main = function() {
  handlers.bindEventListeners();
  handlers.render();
};

$(main);
