from django.views.generic.base import TemplateView


class HomeView(TemplateView):
    template_name = 'my_app/home.html'

    def location(self):
        return 'HOME'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['location'] = self.location
        return context


class ContactView(HomeView):
    def location(self):
        return 'CONTACT'


class AboutView(HomeView):
    def location(self):
        return 'ABOUT'
