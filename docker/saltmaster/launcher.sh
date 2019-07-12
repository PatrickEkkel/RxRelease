#!/bin/bash
/usr/sbin/sshd -D &
salt-master &
salt-api &
salt-minion &

tail -f /dev/null
