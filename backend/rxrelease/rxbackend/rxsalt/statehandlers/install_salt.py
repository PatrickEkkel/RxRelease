#!/usr/bin/python3
from ssh import SSHClient
import logging
import paramiko
import sh
import sys
import json
# we gaan er even vanuit dat passwordless_sshlogin vanaf deze locatie nu geregeld is

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


ipaddress = sys.argv[1]
keyvallist = sys.argv[2]

data = json.loads(keyvallist)

logger.info("Installing Salt minion for " + data['os'] + " under useraccount " + data['username'])
currenthost = data['saltmaster']
client = SSHClient(ipaddress)

try: 
 client.loginWithKeys(data['username'])
 
 if data['os'] == "CentOS":
  # first remove salt, if it was already installed
  client.sendBlockingCommand('sudo yum remove -y salt-minion')
  client.sendBlockingCommand('sudo rm -rf /etc/salt')
  client.sendBlockingCommand('sudo yum install -y salt-minion')
  client.sendCommand('sudo sed -i "s|#master: salt|master:\ "' + currenthost + '"|g" /etc/salt/minion')
  client.sendBlockingCommand('sudo systemctl start salt-minion')
except paramiko.AuthenticationException:
 print("oops")
 raise







