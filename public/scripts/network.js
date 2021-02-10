const logIn = function() {
  return $.ajax({
    url: "/login/1",
  })
};

const logOut = function() {
  return $.ajax({
    url: '/logout',
  });
};

const getItem = function(id) {
  return $.ajax({
    url: `/items/${id}`,
  });
};

const getItems = function(body) {
  let url = `/items`;

  if (body) {
    url += "?" + body;
  }
  return $.ajax({
    url,
  });
};

const searchItems = function(params) {
  return $.ajax({
    url: `/search?${params}&limit=10`
  });
}

const submitItem = function(body) {
  return $.ajax({
    method: 'POST',
    url: `/items?${body}`,
  });
};

const getComments = function(id) {
  return $.ajax({
    url: `/items/${id}/comments`,
  });
};

const submitComment = function(body, id) {
  return $.ajax({
    method: 'POST',
    url: `/items/${id}`,
    data: {
      comment: body[0].value,
    }
  });
};

const getMessageByUser = function(userID) {
  console.log('getMessageByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/messages`
  });
}

const getFavouritesByUser = function(userID) {
  console.log('getFavouritesByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/${userID}/favorites`
  });
}