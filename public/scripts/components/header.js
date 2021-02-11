$(() => {
  window.header = {};

  const $header = $('.page-header');
  
  const loadHeader = function(user) {
    $header.find('.navigation-bar').empty();
    let navBar;

    if (!user) {
      navBar = `
        <div id ="logo-links-and-name">
          <div id ="logo">
            <img src ="https://64.media.tumblr.com/294fcb5cb69d7bb052b94d82f686b7c8/tumblr_pmrd24Nz3a1qkm0xd_400.jpg" alt = "logo">
          </div>
          <div id ="links-and-name">
            <div id="company-name">
              <h3>
                Buy And Sell !
              </h3>
            </div>
            <div id ="links">
              <ol>
                <a class="nav-login">Login</a>
                <a class="nav-register">Register</a>
                <a class="nav-item-list">Items</a>
                <a id="search-bar-link">Quick Search</a>
                <a class="nav-search">Advanced Search</a>
              </ol>
            </div>
          </div>
        </div>
        <div id ="search-bar">
            <button type ="button" id="cancel-button">x</button>
          <div>
            <form class="quick-search">
              <label for="search-text">Search by item:</label>
              <input type="text" id="search-text" name="name">
              <button type ="submit" id="search-button">Search</button>
            </form>
          </div>
        </div>
      `
    } else {
      navBar = `
        <div id ="logo-links-and-name">
          <div id ="logo">
            <img src ="https://64.media.tumblr.com/294fcb5cb69d7bb052b94d82f686b7c8/tumblr_pmrd24Nz3a1qkm0xd_400.jpg" alt = "logo">
          </div>
          <div id ="links-and-name">
            <div id="company-name">
              <h3>
                Buy And Sell !
              </h3>
            </div>
            <div id ="links">
              <ol>
                <a class="nav-user-id">Logged in</a>
                <a class="nav-new-item">New Post</a>
                <a class="nav-my-items">My Items</a>
                <a class="nav-messages">Messages</a>
                <a class="nav-favourites">Favourites</a>
                <a class="nav-item-list">Items</a>
                <a id ="search-bar-link">Quick Search</a>
                <a class="nav-search">Advanced Search</a>
                <a class="nav-logout">Logout</a>
              </ol>
            </div>
          </div>
        </div>
        <div id ="search-bar">
            <button type ="button" id="cancel-button">x</button>
          <div>
            <form class="quick-search">
              <label for="search-text">Search by item:</label>
              <input type="text" id="search-text" name="name">
              <button type ="submit" id="search-button">Search</button>
            </form>
          </div>
        </div>
      `
    }

    $header.find('.navigation-bar').append(navBar);
  }

  window.header.loadHeader = loadHeader;

  // Initial loading will not have user cookie.
  header.loadHeader(undefined);

  // Log in button logs in User 1. If you want to change user. See public/scripts/network.js
  $('header').on('click', '.nav-login', function() {
    logIn()
      .then(() => header.loadHeader(1));
  });

  $('header').on('click', '.nav-logout', function() {
    logOut()
      .then(() => {
        header.loadHeader(undefined);
      });
  });

  $('header').on('click', '.nav-my-items', function() {
    getMyItems()
      .then(data => {
        myItems.showMyItems(data);
        views_manager.show('myItems');
      })
      .catch(err => console.error(err));
  });

  $('header').on('click', '.nav-new-item', function() {
    views_manager.show('newItem');
  });

  $('header').on('click', '.nav-item-list', function() {
    getItems()
      .then(data => {
        items.showItems(data);
        views_manager.show('items');
      })
      .catch(error => console.error(error));
  });

  $('header').on('click', '.nav-search', function() {
    views_manager.show('searchItem');
  });

  $('header').on('click', '#search-bar-link', function() {
    $('#search-bar').slideDown()
  });

  $('header').on('click', '#cancel-button', function() {
    $('#search-bar').slideUp()
  });

  $('header').on('click', '.nav-messages', function() {
    getMessages()
      .then(msgObj => {
        messages.loadMessages(msgObj);
        views_manager.show('messages');
      })
      .catch(error => console.error(error));
  });

  $('header').on('click', '.nav-favourites', function() {
    getFavouritesByUser()
      .then(favObj => {
        favorites.loadFavourites(favObj);
        views_manager.show('favorites');
      })
      .catch(error => console.error(error));
  });

  $('header').on('submit', '.quick-search', function(event) {
    event.preventDefault();

    const params = $(this).serialize();

    searchItems(params)
      .then(data => {
        items.showItems(data);
        views_manager.show('items');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('items');
      });
  });
});