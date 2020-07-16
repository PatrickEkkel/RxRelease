
postgresql_service:
 file.managed:
  - name: /usr/lib/systemd/system/postgresql.service
  - source: salt://PostgreSQL/postgresql.service


postgresql-server:
 pkg.installed

{% if  not salt['file.directory_exists']('/var/lib/pgsql/data') %}
init_postgresql_db:
 cmd.run:
  - name: postgresql-setup initdb
{% endif %}
postgresql_running:
 service.running:
   - name: postgresql
   - watch:
     - pkg: postgresql-server
