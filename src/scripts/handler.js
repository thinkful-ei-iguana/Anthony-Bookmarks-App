//imports
import $ from 'jquery';
import store from './store';
import api from './api';

//shortened store import
const STORE = store.store;
window.store = store;

//generateItem
const generateBookmark = function(bookmark) {
  if (bookmark.expand) {
    console.log(bookmark);
    return `
    <li class='js-bookmark' data-item-id='${bookmark.id}'>
        <h2 class='title-ex'>${bookmark.title}</h2>
        <div class='rating-ex'>${bookmark.rating}</div>
        <a href='${bookmark.url}' class='site-url-ex'>visit</a>
		<p class='desc-ex'>${bookmark.desc}</p>
		<button class='delete-button'><i class="fas fa-trash-alt"></i></button>
		<button class='close-button'><i class="fas fa-times"></i></button>
    </li>
    `;
  }
  else {
    return `
    <li class="js-bookmark" data-item-id="${bookmark.id}">
      <button class="expand"><h3>${bookmark.title}</h3>
      <span>${bookmark.rating}<i class="fas fa-star"></i></span>
      </button>
    </li>
    `;
  }
};

//generates each item in the bookmarks array
const generateBookmarkString = function(array) {
  const items = array.map(item => generateBookmark(item));
  return items.join('');
};

//render
const render = function() {
  let bookmark = [
    ...STORE.bookmarks.filter(item => {
      if (item.rating >= STORE.filter) {
        return item;
      }
    })
  ];
  let bookmarkString = generateBookmarkString(bookmark);

  if (STORE.adding && !STORE.error) {
    $('.creator').html(addNewString());
    $('.add-new').hide();
  }
  else if (!STORE.adding) {
    $('.creator').html('');
    $('.add-new').show();
  }
  $('.results-list').html(bookmarkString);

  // $('.results-list').html(bookmarkString);
};

//add new bookmark form
const addNewString = function() {
  $('.creator').html(`
  <form class='inputs'>
    <label for='title'>Name</label>
        <input type='text' name='title' class='nameInput' placeholder='Google' required></input>
    <label for='url'>Site Url</label>
        <input type='text' name='url' class='urlInput' placeholder='https://Google.com' required></input>
    <label for='rating'>Rating</label>
        <input type='number' name='rating' class='ratingInput' placeholder='1-5' required></input>
    <label for='desc'>Description</label>
        <input type='text' name='desc' class='descInput' placeholder='Google is a search engine'></input>
  </form>
  <div class='buttons-row'>
    <button class="complete"><i class="fas fa-plus"></i></button>
    <button class="cancel"><i class="fas fa-times"></i></button>
  </div>
  `);
};

//add new button functionality
const addNewHandler = function() {
  $('.add-new').on('click', e => {
    e.preventDefault();
    store.setAdding(true);
    render();
    console.log(STORE.adding);
  });
};

//cancel creation button handler
const cancelCreateButton = function() {
  $('.creator').on('click', '.cancel', e => {
    e.preventDefault();
    store.setAdding(false);
    render();
    console.log(STORE.adding);
    console.log('cancel submit works');
  });
};

//serialize form inputs into one string
function serializeJson(form) {
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => (obj[name] = val));
  return JSON.stringify(obj);
}

//complete creation button handler
const createButton = function() {
  $('.creator').on('click', '.complete', e => {
    e.preventDefault();
    let counter = 0;
    counter++;
    let formElement = $('.inputs')[0];
    let value = serializeJson(formElement);
    console.log(value);
    api
      .createItem(value)
      .then(res => {
        store.addBookmark(res);
        store.setAdding(false);
        render();
      })
      .catch(error => {
        STORE.error = error.message;
        $('.error').html(`<h5>${STORE.error}</h5>`);
        setTimeout(() => $('.error').html(''), 6000);
      });

    console.log(STORE.adding);
    console.log('submit works');
  });
};

const expandItem = function() {
  $('.results-list').on('click', '.expand', e => {
    const id = getItemIdFromElement(e.currentTarget);
    store.expandBookmark(id);
    console.log(id);
    render();
  });
};

const deleteItem = function() {
  $('.results-list').on('click', '.delete-button', e => {
    e.preventDefault();
    console.log('hi');
    const id = getItemIdFromElement(e.currentTarget);
    console.log(id);
    // delete the item
    api.deleteItem(id).then(() => {
      store.findAndDelete(id);
      render();
    });
    // .catch(handleError);
    // render the updated shopping list
    render();
  });
};

const closeItem = function() {
  $('.results-list').on('click', '.close-button', e => {
    e.preventDefault();
    console.log('i wooork');
    const id = getItemIdFromElement(e.currentTarget);
    store.expandBookmark(id);
    render();
  });
};

const handleFilter = function() {
  $('.filter').change(e => {
    e.preventDefault();
    let value = $(e.currentTarget).val();
    STORE.filter = value;
    render();
  });
};

//gets id from elements for deleteing and editing
const getItemIdFromElement = function(item) {
  return $(item).closest('.js-bookmark').data('item-id');
};

//eventListeners
const bindEventListeners = function() {
  addNewHandler();
  createButton();
  cancelCreateButton();
  expandItem();
  deleteItem();
  closeItem();
  handleFilter();
};

//exports
export default {
  bindEventListeners,
  render
};
