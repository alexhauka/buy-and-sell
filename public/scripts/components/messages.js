$(() => {
  const createMessageHTML = function(message) {
    return `
    <article class ="message-and-sender">
      <section class="private-message" id="sender_id_${message.sender_id}">
        <span>From: ${message.name}</span>
        <p id ="testtest">${message.message}</p>
        <div>
          <span>Sent on: ${message.sent_date.slice(0, 11).replace('T', ' ')}</span>
        </div>
      </section>
    </article>
    `
  };

  const $messages = $(`
    <section class="messages">
      <p>Loading...</p>
    </section>
  `)

  window.$messages = $messages;
  window.messages = {};

  const loadMessages = function(data) {
    $messages.empty();
    // $messages.append('<h2>My Messages</h2>')
    data.forEach(datum => {
      const message = createMessageHTML(datum);
      $messages.append(message);
    })

  };

  window.messages.loadMessages = loadMessages;

  $('body').on('click', '.private-message', function(event) {
    event.preventDefault();
    const otherId = $(this).attr('id').slice(10);
    localStorage.setItem('messageTo', otherId);

    getUserToUserMessages(otherId)
      .then(msgObj => messages.loadMessages(msgObj))
      .then(() => newMessageForm())
      .then(() => $messages.prepend($newMessage))
      .catch(error => console.error(error));

    views_manager.show('messages');
  });
});
