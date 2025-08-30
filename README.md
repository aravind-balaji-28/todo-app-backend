
mongodb connect
----------------------------------

1.database connect terminal = docker exec -it todo-app-backend-mongo-1 mongosh -u mongoadmin -p secret --authenticationDatabase admin.
2.database connect mongodb compass = mongodb://mongoadmin:secret@localhost:27018/todo_app?authSource=admin.

Docker hub step
----------------
docker tag todo-app-backend-app:latest aravindbalaji28/backend:latest
docker push aravindbalaji28/todo-backend:latest      
docker pull aravindbalaji28/todo-backend 