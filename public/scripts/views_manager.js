$(() => {

  const $main = $('body');

  window.views_manager = {};

  window.views_manager.show = function(content) {
    $itemListings.detach();
    $item.detach();

    switch (content) {
      case 'listings':
        $itemListings.appendTo($main);
        break;

      case 'item':
        $item.appendTo($main);
        break;

      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('listings');
        }, 2000);
        
        break;
      }
    }
  }
  
});