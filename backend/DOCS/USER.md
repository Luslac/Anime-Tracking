# User API Spec

## Register User API

Endpoint : POST /api/v1/registration

Request Body : 

```json
{
  "username" : "testing",
  "password" : "testing123456",
  "name"     : "test"
}
```

Response Body Success :
```json
{
    "success"    : true,
    "message"  : "New User Created",
    "data" : {
        "user" : {
            "username" : "test",
            "name"     : "testing"
        }
    }
}
```

Response Body Error :
```json
{
  "errors" : "BASED ON ERROR",
  "status" : false
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :
```json
{
  "username" : "Dokja",
  "password" : "kingofkinglessworld"
}
```
Response Body Success :
```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```
Response Body Error :
```json
{
  "errors" : "Username or password wrong",
}
```