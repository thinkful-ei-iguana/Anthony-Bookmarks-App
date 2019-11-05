// imports
import $ from 'jquery';
import store from './store';

// default view
const defaultView = function() {
  $('main').html(`
    
    <section class='results'>
        <ul class='results-list'>
        </ul>
    </section>
  `);
};

// generateItem
const generateBookmark = function(bookmark) {
  return `
    <li class="js-bookmark" data-item-id="${bookmark.id}">
      <h3>${bookmark.title}</h3><span>${bookmark.rating}<i class="fas fa-star"></i></span>
    </li>`;
};

// generateItemString
const generateBookmarkString = function(bookmark) {
  const items = bookmark.map(item => generateBookmark(item));
  return items.join('');
};

//render
const render = function() {
  let bookmark = [ ...store.store.bookmarks ];

  let bookmarkString = generateBookmarkString(bookmark);

  if (store.error) {
    bookmarkString = `<div><h5>${store.error}</h5></div>` + bookmarkString;
  }
  // insert that HTML into the DOM
  $('.results-list').html(bookmarkString);
};

const addNewString = function() {
  $('.creator').html(`
  <form class='inputs'>
    <label for='nameInput'>Name</label>
        <input type='text' name='nameInput' class='nameInput' placeholder='Google' required></input>
    <label for='urlInput'>Site Url</label>
        <input type='text' name='urlInput' class='urlInput' placeholder='https://Google.com' required></input>
    <label for='ratingInput'>Rating</label>
        <input type='number' name='ratingInput' class='ratingInput' placeholder='1-5' required></input>
    <label for='descInput'>Description</label>
        <input type='text' name='descInput' class='descInput' placeholder='Google is a search engine'></input>
  </form>
  <div class='buttons-row'>
    <button class="complete"><i class="fas fa-plus"></i></button>
    <button class="cancel"><i class="fas fa-times"></i></button>
  </div>
  `);
};

// add new button functionality
const addNewHandler = function() {
  $('.add-new').on('click', e => {
    e.preventDefault();
    console.log('create works');
    addNewString();
  });
};

const createButton = function() {
  $('.creator').on('click', '.complete', e => {
    e.preventDefault();
    console.log('submit works');
  });
};

const cancelCreateButton = function() {
  $('.creator').on('click', '.cancel', e => {
    e.preventDefault();
    console.log('cancel submit works');
  });
};

//eventListeners
const bindEventListeners = function() {
  addNewHandler();
  createButton();
  cancelCreateButton();
};

// exports
export default {
  defaultView,
  bindEventListeners,
  render
};
