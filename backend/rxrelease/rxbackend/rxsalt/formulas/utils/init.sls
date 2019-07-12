epel-release:
 pkg.installed
htop:
 pkg.installed
ntp:
 pkg.installed
bzip2:
 pkg.installed
wget:
 pkg.installed
vim-enhanced:
 pkg.installed
lsof:
 pkg.installed
iotop:
 pkg.installed
zip:
 pkg.installed
set_timezone: 
 cmd.run:
  - name: ln -sf /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime
unzip: 
 pkg.installed
telnet:
 pkg.installed: []
atop:
 pkg.installed 
mlocate:
 pkg.installed
net-tools:
 pkg.installed
python2-pip:
 pkg.installed
upgrade-pip:
 cmd.run:
  - name: pip install --upgrade pip
  - require:
    - pkg: python2-pip
ntp_service:
 service.running:
    - name: ntpd
    - enable: True
    - reload: True

salt-2017repo:
 pkg.installed:
   - sources:
     - salt-repo: https://repo.saltstack.com/yum/redhat/salt-repo-2017.7-1.el7.noarch.rpm



/opt/utils/:
  file.directory:
    - user: root
    - group: root
    - dir_mode: 755
    - file_mode: 644
    - recurse:
      - user
      - group
      - mode

/opt/utils/diskspace_expand.sh:
 file:
  - managed
  - source: salt://utils/diskspace_expand.sh
  - user: root
  - group: root
  - mode: 755
  - context:

