//imports
import $ from 'jquery';
import store from './store';
import api from './api';

//shortened store import
const STORE = store.store;

//generateItem
const generateBookmark = function(bookmark) {
	if (bookmark.expanded) {
		return `
    <li class='js-bookmark' data-item-id='${bookmark.id}'>
        <h2 class='expandedTitle'>${bookmark.title}</h2>
        <div class='rating-ex'>${bookmark.rating}</div>
        <a href='${bookmark.url}' class='site-url-ex'>visit</a>
        <p class='desc-ex'>${bookmark.description}</p>
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
	let bookmark = [ ...STORE.bookmarks ];
	let bookmarkString = generateBookmarkString(bookmark);

	if (store.error) {
		bookmarkString = `<div><h5>${store.error}</h5></div>` + bookmarkString;
	}

	if (STORE.adding) {
		$('.creator').html(addNewString());

		STORE.adding = false;
	}
	else if (!STORE.adding) {
		$('.results-list').html(bookmarkString);
	}

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
    <label for='description'>Description</label>
        <input type='text' name='description' class='descInput' placeholder='Google is a search engine'></input>
  </form>
  <div class='buttons-row'>
    <button class="complete"><i class="fas fa-plus"></i></button>
    <button class="cancel"><i class="fas fa-times"></i></button>
  </div>
  `);
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
		api.createItem(value).then(res => {
			store.addBookmark(res);
			render();
		});
		render();
		console.log('submit works');
	});
};

//add new button functionality
const addNewHandler = function() {
	$('.add-new').on('click', e => {
		e.preventDefault();
		if (!STORE.adding) {
			STORE.adding = true;
		}
		render();
		console.log(STORE.adding);
	});
};

//cancel creation button handler
const cancelCreateButton = function() {
	$('.creator').on('click', '.cancel', e => {
		e.preventDefault();
		store.toggleAdding();
		render();
		console.log(STORE.adding);
		console.log('cancel submit works');
	});
};

const expandItem = function() {
	$('.results-list').on('click', '.expand', e => {
		console.log('expand was clicked');
		const id = getItemIdFromElement(e.currentTarget);
		store.expandBookmark(id);
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
};

//exports
export default {
	bindEventListeners,
	render
};
