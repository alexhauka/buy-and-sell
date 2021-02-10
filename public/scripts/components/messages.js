$(() => {

  window.messages = {}

  const createMessage = function (msgObj) {
    return `
    <article>
      <p>From: ${msgObj.sender_id}</p>
      <p>Message: ${msgObj.message}</p>
      <p>Sent on: ${msgObj.sent_date}</p>
    </article>
    `
  }

  window.createMessage = createMessage
  console.log(window.createMessage)

  // const loadMessages = function (msgObj) {
  //   for (let msg of msgObj) {
  //     const applyHTML = createMessage(msg)
  //     $('main').prepend(applyHTML)
  //   }
  // }

  // window.messages.loadMessages = loadMessages

  // console.log(window.messages)

})
