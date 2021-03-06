'use strict';

var postView = {};

postView.populateFilters = function() {
  $('article').each(function() {
    var $categoryType = $(this).data('category');
    var source = $('#category_filter_template').html();
    var templateFunction = Handlebars.compile(source);
    var data = {category: $categoryType};
    var html = templateFunction(data);
    if($('#category-filter option[value="' + $categoryType + '"]').length === 0) {
      $('#category-filter').append(html);
    }
  });
};

postView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    var $cat = $(this).val();
    if($cat) {
      $('article').hide();
      $('article[data-category="' + $cat + '"]').fadeIn();
    } else {
      $('article').fadeIn();
    }
  });
};

postView.setTeasers = function() {
  $('article').each(function() {
    var $postBody = $(this).find('.post_body');
    if(($postBody.children()).length < 2) {
      $(this).find('.read_on').hide();
    }
    $('.post_body *').not(':first-child').hide();
    $(this).removeClass('show');
  });

  $('article a.read_on').on('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    var $selection = $(event.target).prev();
    if($selection.hasClass('show')) {
      $(event.target).html('Show more &#8594;');
      $('.show *').not(':first-child').hide();
      $($selection).removeClass('show');
    } else {
      $(event.target).html('&#8592; Show less');
      $selection.addClass('show');
    }
    $('.show *').fadeIn();
  });
};

postView.setTeasers();
postView.populateFilters();
postView.handleCategoryFilter();
