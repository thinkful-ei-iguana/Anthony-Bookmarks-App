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
      <h3>${bookmark.title}</h3><span>${bookmark.rating}</span>
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
  $('main').html(bookmarkString);
};

// add new button functionality
const addNewHandler = function() {
  $('.add-new').on('click', e => {
    e.preventDefault();
    console.log('create works');
  });
};

const createButton = function() {
  $('.createItem').submit('.pushItem', e => {
    e.preventDefault();
    console.log('submit works');
  });
};

//eventListeners
const bindEventListeners = function() {
  addNewHandler();
  createButton();
};

// exports
export default {
  defaultView,
  bindEventListeners,
  render
};
