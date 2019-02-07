FROM sshd_centos:latest
RUN yum -y install https://repo.saltstack.com/yum/redhat/salt-repo-latest.el7.noarch.rpm
RUN yum -y install salt-master
RUN yum -y install salt-minion
COPY launcher.sh /root/launcher.sh
#ENTRYPOINT ["tail","-f","/dev/null"]
ENTRYPOINT ["./root/launcher.sh"]
