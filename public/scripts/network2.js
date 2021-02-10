const getMessageByUser = function (userID) {
  console.log('getMessageByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/messages`
  });
}

const getFavouritesByUser = function (userID) {
  console.log('getFavouritesByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/favorites`
  });
}
