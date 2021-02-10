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
          <span>From User: ${item.user_id}</span>
        </section>
        <section class="item-detail">
          <p>Description:<br>${item.description}</p>
          <div>
            Price: ${(item.price / 100).toFixed(2)}
          </div>
          <div>
            SOLD: ${item.is_sold}
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
    return getComments(data.id)
      .then((commentsData) => {
        comments.showComments(commentsData);
        const item = createDetailedItemElem(data);
        $item.empty();
        $item.append(item);
        $item.find('.new-comment').append($comment);
        $item.find('.comments').append($comments);
      })
  }

  window.item.showItem = showItem;
});