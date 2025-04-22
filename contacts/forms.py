from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['first_name', 'last_name', 'phone_number', 'email', 'address', 'category']
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
        }

class ContactSearchForm(forms.Form):
    search = forms.CharField(required=False, label='Search by name')
    category = forms.ChoiceField(
        choices=[('', 'All Categories')] + Contact.CATEGORY_CHOICES,
        required=False,
        label='Filter by category'
    )