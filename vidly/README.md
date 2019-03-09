# Vidly - A Smaller Express Application
This is the core application we are building onto for this course using all the different functionality we learned

**In order for this application to run you have to set the vidly_jwtPrivateKey to some value like below:**

*Linux or Mac*
```
export vidly_jwtPrivateKey=someSecureKey
```

*Windows*
```
set vidly_jwtPrivateKey=someSecureKey
```

This custom environment variable is available because of the [custom-environment-variables.json](https://github.com/tylerreece22/NodeJSCourse/blob/master/vidly/config/custom-environment-variables.json) file. The `config` library does some nice stuff to do this for a dev environment set up.