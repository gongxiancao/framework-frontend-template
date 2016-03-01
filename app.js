'use strict';
var framework = require('framework')(); // jshint ignore:line

module.exports = framework
.use('framework-env')
.use('framework-config')
.use('framework-model')
.use('framework-service')
.use('framework-controller')
.use('framework-seneca')
.use('framework-seneca-client')
.use('framework-express')
.use('framework-express-policy')
.use('framework-express-route')
.lift(function (err) {
  if(err) {
    console.error(err);
    return process.exit(1);
  }

  /*jshint multistr: true */
  console.log('\n\
                        .:/+ossssoo/:.            \n\
                     ./ssssoo+//+oossss/.         \n\
                   .+sss+-`        `-+sss+.       \n\
            ``..``:sss/.              `/sss:      \n\
         .:+ossssssss:                  :sss:     \n\
       `/ssso/:::+os/         ./+/`      /sss`    \n\
      `osso.      `-`        :ssss-      -sss.    \n\
     `:sss.                `+ssso-       -sss`    \n\
   ./ossss.   `.-----------osss+.       `osss:.   \n\
 .+sss+:-.`   :+oossssssssssss/`        `-/osss/` \n\
.oss+.          ``..-:/ossssss+`           `.+sso.\n\
oss+                  -ssssssss/              +sso\n\
sss/                .+ssso-./sss/             /sso\n\
/sso`             `/ssss:`   -oss:           .oss:\n\
`+sso-         `-/ssso:`      `:ss-      `-:+sss: \n\
  -osso/:---:/+ssso/-           `:`      :+++:-`  \n\
    .:+ossssso+/-.                                \n\
====================================================\n\
server started at port ' + framework.config.port);
});


