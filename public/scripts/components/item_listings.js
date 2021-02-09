$(() => {
  const $itemListings = $(`
    <section class="item-listings" id="item-listings">
      <p>Loading...</p>
    </section>
  `);

  window.$itemListings = $itemListings;

  window.itemListings = {};

  const addItems = function(items) {
    $itemListings.empty();

    items.forEach(item => {
      const listing = itemListing.createListing(item);
      $itemListings.append(listing);
    });
  }

  window.itemListings.addItems = addItems;
});