$(() => {
  const createMyItemElem = function(item) {
    return `
      <article class="my-item" id="my-item_${item.id}">
        <section class="item-thumbnail">
          <img src"${item.thumbnail_url}" alt="Item image">
        <section class="item-body">
          <h4 class="item-listing-name">${item.name}</h4>
          <div class="item-listing-detail">
            Price: $${(item.price / 100).toFixed(2)}
          </div>
        </section>
      </article>
    `
  }

  const $myItems = $(`
    <section class="items" id="items">
      <p>Loading...</p>
    </section>
  `);

  window.$myItems = $myItems;

  window.myItems = {};

  const showMyItems = function(data) {
    $myItems.empty();
    data.forEach(datum => {
      const item = createMyItemElem(datum);
      $myItems.append(item);
    });
  }

  window.myItems.showMyItems = showMyItems;

  $('body').on('click', '.my-item', function() {
    const itemId = $(this).attr('id').slice(8);

    getItem(itemId)
      .then(data => myItem.showMyItem(data))
      .then(() => newCommentForm())
      .then(() => $myItem.find('.my-new-comment').append($newComment))
      .then(() => getComments(itemId))
      .then(data => comments.showComments(data))
      .then(() => {
        $myItem.find('.my-comments').append($comments);
        views_manager.show('myItem');  
      })
      .catch(err => console.error(err));
  });
});