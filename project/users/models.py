from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name=models.CharField(max_length=255)
    email=models.CharField(unique=True)
    # rollnumber=models.CharField(max_length=12)
    # hall=models.CharField(max_length=255)
    # room_number=models.CharField(max_length=255)
    # passing_year=models.IntegerField()
    password=models.CharField(max_length=255)

    username=None  # django logins with username and password but we want to login with email and password.
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]









