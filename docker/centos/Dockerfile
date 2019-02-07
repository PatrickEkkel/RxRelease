FROM centos:7

RUN yum -y update; yum clean all
RUN yum -y install openssh-server passwd; yum clean all
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N ''

RUN yum install which -y
RUN yum install mlocate -y
RUN adduser test
RUN chmod 0640 /etc/shadow
RUN echo test | passwd --stdin test
RUN echo test | passwd --stdin root
#ENTRYPOINT ["/usr/sbin/sshd", "-D"]
COPY launcher.sh /root
ENTRYPOINT ["./root/launcher.sh"]
