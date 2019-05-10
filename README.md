# BeautifyApacheStatus #
###### An Apache built-in Server Status Page Beautifier ######
[![Build Status](https://travis-ci.org/ashenm/beautify-apache-status.svg?branch=master)](https://travis-ci.org/ashenm/beautify-apache-status)

![before](docs/img/before.png) ![after](docs/img/after.png)

### USAGE ###

```apache
<Location /status>

  ...

  SetHandler server-status
  Substitute 's|</head>|<script src="https://ashenm.github.io/beautify-apache-status/beautify-apache-status.min.js" type="text/javascript"></script></head>|'

  ...

</Location>
```
