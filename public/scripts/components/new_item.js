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
      .then(data => getItem(data.id))
      .then(data => item.showItem(data))
      .then(() => newCommentForm())
      .then(() => $item.find('.new-comment').append($newComment))
      .then(() => getComments(itemId))
      .then(data => comments.showComments(data))
      .then(() => {
        $item.find('.comments').append($comments);
        views_manager.show('item');
      })
      .catch(err => console.error(err));

    views_manager.show('item');
  });

  $('body').on('click', '#item-form__cancel', function() {
    views_manager.show('items');
    return false;
  });
});