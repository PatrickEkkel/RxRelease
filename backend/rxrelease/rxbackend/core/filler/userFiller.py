from django.contrib.auth.models import User
class UserFiller:
    def fillStandardUserSet(self):
     user = User.objects.create_user(username='admin',email='admin@rxrelease.com',password='admin')
