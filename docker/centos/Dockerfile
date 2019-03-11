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
RUN ssh-keygen -A
RUN yum -y install openssh-clients
COPY launcher.sh /root
#RUN rm -rf /lib/systemd/system/multi-user.target.wants/;
RUN rm -rf /etc/systemd/system/.wants/;
RUN rm -rf /lib/systemd/system/local-fs.target.wants/;
RUN rm -rf /lib/systemd/system/sockets.target.wants/udev;
RUN rm -rf /lib/systemd/system/sockets.target.wants/initctl;
RUN rm -rf /lib/systemd/system/basic.target.wants/;
RUN rm -rf /lib/systemd/system/anaconda.target.wants/*;
VOLUME ["/sys/fs/cgroup"]
CMD ["/usr/sbin/init"]
