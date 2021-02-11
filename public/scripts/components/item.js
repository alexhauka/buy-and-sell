$(() => {
  const createDetailedItemElem = function(item) {
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
            Price: ${(item.price / 100).toFixed(2)}
          </div>
          <div>
            SOLD: ${item.is_sold}
          </div>
          <div id="add-to-favorites">
            Add to Favorites
          </div>
        </section>
        <section class="new-comment">
        </section>
        <section class="comments">
        </section>
      </article>
    `;
  };

  const $item = $(`
    <section>
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