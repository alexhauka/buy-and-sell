$(() => {
  const createDetailedMyItemElem = function(item) {
    let soldOrNot;
    if (item.is_sold) {
      soldOrNot = 'Item Sold'
    } else {
      soldOrNot = 'Item Available'
    }
    return `
      <article class="item-detail" id="item_id_${item.id}">
        <h2>${item.name}</h2>
        <section class="item-name-and-image">
          <img src="${item.thumbnail_url}" alt="None">
        </section>
        <section class="item-detail-section">
          <p>${item.description}</p>
          <span>
            $${(item.price / 100).toFixed(2)}
          </span>
          <span>
            Posted On: ${item.date_posted.slice(0, 11).replace('T', ' ')}
          </span>
          <span class="item-user-id" id="user_id_${item.user_id}">
            Posted By: ${item.user_name}
          </span>
          <span>
            ${soldOrNot}
          </span>
        </section>
        <section class="myitem-details">
          <p id="delete-my-item">
            Delete Item
          </p>
          <p id="change-to-sold">
            ${item.is_sold ? 'SOLD' : 'Mark as sold'}
          </p>
        </section>
        <section class="my-new-comment">
        </section>
      </article>
      <section class ="myitems-comment-section">
        <h4>Comments:</h4>
        <section class="my-comments">
        </section>
      </section>
    `;
  };

  const $myItem = $(`
    <section class ="myitem-details-and-comments">
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
