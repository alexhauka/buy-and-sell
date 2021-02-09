$(() => {
  const createItem = function(item) {
    return `
      <article class="item-detail">
        <section class="item-image">
          <imb src="${item.img_url}" alt="None"></imb>
        </section>
        <section class="item-name">
          <h4>${item.name}</h4>
          <span>${item.date_posted}</span>
          <span>From User: ${item.user_id}</span>
        </section>
        <section class="item-detail">
          <p>Description:<br>${item.description}</p>
          <div>
            Price: ${item.price}
          </div>
          <div>
            SOLD: ${item.is_sold}
          </div>
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

  const addItem = function(data) {
    $item.empty();
    const item = createItem(data);
    $item.append(item);
  }

  window.item.addItem = addItem;

});