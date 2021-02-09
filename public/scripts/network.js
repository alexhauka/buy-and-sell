const getAllListings = function(params) {
  let url = `/items`;

  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
};

const getItem = function(id) {
  return $.ajax({
    url: `/items/${id}`,
  });
};

const submitItem = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/items/new',
    data,
  });
};

const getSearchListings = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/search',
    data,
  });
};
