$(() => {
  const createCommentElem = function(comment) {
    return `
      <article class="comment" id="comment_${comment.id}">
        <section>
          ${comment.user_id}<br />
          ${comment.posted_at}
        </section>
        <p>${comment.comment}</p>
      </article>
    `
  };

  const $comments = $(`
    <section class="comments" id="comments">
      <p>Loading...</p>
    </section>
  `);

  window.$comments = $comments;

  window.comments = {};

  const showComments = function(data) {
    $comments.empty();
    data.forEach(datum => {
      const comment = createCommentElem(datum);
      $comments.append(comment);
    });
  }

  window.comments.showComments = showComments;
});