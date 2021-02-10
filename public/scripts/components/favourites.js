$(() => {

  window.messages = {}

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

  window.loadFavourites = createFavouritesHTML
  console.log(window.loadFavourites)

})
