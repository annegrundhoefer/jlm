// mobile menu
$(document).ready(function($){
  $('.menu-toggle').click(function(){
$(this).toggleClass('is-active');
    $('.sub-menu').fadeToggle();
  });
  $('.sub-menu li a').click(function(){
    $('.sub-menu').hide();
  });
});


// external js: isotope.pkgd.js

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.wall-item',
  // percentPosition: true,
  layoutMode: 'masonry'  
});

$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});
// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
};
// bind filter button click
$('.filters-button-group').on( 'click', 'li', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'li', function() {
    $buttonGroup.find('.activeFilter').removeClass('activeFilter');
    $( this ).addClass('activeFilter');
  });
});

// parallax for process page

function watchIt() {
  var height = window.innerHeight ? window.innerHeight : $(window).height();
  var headings = [
    $("#heading-1"),
    $("#heading-2"),
    $("#heading-3"),
    $("#heading-4"),
    $("#heading-5")
  ];
  var headingTops = [
    headings[0].offset().top,
    headings[1].offset().top,
    headings[2].offset().top,
    headings[3].offset().top,
    headings[4].offset().top
  ];
  $win = $(window);

  $("h1").each(function() {
    $(this).addClass("out")
  });
    
  function animate() {
    scrollPos = $win.scrollTop();
    for(var i = 0; i <= 4; i++) {
      if ( (scrollPos + height) > headingTops[i] && scrollPos < (headingTops[i] + 300) ) {
        console.log('affecting ' + i);
        headings[i].css("background-position", "50% " + Math.round(1 - (headingTops[i] - scrollPos) / height * 100) + "px");
      }
    }
  }
  
  animate(); 
  $(document).on('scroll', animate);
}


$(window).on('load', watchIt);
