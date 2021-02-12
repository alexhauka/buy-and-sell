$(() => {
  const createDetailedItemElem = function(item) {
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
          <img src="${item.img_url}" alt="None">
        </section>
        <section class = "item-detail-section">
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
            <span class="add-to-favorites">
              Favorite <img src="https://img.icons8.com/color/48/000000/like--v3.png"/>
            </span>
        </section>
        <section class="new-comment">
        </section>
      </article>
      <section class="comment-section">
        <h4>Comments:</h4>
        <section class="comments">
        </section>
      </section>
    `;
  };

  const $item = $(`
    <section class="item-details-and-comments">
      Loding...
    </section>
  `);

  window.$item = $item;

  window.item = {};

  const showItem = function(data) {
    const item = createDetailedItemElem(data);
    $item.empty();
    $item.append(item);
  };

  $('body').on('click', '#add-to-favorites', function(event) {
    event.preventDefault();
    const itemId = $('.item-detail').attr('id').slice(8);

    addItemToFavourites(itemId)
      .then(() => {
        $('#add-to-favorites').text('Added to favorites');
      });
  });

  $('body').on('click', '.item-user-id', function(event) {
    event.preventDefault();
    const owner_Id = $('.item-user-id').attr('id').slice(8);
    localStorage.setItem('messageTo', owner_Id);

    getUserToUserMessages(owner_Id)
      .then(msgObj => messages.loadMessages(msgObj))
      .then(() => newMessageForm())
      .then(() => {
        $messages.prepend($newMessage);
        views_manager.show('messages');
      })
      .catch(error => console.error(error));
  });

  window.item.showItem = showItem;
});
