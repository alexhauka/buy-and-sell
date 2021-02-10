$(() => {

  window.messages = {}

  const loadAllMessagesHTML = function (msgObj) {
    return `
    <article>
      <p>${msgObj.message}</p>
      <div>
        <span id ="sender-name">From: ${msgObj.name}</span><br>
        <span>Sent on: ${msgObj.sent_date}</span><br>
        <a href = "users/:id/messages/${msgObj.sender_id}">See all messages from ${msgObj.name}</a>
      </div>
    </article>
    `
  }

  // $('#user-to-user').on('click', function () {
  //   const sentFrom = $('#sender-name').html()
  //   const senderName = sentFrom.slice(6) //get the sender name without the 'From:'
  //   // msgObj.forEach(msg => {
  //   //   getUserToUserMessages(userID, msg.sender_id)
  //   // })
  //   // const otherID = msgObj
  //   // console.log(msgObj)
  //   $('main').empty()
//})

  window.loadAllMessages = loadAllMessagesHTML

})
