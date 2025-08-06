#Mention version
FROM node:20-alpine  
#Mention directory
WORKDIR /app
#Copy Packagejson file 
COPY package*.json ./
#Install package and pm2 
RUN npm install
RUN npm install -g pm2
#Copy Application code 
COPY . .
#Expose Port
EXPOSE 3000
#Start Pm2
CMD ["pm2-runtime","app.js"]

