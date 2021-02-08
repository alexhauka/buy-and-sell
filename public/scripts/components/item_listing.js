$(() => {
  window.itemListing = {};

  const createListing = function(item) {
    return `
      <article class="item-listing" id="item_${item.id}">
        <section class="item-listing-thumbnail">
          <img src"${item.thumbnail_url}" alt="Item image">
        <section class="item-listing-details">
          <h4 class="item-listing-name">${item.name}</h4>
          <div class="item-listing-detail">
            Price: ${item.price}
          </div>
        </section>
      </article>
    `
  }

  window.itemListing.createListing = createListing;

// Temporary setup for click event that leads to the Item.
  $('body').on('click', '.item-listing', function() {
    const itemId = $(this).attr('id');
    getItem(itemId.slice(5)).then((data) => item.addItem(data));
    views_manager.show('item');
  });
});