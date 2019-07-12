
yum-utils:
 pkg.installed

device-mapper-persistent-data:
 pkg.installed

lvm2:
 pkg.installed

docker_repo:
 pkgrepo.managed:
  - humanname: "Docker CE Repo"
  - baseurl: https://download.docker.com/linux/centos/7/$basearch/stable
  - gpgcheck: 1
  - gpgkey: https://download.docker.com/linux/centos/gpg
  - require_in:
    - pkg: docker-ce

 pkg.latest:
  - name: docker-ce
  - refresh: True

docker_running:
 service.running:
   - name: docker
   - watch:
     - pkg: docker-ce
