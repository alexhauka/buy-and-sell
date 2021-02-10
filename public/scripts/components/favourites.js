$(() => {

  window.messages = {}

  const createFavouritesHTML = function (favObj) {
    let soldOrNot;
    if (favObj.is_sold) {
      soldOrNot = 'Yeah'
    } else {
      soldOrNot = 'Nah'
    }
    return `
    <article>
      <p>${favObj.name}</p>
      <div>
        <span>Description: ${favObj.description}</span><br>
        <span>Price: ${favObj.price}</span><br>
        <span>Listed By: ${favObj.user_id}</span><br>
        <span>Date Posted: ${favObj.date_posted}</span><br>
        <span>Sold? ${soldOrNot}</span>
      </div>
    </article>
    `
  }

  window.loadFavourites = createFavouritesHTML

})
