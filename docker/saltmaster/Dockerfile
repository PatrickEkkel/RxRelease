FROM sshd_centos:latest
RUN yum -y install https://repo.saltstack.com/yum/redhat/salt-repo-latest.el7.noarch.rpm
RUN yum -y install salt-master
RUN yum -y install salt-minion
RUN yum -y install salt-api
RUN adduser salt
RUN echo salt | passwd --stdin salt
COPY launcher.sh /root/launcher.sh
COPY master /etc/salt/master
COPY minion /etc/salt/minion
#ENTRYPOINT ["tail","-f","/dev/null"]
ENTRYPOINT ["./root/launcher.sh"]
