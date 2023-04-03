from django import forms

class AddToBagForm(forms.Form):
    quantity = forms.IntegerField(label='Quantity', min_value=1)
