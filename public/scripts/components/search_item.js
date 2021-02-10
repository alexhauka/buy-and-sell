$(() => {
  const $searchItemForm = $(`
    <form>
      <section>
        <div>
          <label>Keyword: </label>
          <label>Minimum price: </label>
          <label>Maximum price: </label>
        </div>
        <div>
          <input type="text" name="name" />
          <input type="number" step="0.01" name="min_price" />
          <input type="number" step="0.01" name="max_price" />
        </div>
      </section>
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <button id="search-item-form__cancel">Cancel</button>
      </div>
    </form>
  `);

  window.$searchItemForm = $searchItemForm;

  $searchItemForm.on('submit', function(event) {
    event.preventDefault();
    const params = $(this).serialize();

    searchItems(params)
      .then(data => {
        items.showItems(data);
        views_manager.show('items');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('items');
      });
  });
});

$('body').on('click', '#search-item-form__cancel', function() {
  views_manager.show('listings');
  return false;
});