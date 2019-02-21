	

# backend webserver starten 

python manage.py runserver

# migraties draaien
python manage.py makemigrations
python manage.py migrate

# dump current database state to fixture
python manage.py dumpdata


# fixture laden 
# fixtures moeten .json extensie hebben 
python manage.py loaddata initial_fixture.json

# file upload api aanroepen met CURL 

curl -F file=@/some/file/on/your/local/disk http://localhost:8080
