{% from "docker_ce/map.jinja" import docker_ce  with context %}

{% set  all_users = salt['user.list_users']() %}


remove_legacy_docker_packages:
  pkg:
    - removed
    - pkgs:
      - docker-common
      - docker-selinux
      - docker-engine

lvm2:
 pkg.installed

device-mapper-persistent-data:
 pkg.installed

docker-ce:
 pkg.installed:
   - require:
      - file: install_docker_engine

install_docker_engine:
  file.managed:
    - name: /etc/yum.repos.d/docker-ce.repo
    - source: http://download.docker.com/linux/centos/docker-ce.repo
    - source_hash: md5=bbb0224eb355f307b39eed429c61be09

{% set source_hash = salt['cmd.run']('echo "md5=`curl -s "https://github.com/docker/compose/releases/download/1.14.0/docker-compose-Linux-x86_64" | md5sum | cut -c -32`"') %}

docker-compose-pkg:
  file.managed:
    - name: /usr/local/bin/docker-compose
    - user: root
    - group: root
    - mode: 755
    - source: https://github.com/docker/compose/releases/download/1.14.0/docker-compose-Linux-x86_64
    - source_hash: md5=700032a9c6789d8d5676f0aa8c3a6a00
    - require:
      - file: install_docker_engine

/usr/lib/systemd/system/docker.service:
  file:
    - managed
    - template: jinja
    - source: salt://docker_ce/docker.service.j2
    - user: root
    - group: root
    - mode: 644
    - context:
        data: {{ docker_ce }}

docker-service:
 service.running:
  - name: docker
  - enable: true
