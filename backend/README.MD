

# backend webserver starten 

python manage.py runserver

# migraties draaien
python manage.py makemigrations
python manage.py migrate

# dump current database state to fixture
python manage.py dumpdata


# fixture laden 
python manage.py loaddata initial_fixture
