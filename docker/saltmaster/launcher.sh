#!/bin/bash
/usr/sbin/sshd -D &
salt-master &
salt-minion &

tail -f /dev/null
