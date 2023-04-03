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