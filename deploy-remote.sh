cd ~/beacon

# install npm modules if package.json changed
cd ${env}_${project}_stage/deployment

sudo rm -rf node_modules
if ! cmp ~/beacon/${env}_${project}/deployment/package.json.complete package.json >/dev/null 2>&1
then
  https_proxy= http_proxy= $npm install
  if [ "$?" != "0" ]; then
    exit 1
  fi

  cp package.json package.json.complete

else
  if [ "$renpm" == "1" ]; then
    https_proxy= http_proxy= $npm install
    if [ "$?" != "0" ]; then
      exit 1
    fi
  else
    echo cp -rf ~/beacon/${env}_${project}/deployment/node_modules ./
    cp -rf ~/beacon/${env}_${project}/deployment/node_modules ./
  fi
  cp package.json package.json.complete
fi

cd ~/beacon

echo rm -rf ${env}_${project}_bak
rm -rf ${env}_${project}_bak

echo mv ${env}_${project} ${env}_${project}_bak
mv ${env}_${project} ${env}_${project}_bak

echo mv ${env}_${project}_stage ${env}_${project}
mv ${env}_${project}_stage ${env}_${project}

cd ${env}_${project}/deployment


# echo pm2 stop ${env}-${project}.js
# echo $password | sudo -S pm2 stop ${env}-${project}.js

echo pm2 stop ${env}-${project}
pm2 stop ${env}-${project}


chmod 777 ${env}-${project}.sh

echo ${env}-${project}.sh
./${env}-${project}.sh

sleep 5

pm2 list

# echo sudo pm2 logs ${env}-${project}.js
# echo $password | sudo -S pm2 logs ${env}-${project}.js


