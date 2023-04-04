// Products page

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    $(document).ready(function () {
        // Set active category link 
        let urlParams = new URLSearchParams(window.location.search);
        let categoryParam = urlParams.get('category');

        if (categoryParam) {
            $('#category-links .btn').removeClass('btn-secondary').addClass('btn-outline-secondary');
            $(`#category-links .btn[href*="${categoryParam}"]`).removeClass('btn-outline-secondary').addClass(
                'btn-secondary');
        } else {
            $('#category-links .btn[href="{% url "products" %}"]').removeClass('btn-outline-secondary')
                .addClass('btn-secondary');
        }

        // Handle visibility of back-to-top button

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        // Handle sorting of product list in select box
        $('#sort-selector').change(function () {
            var selector = $(this);
            var currentUrl = new URL(window.location);

            var selectedVal = selector.val();
            if (selectedVal != "reset") {
                var sort = selectedVal.split("_")[0];
                var direction = selectedVal.split("_")[1];

                currentUrl.searchParams.set("sort", sort);
                currentUrl.searchParams.set("direction", direction);

                window.location.replace(currentUrl);
            } else {
                currentUrl.searchParams.delete("sort");
                currentUrl.searchParams.delete("direction");

                window.location.replace(currentUrl);
            }
        })
    });


// Product detail page

$(document).ready(function() {
    // Get item ID from URL and enable/disable Add to Bag button
    var url = window.location.href;
    var itemId = url.substring(url.lastIndexOf('/') + 1);
    handleEnableDisable(itemId);

    // Call handleEnableDisable function when quantity is changed
    $('.qty_input').change(function() {
        var itemId = $(this).data('item_id');
        handleEnableDisable(itemId);
    });
});

function handleEnableDisable(itemId) {
    var currentValue = parseInt($('#id_qty_' + itemId).val());
    var maxQuantity = parseInt($('#id_qty_' + itemId).attr('max'));
    var addButton = $('#add-to-bag_' + itemId);
    if (currentValue < 0) {
        $('#id_qty_' + itemId).val(0);
        return;
    }    
    if (currentValue > maxQuantity) {
        addButton.attr('disabled', true);
    } else {
        addButton.attr('disabled', false);
    }
    var availableQuantity = parseInt($('#available-quantity_' + itemId).text());
    if (availableQuantity == 0) {
        addButton.attr('disabled', true);
    }
    if (currentValue > availableQuantity) {
        $('#id_qty_' + itemId).val(availableQuantity);
    }
    $('#id_qty_' + itemId).attr('max', availableQuantity);
}


// Increment quantity
$('.increment-qty').click(function(e) {
    e.preventDefault();
    var closestInput = $(this).closest('.input-group').find('.qty_input')[0];
    var currentValue = parseInt($(closestInput).val());
    $(closestInput).val(currentValue + 1);
    var itemId = $(this).data('item_id');
    handleEnableDisable(itemId);
 });

 // Decrement quantity
 $('.decrement-qty').click(function(e) {
    e.preventDefault();
    var closestInput = $(this).closest('.input-group').find('.qty_input')[0];
    var currentValue = parseInt($(closestInput).val());
    $(closestInput).val(currentValue - 1);
    var itemId = $(this).data('item_id');
    handleEnableDisable(itemId);
 });