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

const getMyItems = function() {
  return $.ajax({
    url: `/items/user`
  });
};

const deleteItem = function(itemId) {
  return $.ajax({
    method: 'POST',
    url: `/items/${itemId}/delete`,
  })
}

const changeToSold = function(itemId) {
  return $.ajax({
    method: 'POST',
    url: `/items/${itemId}/sold`,
  });
}

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
    url: `/items/${id}/comments`,
    data: {
      comment: body[0].value,
    }
  });
};

const getMessages = function() {
  console.log('getMessageByUser worked')
  return $.ajax({
    method: 'GET',
    url: `/users/:id/messages`
  });
};

const submitMessage = function(body, otherId) {
  return $.ajax({
    method: 'POST',
    url: `/users/:id/messages/${otherId}`,
    data: {
      message: body[0].value,
    }
  })
}

const getFavouritesByUser = function() {
  console.log('getFavouritesByUser worked')
    return $.ajax({
    method: 'GET',
    url: `/users/:id/favorites`
  });
};

const addItemToFavourites = function(body) {
  return $.ajax({
    method: 'POST',
    url: `users/:id/favorites`,
    data: { item_id: body },
  });
};

const deleteFavorite = function(itemId) {
  return $.ajax({
    method: 'POST',
    url: `users/:id/favorites/delete`,
    data: { item_id: itemId },
  })
}

const getUserToUserMessages = function (otherID) {
  console.log('getUserToUserMessages worked')
  return $.ajax({
  method: 'GET',
  url: `/users/:id/messages/${otherID}`
  });
};