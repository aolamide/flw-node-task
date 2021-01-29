# Rule-validation API

## Install

    npm install

## Run the app

    npm start

## Run the tests

    npm test



### Example Request
`POST /validate-rule`

```json
{
  "rule":  {
    "field":  "missions",
    "condition":  "gte",
    "condition_value":  30
  },
  "data":  {
    "name":  "James Holden",
    "crew":  "Rocinante",
    "age":  34,
    "position":  "Captain",
    "missions":  45
  }
}
```

### Example Response
`200 OK`

```json
{
  "message": "field missions successfully validated.",
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value": 30
    }
  }
}
```