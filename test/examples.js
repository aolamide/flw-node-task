//Expected responses for requests examples

const examples = [
  {
    request_payload : {
      rule: {
        field: "0",
        condition: "eq",
        condition_value: "a"
      },
      data: "damien-marley"
    },
    response : {
      message: "field 0 failed validation.",
      status: "error",
      data: {
        validation: {
          error: true,
          field: "0",
          field_value: "d",
          condition: "eq",
          condition_value: "a"
        }
      }
    }
  },

  {
    request_payload : {
      "rule": {
        "field": "5",
        "condition": "contains",
        "condition_value": "rocinante"
      },
      "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
    },
    response : {
      "message": "field 5 is missing from data.",
      "status": "error",
      "data": null
    }
  },

  {
    request_payload : {
      "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
      }
    },
    response : {
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
  },

  {
    request_payload : {
      data: "damien-marley"
    },
    response : {
      message: "rule is required.",
      status: "error",
      data : null
    }
  }
]


module.exports = examples;