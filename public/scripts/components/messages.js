$(() => {
  const createMessageHTML = function(message) {
    return `
      <article>
        <p>${message.message}</p>
        <div>
          <span>From: ${message.name}</span><br>
          <span>Sent on: ${message.sent_date}</span>
        </div>
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
    data.forEach(datum => {
      const message = createMessageHTML(datum);
      $messages.append(message);
    })
  };

  window.messages.loadMessages = loadMessages;

});