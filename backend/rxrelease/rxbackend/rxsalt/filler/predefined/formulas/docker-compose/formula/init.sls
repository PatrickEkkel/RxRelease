
download_docker_compose:
 cmd.run:
  - name: curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

/usr/local/bin/docker-compose:
 file.managed:
  - user: root
  - group: root
  - mode: 755
  - replace: False

/bin/docker-compose:
 file.symlink:
   - target: /usr/local/bin/docker-compose
