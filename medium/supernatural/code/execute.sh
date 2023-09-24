if [ ! "$(docker ps -a | grep seraphina)" ]; then
    docker run -d --name seraphina alpine:3.14
fi

docker exec -it seraphina bash -c "echo \"$(cat /proc/sys/kernel/random/uuid)\" >> /home/potions.txt" # Do not remove or comment this line

# Write your code here


