$(() => {
  const createMyItemElem = function(item) {
    return `
    <article>
      <section class="my-item" id="my-item_${item.id}">
        <section class="item-thumbnail">
          <img src="${item.thumbnail_url}" alt="Item image">
        </section>
        <section class="item-body">
          <h3 class="item-listing-name">${item.name}</h3>
            <span id ="my-items-price">$${(item.price / 100).toFixed(2)}</span>
            <span>Posted On: ${item.date_posted.slice(0, 11).replace('T', ' ')}</span>
        </section>
      </section>
      <div class ="more-details-sidebar-myitems">
        <span>More Details</span>
        <span id ="arrow-img"><img src="https://img.icons8.com/metro/26/000000/circled-right-2.png"/></span>
      </div>
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

  $('body').on('click', '.more-details-sidebar-myitems', function() {
    const itemId = $(this).parent().find('.my-item').attr('id').slice(8);

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
