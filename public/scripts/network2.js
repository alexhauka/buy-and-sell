const getAllMessagesByUser = function (userID) {
  console.log('getMessageByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/messages`
  });
}

const getUserToUserMessages = function (userID, otherID) {
  console.log('getUserToUserMessages worked')
  return $.ajax({
  method: 'GET',
  url: `/users/${userID}/messages/${otherID}`
  });
}

const getFavouritesByUser = function (userID) {
  console.log('getFavouritesByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/favorites`
  });
}
