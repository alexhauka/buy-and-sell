$(() => {
  const createNewMessageForm = function() {
    return `
      <form class="new-message-form">
        <div>
          <textarea class="new-message-textarea" name="message" type="text" row=2 placeholder="Send a Message..." value=""></textarea>
        </div>
        <div>
          <button id="new-message__cancel">Cancel</button>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    `
  }

  const $newMessage = $('<section></section>');

  window.$newMessage = $newMessage;

  const newMessageForm = function() {
    const messageForm = createNewMessageForm();
    $newMessage.empty();
    $newMessage.append(messageForm);
  };

  window.newMessageForm = newMessageForm;

  $('body').on('submit', '.new-message-form', function(event) {
    event.preventDefault();

    const otherId = localStorage.getItem('messageTo');
    const params = $(this).serializeArray();
    console.log(otherId);

    submitMessage(params, otherId)
      .then(() => getUserToUserMessages(otherId))
      .then(msgObj => messages.loadMessages(msgObj))
      .then(() => newMessageForm())
      .then(() => $messages.prepend($newMessage))
      .catch(error => console.error(error));

    views_manager.show('messages');
  });

  $('body').on('click', '#new-message__cancel', function() {
    views_manager.show('items');
    return false;
  });
});
