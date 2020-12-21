from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_staff = user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    password = models.CharField(max_length=128, verbose_name='password')
    last_login = models.DateTimeField(blank=True, null=True, verbose_name='last login')
    is_superuser = models.BooleanField(default=False,
                                       help_text='Designates that this user has all permissions without explicitly assigning them.',
                                       verbose_name='superuser status')
    first_name = models.CharField(blank=False, max_length=150, verbose_name='first name')
    last_name = models.CharField(blank=False, max_length=150, verbose_name='last name')
    email = models.EmailField(blank=False, max_length=255, verbose_name='email address',
                              unique=True)
    is_staff = models.BooleanField(default=False,
                                   help_text='Designates whether the user can log into this admin site.',
                                   verbose_name='staff status')
    is_active = models.BooleanField(default=True,
                                    help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.',
                                    verbose_name='active')
    date_joined = models.DateTimeField(default=timezone.now,
                                       verbose_name='date joined')

    groups = models.ManyToManyField(blank=True,
                                    help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
                                    related_name='user_set',
                                    related_query_name='user',
                                    to='auth.Group',
                                    verbose_name='groups')

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return ' '.join([self.first_name, f'{self.last_name[0]}.'])
