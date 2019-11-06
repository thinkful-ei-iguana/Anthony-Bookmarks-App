//imports
import api from './api';

const store = {
	bookmarks: [
		{
			id: 'x56w',
			title: 'Title 1',
			rating: 1,
			url: 'http://www.title1.com',
			description: 'lorem ipsum dolor sit',
			expanded: false
		},
		{
			id: '6ffw',
			title: 'Title 2',
			rating: 5,
			url: 'http://www.title2.com',
			description: 'dolorum tempore deserunt',
			expanded: false
		}
	],
	adding: false,
	error: null,
	filter: 0
};

const findById = function(id) {
	return store.bookmarks.find(item => item.id === id);
};

const addBookmark = function(item) {
	for (let i = 0; i < store.bookmarks.length; i++) {
		if (store.bookmarks[i]) {
			store.bookmarks[i].expand = false;
		}
	}
	// adds bookmark to store
	store.bookmarks.push(item);
	// toggles adding state
	store.adding = false;
};

const expandBookmark = function(id) {
	//find id to expand
	let targetBookmark = findById(id);
	//toggle expand value
	if (targetBookmark.expand) {
		targetBookmark.expand = false;
	}
	else {
		targetBookmark.expand = true;
	}
};

const setFilter = function(rating) {
	store.filter = rating;
};

export default {
	store,
	findById,
	addBookmark,
	expandBookmark,
	setFilter
};
