$(() => {
  const createCommentElem = function(comment) {
    return `
      <article class="comment" id="comment_${comment.id}">
        <section>
          <span id ="comment-date">${comment.posted_at.slice(0, 11).replace('T', ' ')}</span>
          <span id="commenter-name">${comment.name}:</span><span id ="comment-text">${comment.comment}</span>
        </section>
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
