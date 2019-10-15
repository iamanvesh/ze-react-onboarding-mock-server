Mock backend for React.js on-boarding assignment
===


Setup Instructions
===

- Make sure you have node.js and npm installed on your machine.
- Clone repository `git clone https://github.com/iamanvesh/ze-react-onboarding-mock-server.git`.
- Move to project directory `cd ze-react-onboarding-mock-server`.
- Run `npm install` to install the dependencies.
- Start the server using `npm run start` command.


API Reference
===


**LOGIN**

**Endpoint:** `/login`

**Method**: `POST`

**Request Body (JSON):**

```username=[string]``` (required)

```password=[string]``` (required)

**Response Body (JSON):**

```$json
{
    "access_token" : "access-token"
}
```


**LOCATIONS LIST (requires authorization)**

**Endpoint:** `/locations`

**Method**: `GET`

**Request Headers**:

`Authorization=<access_token>`

**Response Body (JSON):**

```$json
[
  {
    "id": 1,
    "lat": 40.712776,
    "lng": -74.005974
  },
  {
    "id": 2,
    "lat": 42.360081,
    "lng": -71.058884
  }
]
```

**ADD LOCATION (requires authorization)**

**Endpoint:** `/locations`

**Method**: `POST`

**Request Headers**:

`Authorization=<access_token>`

**Request Body (JSON):**

```lat=[number]``` (required)

```lng=[number]``` (required)

**Response Body (JSON):**

```$json
{
  "id": 1,
  "lat": 40.712776,
  "lng": -74.005974
}
```
