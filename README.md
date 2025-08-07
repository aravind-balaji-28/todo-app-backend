database view terminal = docker exec -it todo-app-backend-mongo-1 mongosh -u mongoadmin -p secret --authenticationDatabase admin
database view mongodb compass = mongodb://mongoadmin:secret@localhost:27018/todo_app?authSource=admin
