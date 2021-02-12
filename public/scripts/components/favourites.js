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
      <article class="favorited-item" id="favorite_id_${favObj.id}">
        <div class ="favorited-item-img">
          <img src ="${favObj.img_url}">
        </div>
        <div class ="favorited-item-description">
          <h4>${favObj.name}</h4>
          <span>Description: ${favObj.description}</span><br>
          <span>$${favObj.price}</span><br>
          <span>Posted By: ${favObj.user_id}</span><br>
          <span>Posted On: ${favObj.date_posted.slice(0, 11).replace('T', ' ')}</span><br>
          <span>${soldOrNot}</span>
          <div class="delete-favorite">Delete Favorite</div>
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
    data.forEach(datum => {
      const favorite = createFavouritesHTML(datum);
      $favorites.append(favorite);
    });
  };

  $('body').on('click', '.delete-favorite', function() {
    const favoriteId = $('.favorited-item').attr('id').slice(12);

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
