$(() => {
  const createFavouritesHTML = function (favObj) {
    return `
    <article>
      <p>${favObj.name}</p>
      <div>
        <span>Description: ${favObj.description}</span><br>
        <span>Price: ${favObj.price}</span><br>
        <span>Listed By: ${favObj.user_id}</span><br>
        <span>Date Posted: ${favObj.date_posted}</span><br>
        <span>Sold? ${favObj.is_sold}</span>
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

  window.favorites.loadFavourites = loadFavourites;
});
