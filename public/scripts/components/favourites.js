$(() => {
  const createFavouritesHTML = function (favObj) {
    console.log(favObj)
    let soldOrNot;
    if (favObj.is_sold) {
      soldOrNot = 'Item Has Been Sold'
    } else {
      soldOrNot = 'Item Available'
    }

    return `
    <article class ="favorites-article">
      <section class="favorited-item" id="favorite_id_${favObj.id}">
        <div class ="favorited-item-img">
          <img src ="${favObj.img_url}">
        </div>
        <div class ="favorited-item-description">
          <h4>${favObj.name} ($${(favObj.price / 100).toFixed(2)})</h4>
          <span>${favObj.description}</span>
          <span>Posted By: ${favObj.user_id}</span>
          <span>Posted On: ${favObj.date_posted.slice(0, 11).replace('T', ' ')}</span>
          <span>${soldOrNot}</span>
        </div>
      </section>
      <div class="delete-favorite" id="favorite_id_${favObj.id}">
        <span>Delete Favorite</span>
      </div>
    </article>
    `
  }

  const $favorites = $(`
    <section class="favorites">
      <p>Loading...</p>
    </section>
  `);

  window.$favorites = $favorites;
  window.favorites = {};

  const loadFavourites = function(data) {
    $favorites.empty();
    $favorites.append('<h2>My Favourites</h2>')
    data.forEach(datum => {
      const favorite = createFavouritesHTML(datum);
      $favorites.append(favorite);
    });
  };

  $('body').on('click', '.delete-favorite', function() {
    const favoriteId = $(this).attr('id').slice(12);

    deleteFavorite(favoriteId)
      .then(() => getFavouritesByUser())
      .then(favObj => {
        favorites.loadFavourites(favObj);
        views_manager.show('favorites');
      })
      .catch(error => console.error(error));
  });

  window.favorites.loadFavourites = loadFavourites;
});
