#!/usr/bin/python3
# TODO: voordat we dit af mogen noemen met ik de package malaise oplossen. Dit werkt nu alleen omdat ik een symlink gelegd hebben tussen ../ssh naar ./ssh
import logging
import sh
import json
import os.path, sys
import paramiko
#sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))
from pathlib import Path
from ssh import SSHClient
from rxfilestore import RxFileStore

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

localuser="patrick"
remoteuser="rxrelease"
# TODO dit plaatsen in een soort van utils implementatie
def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")
# script parameters

# sys.argv parameters
# 1 - ip address
# 2 - location of the keyvalue listfile

# TODO: keyval list hiervoor gebruiken. voor nu even hardcoded vars gebruiken

ipaddress = sys.argv[1]
keyvallist = sys.argv[2]

data = json.loads(keyvallist)

dryrun = data["dryrun"]

filestore = RxFileStore('/home/' + localuser + '/.rxrelease')

if str2bool(dryrun):
 logger.info("running script in dryrun with the following parameters")
 logger.info(keyvallist)
 #filestore.createDir('nogmeertest')
 #filestore.setContext('/nogmeertest')
 #filestore.copyFile('/tmp/test')
 sys.exit()

logger.info("connecting with ipaddress: " + ipaddress)
 # TODO: code toevoegen die connectieproblemen afvangt
try:
 client = SSHClient.withPassword(ipaddress,data["username"],data["password"])

 # user creation on remote machine
 if client.sendCommand('id -u ' + remoteuser) == 1:
  #user does not exist, lets make it
  logger.info("user " + remoteuser +  " does not exist on " + ipaddress)
  client.sendCommand('adduser ' + remoteuser )

  # after user creation we want to be able to transfer the public key to the remote server. But first we need to generate a private/public key pair on this server

 # Run ssh-keygen on the local machine
 rxfilestore = '/home/' + localuser + '/.rxrelease'
 installed_id_rsa = '/home/' + localuser + '/.ssh/id_rsa'
 installed_id_rsa_pub = '/home/' + localuser + '/.ssh/id_rsa.pub'
 id_rsa = rxfilestore + '/id_rsa'
 id_rsa_pub = rxfilestore + '/id_rsa.pub'

 #if not os.path.exists(rxfilestore):
 #     os.makedirs(rxfilestore)

 # if there is no private key in the rxfilestore dir, then create a new one
 if not Path(id_rsa).exists():
  sh.ssh_keygen("-t","rsa","-f",id_rsa,_in="\n")

 # install public and private keys on current user
 local_ssh_dir = '/home/' + localuser + '/.ssh'
 if not Path(local_ssh_dir).exists(): 
  os.makedirs('/home/' + localuser + '/.ssh')

 if not Path(installed_id_rsa).exists():
  sh.cp(id_rsa,'/home/' + localuser + '/.ssh/')
 if not Path(installed_id_rsa_pub).exists():
  sh.cp(id_rsa_pub,'/home/' + localuser + '/.ssh/')

 # we need to transfer the public key to the host 
 client.sendCommand('mkdir -p /home/' + remoteuser + '/.ssh')
 # TODO: misschien moeten we dit nog wat vriendelijker maken.. nu pleurt hij er gewoon een nieuw bestand neer, niet zo cool als er al keys geconfigureerd waren
 client.sendFile(id_rsa_pub,'/home/' + remoteuser + '/.ssh/authorized_keys')
 client.sendCommand("echo '" + remoteuser +  " ALL=(ALL) NOPASSWD:ALL' | sudo EDITOR='tee -a' visudo")

 # on my ubuntu i need to call ssh-add to get the authentication working.. 
 sh.ssh_add()
except paramiko.AuthenticationException:
 print("oops")
 raise
 
 

