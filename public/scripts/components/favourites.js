$(() => {
  const createFavouritesHTML = function (favObj) {
    let soldOrNot;
    if (favObj.is_sold) {
      soldOrNot = 'Yeah'
    } else {
      soldOrNot = 'Nah'
    }

    return `
    <article class="favorited-item" id="favorite_id_${favObj.id}">
      <p>${favObj.name}</p>
      <div>
        <span>Description: ${favObj.description}</span><br>
        <span>Price: ${favObj.price}</span><br>
        <span>Listed By: ${favObj.user_id}</span><br>
        <span>Date Posted: ${favObj.date_posted.slice(0, 19).replace('T', ' ')}</span><br>
        <span>Sold? ${soldOrNot}</span>
        <div class="delete-favorite">Delete favorite</div>
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
