$(() => {

  window.messages = {}

  const createMessageHTML = function (msgObj) {
    return `
    <article>
      <p>${msgObj.message}</p>
      <div>
        <span>From: ${msgObj.name}</span><br>
        <span>Sent on: ${msgObj.sent_date}</span>
      </div>
    </article>
    `
  }

  window.loadMessages = createMessageHTML

})
