$(() => {
  const createItemElem = function(item) {
    return `
    <article>
      <section class="item" id="item_${item.id}">
        <section class="item-thumbnail">
          <img src="${item.thumbnail_url}" alt="Item image">
        </section>
        <section class ="item-body">
          <div class ="item-name-and-description">
            <div class="item-name">
              <h4 class="item-listing-name">${item.name}</h4>
            </div>
            <div class ="item-description">
              <span>${item.description}</span>
            </div>
          </div>
          <div class ="item-listing-detail">
            <div class ="item-price">
              <h4>$${(item.price / 100).toFixed(2)}</h4>
            </div>
            <div class ="item-details">
              <span>Posted By: ${item.user_name}</span><br>
              <span>Posted On: ${item.date_posted.slice(0, 11).replace('T', ' ')}</span>
            </div>
          </div>
        </section>
      </section>
      <div class ="more-details-sidebar">
        <span>More Details</span>
        <span id ="arrow-img"><img src="https://img.icons8.com/metro/26/000000/circled-right-2.png"/></span>
      </div>
    </article>
    `
  }

  const $items = $(`
    <section class="items" id="items">
      <p>Loading...</p>
    </section>
  `);

  window.$items = $items;

  window.items = {};

  const showItems = function(data) {
    $items.empty();
    data.forEach(datum => {
      const item = createItemElem(datum);
      $items.append(item);
    });
  }

  window.items.showItems = showItems;

  $('body').on('click', '.item', function() {
    const itemId = $(this).attr('id').slice(5);

    getItem(itemId)
      .then(data => item.showItem(data))
      .then(() => newCommentForm())
      .then(() => $item.find('.new-comment').append($newComment))
      .then(() => getComments(itemId))
      .then(data => comments.showComments(data))
      .then(() => {
        $item.find('.comments').append($comments);
        views_manager.show('item');
      })
      .catch(err => console.error(err));
  });
});
