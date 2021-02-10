$(() => {

  const loadNavBar = function (user) {
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
                <a href = "/login/1" id = "login">Login</a>
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
                <a href = "/items">New Post</a>
                <a id = "messages">Messages</a>
                <a id ="search-bar-link">Quick Search</a>
                <a href = "/search">Advanced Search</a>
                <a href = "/logout">Logout</a>
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
    $('nav').append(navBar)
    registerHandlers()
  }

  let userID;

  $.get('users/:id/messages')
  .then(msgObj => {
    if (msgObj[0].id) {
      userID = msgObj[0].id
      loadNavBar(userID)
      $('#search-bar').hide()
    } else {
      userID = null
      loadNavBar(userID)
      $('#search-bar').hide()
    }
  });

  const registerHandlers = function () {
    $('#search-bar-link').on('click', function () {
      $('#search-bar').slideDown()
    })
    $('#cancel-button').on('click', function () {
      $('#search-bar').slideUp()
    })
    $('#search-button').on('submit', function () {
      //add a post request to /search on submit
    })
    $('#messages').on('click', function () {
      getMessageByUser(userID)
      .then(msgObj => {
        msgObj.forEach(msg => {
          console.log(msg)
          $('main').append(createMessage(msg))
        })
      })
    })
  }
});
