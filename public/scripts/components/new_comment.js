$(() => {
  const $comment = $(`
    <form class="new-comment-form">
      <div>
        <textarea class="new-comment-textarea" name="comment" type="text" row=2 placeholder="Comment..."></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <button id="new-comment__cancel">Cancel</button>
      </div>
    </form>
  `);

  window.$comment = $comment;

  $comment.on('submit', function(event) {
    event.preventDefault();

    const itemId = $('.item-detail').attr('id').slice(8);
    const params = $(this).serializeArray();

    submitComment(params, itemId)
      .then((comment) => {
        $comment.detach();
        return getItem(comment.item_id);
      })
      .then((data) => {
        item.showItem(data);
        views_manager.show('item');
      })
      .catch((error) => {
        console.log(error);
        views_manager.show('items');
      })
  });

  $('body').on('click', '#new-comment__cancel', function() {
    views_manager.show('items');
    return false;
  });
});