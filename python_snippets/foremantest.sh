#!/bin/sh
USER="admin"
PASS="ktfewHRZCx4MomrV"
FOREMAN_URL="https://foreman.topicusoverheid.local"
NAME=$1
HOSTGROUP_ID="Provision from foreman.topicusoverheid.local"  # Change this to your favorite hostgroup

curl -k -s -H "Accept:application/json" \
     -k -u $USER:$PASS \
     -d "host[name]=$NAME" -d "host[hostgroup_id]=$HOSTGROUP_ID" \
     -d "host[powerup]=1"  -d "host[build]=1" \
     -d "authenticity_token=PvAlraDKjzekDJzMq/a8UAZhmmLePWurx2uZlSb+TIr5kV3xX/UVsh8Y9QtcqyDAbyxVolXfs9i09K36sQ200g==" --cookie cookie
     $FOREMAN_URL/hosts 

