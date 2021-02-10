$(() => {
  const $newItemForm = $(`
    <form>
      <section>
        <div>
          <label for="item-name">Name:</label>
          <label for="item-description">Description: </label>
          <label for="item-img_url">Image URL: </label>
          <label for="item-price">Price: $</label>
        </div>
        <div>
          <input id="item-name" name="name" type="text">
          <textarea id="item-description" name="description" rows="4" cols="50"></textarea>
          <input id="item-img_url" name="img_url" type="text">
          <input id="item-price" name="price" type="number" step="0.01" min="0" value="0">
        </div>
      </section>
      <section>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <button id="item-form__cancel">Cancel</button>
      </section>
    </form>
  `);

  window.$newItemForm = $newItemForm;

  $newItemForm.on('submit', function (event) {
    event.preventDefault();
    const params = $(this).serialize();
    submitItem(params)
      .then(data => {
        console.log(data);
        item.showItem(data);
        views_manager.show('item');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('items');
      })
  });

  $('body').on('click', '#item-form__cancel', function() {
    views_manager.show('items');
    return false;
  });
});