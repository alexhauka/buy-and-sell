$(() => {
  const $newItemForm = $(`
    <section class="new-post-section">
      <h2>Make a New Post:</h2>
    <form>
      <section>
        <div>
          <input id="item-name" name="name" type="text" placeholder="Item Name">
          <textarea id="item-description" name="description" rows="4" cols="50" placeholder="Item Description"></textarea>
          <input id="item-img_url" name="img_url" type="text" placeholder="Image URL">
          <input id="item-price" name="price" type="number" step="0.01" min="0" value="0" placeholder="Price">
        </div>
      </section>
      <section class="new-post-buttons">
        <button id="item-form__cancel">Cancel</button>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </section>
    </form>
    </section>
  `);

  window.$newItemForm = $newItemForm;

  $newItemForm.on('submit', function (event) {
    event.preventDefault();
    const params = $(this).serialize();

    submitItem(params)
      .then(data => {
        item.showItem(data);
        return data.id;
      })
      .then((itemId) => getComments(itemId))
      .then(data => comments.showComments(data))
      .then(() => $comments.appendTo('.comments'))
      .then(() => newCommentForm())
      .then(() => $('.new-comment').append($newComment))

      .catch((error) => {
          console.error(error);
          views_manager.show('items');
      })

    views_manager.show('item');
  });

  $('body').on('click', '#item-form__cancel', function() {
    views_manager.show('items');
    return false;
  });
});
