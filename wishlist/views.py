from django.urls import path
from django.shortcuts import render

# Create your views here.


def wishlist(request):
    """ A view to return wishlist items"""

    return render(request, 'wishlist/wishlist.html')
