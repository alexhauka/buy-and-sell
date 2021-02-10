$(() => {
  window.header = {};

  let currentUser = null;
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
                <a class="nav-login" href=#>Login</a>
                <a href = "">Register</a>
                <a id ="search-bar-link">Quick Search</a>
                <a href = "/search">Advanced Search</a>
              </ol>
            </div>
          </div>
        </div>
        <div id ="search-bar">
            <button type ="button" id="cancel-button">x</button>
          <div>
            <form>
              <label for="search-text">Search by item:</label>
              <input type="text" id="search-text" name="search-text">
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
                <a href = #>${user.name}</a>
                <a class="nav-new-item" href = #>New Post</a>
                <a href = "/users/:id/messages" id = "messages">Messages</a>
                <a id ="search-bar-link">Quick Search</a>
                <a class="nav-search" href = #>Advanced Search</a>
                <a class="nav-logout" href = #>Logout</a>
              </ol>
            </div>
          </div>
        </div>
        <div id ="search-bar">
            <button type ="button" id="cancel-button">x</button>
          <div>
            <form>
              <label for="search-text">Search by item:</label>
              <input type="text" id="search-text" name="search-text">
              <button type ="submit" id="search-button">Search</button>
            </form>
          </div>
        </div>
      `
    }

    $header.find('.navigation-bar').append(navBar);
  }

  window.header.loadHeader = loadHeader;

  logIn()
    .then(user => {
      loadHeader(user);
    });

  $('header').on('click', '.nav-login', function() {
    logIn()
    .then(user => {
      loadHeader(user);
    });
  });

  $('header').on('click', '.nav-logout', function() {
    logOut()
    .then(() => {
      loadHeader(undefined);
    });
  });

  $('header').on('click', '.nav-home', function() {
    getItems()
      .then(data => {
        items.showItems(data);
        views_manager.show('items');
      })
      .catch(error => console.error(error));
  });

  $('header').on('click', '.nav-new-item', function() {
    views_manager.show('newItem');
  });

  $('header').on('click', '.nav-search', function() {
    views_manager.show('searchItem');
  });
});