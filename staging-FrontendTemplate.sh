env=staging
project=FrontendTemplate
NODE_ENV=${env} pm2 start app.js -i 2 -n ${env}-${project} -l ~/beacon/log/${env}-${project}/all.log -e ~/beacon/log/${env}-${project}/err.log