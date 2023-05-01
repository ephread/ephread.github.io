window.Ephread = {};

const SHOWCASE_HASHES = [
  "#the-bell-showcase",
  "#combyne-showcase",
  "#genesis-showcase",
  "#actitens-showcase",
  "#abjapp-showcase",
  "#instructions-showcase",
  "#how-many-sleeps-showcase",
  "#pomme-plate-showcase",
  "#sophisticate-showcase",
  "#autodazzler-showcase",
  "#ink-showcase",
  "#genetrainer-showcase",
  "#mynox-showcase"
];

const SITE_HASHES = [
  "#about",
  "#work",
  "#speaking",
  "#get-in-touch",
];

const CLOSE_SELECTOR = SHOWCASE_HASHES.map((hash) => `${hash} .close-showcase`)
                                      .join(", ")

const ANCHOR_SELECTOR = 'a[href*="#"]:not([href="#"])' +
                        SHOWCASE_HASHES.map((hash) => `:not([href="${hash}"])`)
                                       .join("")

function hashDidChange() {
  if (SHOWCASE_HASHES.includes(window.location.hash)) {
    displayShowcase(window.location.hash);
  } else {
    hideShowcase();
    if (SITE_HASHES.includes(window.location.hash)) {

    }
  }
}

function displayShowcase(showcaseName) {
  var $showcase = $(showcaseName);
  var $videos = $(showcaseName + " video");

  $videos.each(function () {
    $(this).get(0).play();
  });

  window.Ephread.currentScroll = $(document).scrollTop();

  $showcase.removeClass("hidden");
  $showcase.removeClass("invisible");

  $(".regular-sections, footer, nav").addClass("hidden");
  $(document).scrollTop(0);
}

function hideShowcase() {
  var $showcase = $(".big-showcase");
  var $videos = $(".big-showcase video");

  $videos.each(function () {
    $(this).get(0).pause();
  });

  $showcase.addClass("hidden");
  $showcase.addClass("invisible");
  $showcase.removeClass("visible");

  $(".regular-sections, footer, nav").removeClass("hidden");
  $(document).scrollTop(window.Ephread.currentScroll);
}

function updateNavigation() {
  var top = $(document).scrollTop();

  if (top > 1) {
    $("#navigation").addClass("with-separator");
  } else {
    $("#navigation").removeClass("with-separator");
  }

  var aboutOffset = $("#about").offset().top - 50;
  var workOffset = $("#work").offset().top - 50;
  var speakingOffset = $("#speaking").offset().top - 50;
  var getInTouchOffset = $("#get-in-touch").offset().top - 50;

  $("#navigation li").removeClass("selected");

  if (top >= getInTouchOffset) {
    return;
  } else if (top >= speakingOffset) {
    $("#nav-speaking").addClass("selected");
  } else if (top >= workOffset) {
    $("#nav-work").addClass("selected");
  } else if (top >= aboutOffset) {
    $("#nav-about").addClass("selected");
  }
}

function removeHash() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
  hashDidChange();
}

$(document).ready(function () {
  $(CLOSE_SELECTOR).on("click", function (e) {
    e.preventDefault();
    removeHash();
  });

  $(document).scroll(updateNavigation);

  $(ANCHOR_SELECTOR).click(function () {
    if (
      window.location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      window.location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length
        ? target
        : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top + 50,
          },
          1000
        );
        return false;
      }
    }
  });

  window.onhashchange = hashDidChange;

  updateNavigation();
  hashDidChange();
});
