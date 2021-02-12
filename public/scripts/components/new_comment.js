$(() => {
  const createNewCommentForm = function() {
    return `
      <form class="new-comment-form">
        <p>Leave a comment:</p>
        <div>
          <textarea class="new-comment-textarea" name="comment" type="text" row=2 placeholder="Comment..." value=""></textarea>
        </div>
        <div>
          <button id="new-comment__cancel">Cancel</button>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    `
  }

  const $newComment = $('<section></section>');

  window.$newComment = $newComment;

  const newCommentForm = function() {
    const commentForm = createNewCommentForm();
    $newComment.empty();
    $newComment.append(commentForm);
  };

  window.newCommentForm = newCommentForm;

  $('body').on('submit', '.new-comment-form', function(event) {
    event.preventDefault();

    const itemId = $('.item-detail').attr('id').slice(8);
    const params = $(this).serializeArray();

    submitComment(params, itemId)
      .then(() => $newComment.empty())
      .then(() => newCommentForm())
      .then(() => $item.find('.new-comment').empty())
      .then(() => $item.find('.new-comment').append($newComment))
      .then(() => $item.find('.comments').empty())
      .then(() => getComments(itemId))
      .then(data => comments.showComments(data))
      .then(() => $item.find('.comments').append($comments))
      .catch(err => console.error(err));
  });

  $('body').on('click', '#new-comment__cancel', function() {
    views_manager.show('items');
    return false;
  });
});
