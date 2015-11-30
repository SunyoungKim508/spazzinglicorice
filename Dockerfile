# CONTENTS OF DOCKERFILE

# Defining the parent image to use build our image from.
FROM node:5

# bundle app’s source code inside the Docker image
COPY . /src

# for using bower install
RUN echo '{ "allow_root": true }' > /src/.bowerrc
# move into the src directory where all the source code files live. install all npm dependencies
RUN cd /src; npm install;

#map port 8080 to the docker daemon.
#REMEMBER TO CHANGE THIS IF THE PORT IS CHANGED IN server.js
EXPOSE 8080

# define the command line code that will start up the server. src는 root directory로 보면 된다
CMD ["node", "/src/server.js"]  
