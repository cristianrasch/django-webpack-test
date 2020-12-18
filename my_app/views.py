from django.shortcuts import render

def home(request):
    return render(request, 'my_app/home.html', {'greeting': 'Hello from Django!'})
