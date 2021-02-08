$(() => {
  getAllListings().then(function(json) {
    itemListings.addItems(json);
    views_manager.show('listings');
  });
});