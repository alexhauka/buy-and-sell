$(() => {
  const createDetailedMyItemElem = function(item) {
    return `
      <article class="item-detail" id="item_id_${item.id}">
        <section class="item-image">
          <imb src="${item.img_url}" alt="None"></imb>
        </section>
        <section class="item-name">
          <h4>${item.name}</h4>
          <span>${item.date_posted.slice(0, 19).replace('T', ' ')}</span>
          <span class="item-user-id" id="user_id_${item.user_id}">From User: ${item.user_name}</span>
        </section>
        <section class="item-detail">
          <p>Description:<br>${item.description}</p>
          <div>
            Price: $${(item.price / 100).toFixed(2)}
          </div>
          <div>
            SOLD: ${item.is_sold}
          </div>
          <div id="delete-my-item">
            Delete Item
          </div>
          <div id="change-to-sold">
            ${item.is_sold ? 'SOLD' : 'Mark as sold'}
          </div>
        </section>
        <section class="my-new-comment">
        </section>
        <section class="my-comments">
        </section>
      </article>
    `;
  };

  const $myItem = $(`
    <section>
      Loding...
    </section>
  `);

  window.$myItem = $myItem;

  window.myItem = {};

  const showMyItem = function(data) {
    const item = createDetailedMyItemElem(data);
    $myItem.empty();
    $myItem.append(item);
  };

  $('body').on('click', '#delete-my-item', function() {
    const itemId = $('.item-detail').attr('id').slice(8);

    deleteItem(itemId)
      .then(() => getMyItems())
      .then(data => {
        myItems.showMyItems(data);
        views_manager.show('myItems');
      })
      .catch(err => console.error(err));
  });

  $('body').on('click', '#change-to-sold', function() {
    const itemId = $('.item-detail').attr('id').slice(8);

    changeToSold(itemId)
      .then(() => getMyItems())
      .then(data => {
        myItems.showMyItems(data);
        views_manager.show('myItems');
      })
      .catch(err => console.error(err));
  });

  window.myItem.showMyItem = showMyItem;
});