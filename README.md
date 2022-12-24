# Deall Backend Assignment

## Start the application

```
kubectl apply -f db.yaml
kubectl apply -f server.yaml
kubectl port-forward service/todo-server-service 8080:80
```

## API Documentation

Import `deall-todo.postman_collection.json` to postman

## Screenshots

register
![1](./images/1.png)

login & get access token
![2](./images/2.png)

supply access token to /message
![3](./images/3.png)

POST message
![4](./images/4.png)

see that message in GET /message
![5](./images/5.png)

update POST /message:id
![52](./images/5-2.png)

see updated message
![6](./images/6.png)

DELETE /message:id
![6](./images/7.png)

confirm deleted
![6](./images/8.png)
