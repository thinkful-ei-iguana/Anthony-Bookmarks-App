//imports
import api from './api';

const store = {
	bookmarks: [],
	adding: false,
	error: null,
	filter: 0
};

const findById = function(id) {
	return store.bookmarks.find(item => item.id === id);
};

const addBookmark = function(item) {
	for (let i of store.bookmarks) {
		if (i) {
			i.expand = false;
		}
	}
	store.bookmarks.push(item);
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
	console.log(targetBookmark.expand);
};

const setAdding = function(param) {
	store.adding = param;
};

const setFilter = function(rating) {
	store.filter = rating;
};

export default {
	store,
	findById,
	addBookmark,
	expandBookmark,
	setAdding,
	setFilter
};
