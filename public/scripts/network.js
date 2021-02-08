const getAllListings = function(params) {
  let url = `/items`;
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

const getItem = function(id) {
  let url = `/items/${id}`;
  return $.ajax({
    url,
  });
}