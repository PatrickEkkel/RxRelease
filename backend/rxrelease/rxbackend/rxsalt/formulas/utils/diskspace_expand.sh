#!/bin/bash

DEVICE=$1
VG=$2

usage ()
{
  echo 'Usage : Script -d <device> -v <volumegroup>'
  echo 'example usage ./diskspace_expand_script -d /dev/sdb -v centos_example_vg '
  exit
}
while [ "$1" != "" ]; do
case $1 in
        -d )           shift
                       DEVICE=$1
                       ;;
        -v )           shift
                       VG=$1
                       ;;
        * )            QUERY=$1
    esac
    shift
done


if [ "$DEVICE" = "" ]
then
    usage
fi
if [ "$VG" = "" ]
then
    usage
fi

if [[ ! -e $DEVICE ]]; then
   echo "$DEVICE does not exist, stopping script"
   exit 1
fi
vgdisplay | grep -q $VG
if [[ ! ?$ ]]; then
  echo "Volumegroup kon niet gevonden worden, check de output van vgdisplay welke volumegroups er zijn"
  exit 1
fi



echo "Starting the expanding of a existing LVM volume"

(
echo o # Create a new empty partition table
echo n # Add a new partition
echo p # Primary partition
echo 1 # Partition number
echo   # First sector (Accept default: 1)
echo   # Last sector (Accept default: varies)
echo w # Write changes
) | sudo fdisk $DEVICE > /dev/null


(
echo t # Create a new empty DOS partition table
echo 8e # Create an new LVM partition
echo w # Write changes
) | sudo fdisk $DEVICE > /dev/null

pvcreate ${DEVICE}1 > /dev/null
vgextend ${VG}  ${DEVICE}1 > /dev/null
VOLUME_SIZE=`lvdisplay |   sed -n -e "/$VG\/root/,/Allocation/ p" | awk 'NR==10 {print $3}'`
FREE_PE=`vgdisplay |   sed -n -e "/${VG}/,/UUID/ p" | awk 'NR==18 {print $5}'`

#echo $FREE_PE

lvextend -l +${FREE_PE} /dev/$VG/root > /dev/null

xfs_growfs /dev/$VG/root > /dev/null 2>&1

