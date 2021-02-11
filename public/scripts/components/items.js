$(() => {
  const createItemElem = function(item) {
    return `
      <article class="item" id="item_${item.id}">
        <section class="item-thumbnail">
          <img src="${item.thumbnail_url}" alt="Item image">
        <section class="item-body">
          <h4 class="item-listing-name">${item.name}</h4>
          <div class="item-listing-detail">
            Price: ${item.price}
          </div>
        </section>
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
