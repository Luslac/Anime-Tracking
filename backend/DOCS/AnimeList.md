# Anime List

### Add Anime To My List
Endpoint: POST /api/v1/watchList

Request Body: 
```json
{   
    
    "animeId": 5119,
    "image_url": "http://ContohLink.png/test/api",
    "title" : "Judul Anime",
    "status" : "status yang dimasukan user"
}
```

Response Body: 

Success:
```json 
{
    "success" : true,
    "message" : "New Anime Add To List",
    "data"    : {   
        "animeId": 5119,
        "image_url":"http://ContohLink.png/test/api",
        "title" : "Judul Anime",
        "status" : "status yang dimasukan user"
    }
}   
```

Error: 
```json
{   
    "errors" : "error message sesuai error",
    "success": false
}
```

### Get Anime From My List
Endpoint: GET /api/v1/watchList

Query Parameters (Optional):
- `status` : "WATCHING" | "COMPLETED" | "PLAN_TO_WATCH" | 
- `isFavorite` : true | false
- `score` : 1-10
- `rating` : 1-10

Response Body:

Success:
```json
{
    "success": true,
    "message": "Anime list retrieved successfully",
    "data": [
        {
        
            "animeId": 5119,
            "image_url": "http://ContohLink.png/test/api",
            "title": "Judul Anime",
            "status": "WATCHING",
            "score": 8,
            "rating": 9,
            "episodesWatched": 12,
            "isFavorite": true,
            "notes": "Anime yang bagus",
            "startedAt": "2024-01-15T10:30:00Z",
            "completedAt": null,
            "addedAt" : "2024-01-15T10:30:00Z",
            "updatedAt" : "2024-01-15T10:30:00Z"
        }
    ]
}
```

Error:
```json
{
    "success": false,
    "errors": "Never added anime to list"
}
```

atau
```json
{
    "success": false,
    "errors": "Anime Not Found"
}
```

---

### Update Anime In My List
Endpoint: PATCH /api/v1/watchList

Request Body:
```json
{
    "animeId": 5119,
    "status": "COMPLETED",
    "rating": 9,
    "score": 8,
    "episodesWatched": 24,
    "notes": "Anime yang sangat bagus!",
    "isFavorite": true
}
```

Response Body:

Success:
```json
{
    "success": true,
    "message": "Anime updated successfully",
    "data": {
    
        "animeId": 5119,
        "image_url": "http://ContohLink.png/test/api",
        "title": "Judul Anime",
        "status": "COMPLETED",
        "rating": 9,
        "score": 8,
        "episodesWatched": 24,
        "notes": "Anime yang sangat bagus!",
        "isFavorite": true,
        "startedAt": "2024-01-15T10:30:00Z",
        "completedAt": "2024-02-16T14:20:00Z",
        "addedAt" : "2024-01-15T10:30:00Z",
        "updatedAt" : "2024-01-15T10:30:00Z"
    }
}
```

Error:
```json
{
    "success": false,
    "errors": "Anime not found in your list"
}
```

atau
```json
{
    "success": false,
    "errors": "Rating must be between 1-10"
}
```

atau
```json
{
    "success": false,
    "errors": "Score must be between 1-10"
}
```

---

### Remove Anime From My List
Endpoint: DELETE /api/v1/watchList

Request Body:
```json
{
    "animeId": 5119
}
```

Response Body:

Success:
```json
{
    "success": true,
    "message": "Anime removed from list",
    "data": {
        "animeId": 5119,
        "title": "Judul Anime"
    }
}
```

Error:
```json
{
    "success": false,
    "errors": "Anime not found in your list"
}
```