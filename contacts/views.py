from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db import models  # Add this import
from .models import Contact
from .forms import ContactForm, ContactSearchForm

def contact_list(request):
    contacts = Contact.objects.all()
    search_form = ContactSearchForm(request.GET or None)
    
    if search_form.is_valid():
        search_term = search_form.cleaned_data.get('search')
        category = search_form.cleaned_data.get('category')
        
        if search_term:
            contacts = contacts.filter(
                models.Q(first_name__icontains=search_term) | 
                models.Q(last_name__icontains=search_term)
            )
        if category:
            contacts = contacts.filter(category=category)
    
    context = {
        'contacts': contacts,
        'search_form': search_form,
    }
    return render(request, 'contacts/contact_list.html', context)

def contact_detail(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    return render(request, 'contacts/contact_detail.html', {'contact': contact})

def contact_create(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()
            messages.success(request, 'Contact created successfully!')
            return redirect('contact_detail', pk=contact.pk)
    else:
        form = ContactForm()
    return render(request, 'contacts/contact_form.html', {'form': form, 'title': 'Create Contact'})

def contact_update(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == 'POST':
        form = ContactForm(request.POST, instance=contact)
        if form.is_valid():
            form.save()
            messages.success(request, 'Contact updated successfully!')
            return redirect('contact_detail', pk=contact.pk)
    else:
        form = ContactForm(instance=contact)
    return render(request, 'contacts/contact_form.html', {'form': form, 'title': 'Update Contact'})

def contact_delete(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == 'POST':
        contact.delete()
        messages.success(request, 'Contact deleted successfully!')
        return redirect('contact_list')
    return render(request, 'contacts/contact_confirm_delete.html', {'contact': contact})

def homepage(request):
    return render(request, 'contacts/homepage.html')