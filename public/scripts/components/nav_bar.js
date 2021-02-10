$(() => {

  const loadNavBar = function () {
    const navBar = `
    <nav>
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
            <a href = "">Login</a>
            <a href = "">New Post</a>
            <a id ="search-bar-link">Quick Search</a>
            <a href = "">Advanced Search</a>
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
    </nav>
  `
  $('body').append(navBar)
  }

  loadNavBar()
  $('#search-bar').hide()

  $('#search-bar-link').on('click', function () {
    $('#search-bar').slideDown()
  })

  $('#cancel-button').on('click', function () {
    $('#search-bar').slideUp()
  })

});
