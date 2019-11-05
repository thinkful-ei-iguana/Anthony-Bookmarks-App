// imports
import $ from 'jquery';

// default view
const defaultView = function() {
  $('body').html(`
  <main class='deafult'>
  <h1 class='header'>my bookmarks</h1>
  <form class='inputs'>
  <button class='createbutton' value=${placeholder}>create</button>
  <button class='filterbutton' value=${placeholder}>create</button>
  </form>
  <section class='results'>
  <ul class='results-list>
  </ul>
  </section>
  </main>
  `);
};

defaultView();

// exports
export default {
  defaultView
};
