if [ "$project" == "" ]; then
  echo "Please enter project to deploy: "
  read project
fi
if [ "$target" == "" ]; then
  echo "Please enter target to build: "
  read -s target
fi

if [ "$env" == "" ]; then
  echo "Please enter env to deploy to: "
  read env
fi

if [ "$host" == "" ]; then
  echo "Please enter host to connect to: "
  read host
fi
if [ "$user" == "" ]; then
  echo "Please enter user to connect to $host: "
  read user
fi

if [ "$port" == "" ]; then
  port=22
fi

if [ "$npm" == "" ]; then
  npm=cnpm
fi

# if [ "$password" == "" ]; then
#   echo "Please enter password to connect to $host: "
#   read -s password
# fi

startDir=$(pwd)
echo deploy $project from $startDir to $host

if [ "$nobuild" != "1" ]; then
  echo gulp deploy
  gulp deploy
fi

date "+部署于: %Y-%m-%d %H:%M:%S" > ./deployment/www/version.txt
(echo -ne '提交码: ' && git log -1 --format=format:%H) >> ./deployment/www/version.txt


echo rsync -azvF -e "ssh -p $port" deployment $user@$host:~/beacon/${env}_${project}_stage
rsync -azvF -e "ssh -p $port" deployment $user@$host:~/beacon/${env}_${project}_stage

scp -P $port ./deploy-remote.sh $user@$host:~/beacon/

if [ "$noclean" != "1" ]; then
  rm -rf deployment
fi

echo run deploy script on remote server with project=$project env=$env
ssh -p $port $user@$host  "chmod 777 ~/beacon/deploy-remote.sh"

ssh -p $port $user@$host "password=$password project=$project env=$env renpm=$renpm npm=$npm bash -login -c ~/beacon/deploy-remote.sh"

