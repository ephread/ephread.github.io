(function () {
  window.Ephread = {};

  function hashDidChange () {
    if (window.location.hash !== '') {
      displayShowcase(window.location.hash);
    } else {
      hideShowcase();
    }
  }

  function displayShowcase (showcaseName) {
    var $showcase = $(showcaseName);
    var $videos = $(showcaseName + ' video');

    $videos.each(function () {
      $(this).get(0).play();
    });

    window.Ephread.currentScroll = $(document).scrollTop();

    $showcase.removeClass('hidden');
    $showcase.removeClass('invisible');

    $('.regular-sections, footer, nav').addClass('hidden');
    $(document).scrollTop(0);
  }

  function hideShowcase () {
    var $showcase = $('.big-showcase');
    var $videos = $('.big-showcase video');

    $videos.each(function () {
      $(this).get(0).pause();
    });

    $showcase.addClass('hidden');
    $showcase.addClass('invisible');
    $showcase.removeClass('visible');

    $('.regular-sections, footer, nav').removeClass('hidden');
    $(document).scrollTop(window.Ephread.currentScroll);
  }

  function updateNavigation() {
    var top = $(document).scrollTop();

    if (top > 1) {
      $('#navigation').addClass("with-separator");
    } else {
      $('#navigation').removeClass("with-separator");
    }

    var aboutOffset =      $('#about').offset().top;
    var workOffset =       $('#work').offset().top;
    var speakingOffset =   $('#speaking').offset().top;
    var getInTouchOffset = $('#get-in-touch').offset().top;

    $('#navigation li').removeClass("selected");

    if (top >= getInTouchOffset) {
      return;
    } else if (top >= speakingOffset) {
      $('#nav-speaking').addClass("selected");
    } else if (top >= workOffset) {
      $('#nav-work').addClass("selected");
    } else if (top >= aboutOffset) {
      $('#nav-about').addClass("selected");
    }
  }

  function removeHash () {
      history.pushState("", document.title, window.location.pathname + window.location.search);
      hashDidChange()
  }

  $(document).ready(function () {
    var selector = '#actitens-showcase .close-showcase,' +
                   '#abjapp-showcase .close-showcase,' +
                   '#instructions-showcase .close-showcase,' +
                   '#pomme-plate-showcase .close-showcase';

    $(selector).on('click', function (e) {
      e.preventDefault();
      removeHash();
    });

    $(document).scroll(updateNavigation);

    var anchorSelector = 'a[href*="#"]:not([href="#"])' +
                         ':not([href="#actitens-showcase"])' +
                         ':not([href="#abjapp-showcase"])' +
                         ':not([href="#instructions-showcase"])' +
                         ':not([href="#pomme-plate-showcase"])';

    $(anchorSelector).click(function () {
      if (window.location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&
          window.location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top + 50
          }, 1000);
          return false;
        }
      }
    });

    window.onhashchange = hashDidChange;

    updateNavigation();
    hashDidChange();
  });
})();
