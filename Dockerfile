FROM node:16-alpine
COPY ./admin_portal /admin_portal
WORKDIR /admin_portal
EXPOSE 3000

ARG DEV=false
RUN npm install && \
    if [ $DEV = "true" ]; \
    then npm run dev & \
    fi 
