from django.shortcuts import render, redirect
from django.contrib import messages
from django.shortcuts import get_object_or_404
from products.models import Product


# Create your views here.

def view_bag(request):
    """ A view that renders the bag contents page """

    return render(request, 'bag/bag.html')

def add_to_bag(request, item_id):
    """ Add a quantity of the specified product to the shopping bag """

    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    size = None
    if 'product_size' in request.POST:
        size = request.POST['product_size']
    product = get_object_or_404(Product, pk=item_id)
    bag = request.session.get('bag', {})

    if quantity > product.quantity:
        messages.error(request, "Sorry, there isn't enough stock available for this product.")
        return redirect(redirect_url)

    if item_id in bag:
        bag[item_id]['quantity'] += quantity
    else:
        bag[item_id] = {
            'quantity': quantity,
            'size': size,
        }

    request.session['bag'] = bag
    messages.success(request, f"{product.name} added to your bag!")
    return redirect(redirect_url)