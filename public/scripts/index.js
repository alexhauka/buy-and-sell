$(() => {
  getItems()
      .then(data => {
        items.showItems(data);
        views_manager.show('items');
      })
      .catch(error => console.error(error));
});
