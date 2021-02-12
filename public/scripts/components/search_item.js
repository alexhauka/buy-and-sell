$(() => {
  const $searchItemForm = $(`
    <section class ="advanced-search-form">
      <h2>Advanced Search</h2>
      <form class="search_form">
        <div class ="filter-fields">
          <input type="text" name="name" placeholder ="Keyword"/>
          <input type="number" step="0.01" name="min_price" placeholder="Min Price"/>
          <input type="number" step="0.01" name="max_price" placeholder="Max Price"/>
        </div>
        <div class ="filter-buttons">
          <button id="search-item-form__cancel">Cancel</button>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  `);

  // <div class ="filters">
  //         <label>Keyword: </label>
  //         <label>Minimum price: </label>
  //         <label>Maximum price: </label>
  //       </div>

  window.$searchItemForm = $searchItemForm;

  $('body').on('submit', '.search_form', function(event) {
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
  $('body').on('click', '#search-item-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
});

