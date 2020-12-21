from django.apps import AppConfig as BaseAppConfig


class AppConfig(BaseAppConfig):
    name = 'my_app'
    verbose_name = 'My App'

    def ready(self):
        from django.contrib import admin
        from django.contrib.admin import sites

        class AdminSite(admin.AdminSite):
            site_header = 'Django-Weback test admininistration'
            site_title = 'Django-Weback test site admin'
            index_title = 'Site admin'

        site = AdminSite()
        admin.site = site
        sites.site = site
