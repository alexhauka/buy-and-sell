const getMessageByUser = function (userID) {
  console.log('worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/messages`
  });
}

