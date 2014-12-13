smoothScroll.init({
    easing: 'easeInOutCubic', // Easing pattern to use
    callbackAfter: function ( toggle, anchor ) {
        
        var list_items = document.getElementById('navigation')
                                 .getElementsByTagName('li');
                                 
        for (var i = 0; i < list_items.length; i++) {
            var item = list_items[i];
            if (item.className) {
                item.className = item.className.replace(/\bcurrent\b/, '');
            }
        }

        var listItem = toggle.parentNode;
        toggle.parentNode.className += " current";
    }
});