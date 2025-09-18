# Real Estate Properties API

A comprehensive REST API for managing real estate properties with advanced search, filtering, and pagination capabilities. Built with ASP.NET Core and MongoDB.

## Tech Stack

- **Backend Framework**: ASP.NET Core
- **Database**: MongoDB
- **Documentation**: Swagger/OpenAPI
- **Language**: C#

## Features

- ✅ **Property Listing**: Retrieve paginated lists of properties with owner information
- ✅ **Advanced Search**: Filter by name, address, and price range
- ✅ **Pagination**: Efficient pagination with customizable page sizes
- ✅ **Property Details**: Get complete property information with full owner details
- ✅ **Swagger Documentation**: Interactive API documentation
- ✅ **MongoDB Integration**: Robust database operations with optimized queries

## Installation

### Prerequisites

- .NET 8.0 SDK
- MongoDB Atlas account or local MongoDB instance
- Database with sample data (see `.mongodb` file for schema)

### Steps

1. **Run the application**
   ```bash
   dotnet run
   ```

2. **Access the API**
   - API: `http://localhost:5116` (or your configured port)
   - Swagger UI: `http://localhost:5116/swagger`

## Configuration

1. **Configure MongoDB connection**
   Update `appsettings.json`:
   ```json
   {
     "MongoDB": {
       "ConnectionString": "your-mongodb-connection-string",
       "DatabaseName": "RealEstateDB"
     }
   }
   ```

2. **Set up sample data**
   Run the script in `.mongodb` file in your MongoDB database to populate sample data.

## API

### Endpoints

#### 1. Get Properties List

**GET** `/api/properties`

Retrieve a paginated list of properties with optional search filters.

##### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `name` | string | Filter by property name (partial match, case-insensitive) | `name=apartamento` |
| `address` | string | Filter by property address (partial match, case-insensitive) | `address=calle` |
| `minPrice` | decimal | Minimum price filter | `minPrice=100000` |
| `maxPrice` | decimal | Maximum price filter | `maxPrice=500000` |
| `page` | int | Page number (1-based, default: 1) | `page=2` |
| `pageSize` | int | Items per page (default: 10, max: 100) | `pageSize=20` |

##### Response

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Apartamento en el centro",
      "address": "Calle del Comercio 101",
      "price": 150000,
      "codeInternal": "APT-001",
      "year": 2015,
      "owner": {
        "id": "507f1f77bcf86cd799439012",
        "name": "Sofía Martínez",
        "address": "Calle de la Luna 10"
      },
      "images": [
        {
          "file": "http://example.com/images/apt_1.jpg",
          "enabled": true
        }
      ],
      "trace": [
        {
          "dateSale": "2020-05-18T00:00:00Z",
          "name": "Compra inicial",
          "value": 145000,
          "tax": 5800
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

##### Examples

```bash
# Get all properties (default pagination)
GET /api/properties

# Search by name
GET /api/properties?name=apartamento

# Filter by price range
GET /api/properties?minPrice=100000&maxPrice=300000

# Search by address with custom pagination
GET /api/properties?address=calle&page=1&pageSize=5

# Combined filters
GET /api/properties?name=casa&minPrice=200000&pageSize=20
```

#### 2. Get Property Details

**GET** `/api/properties/{id}`

Retrieve detailed information about a specific property including complete owner information.

##### Path Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `id` | string | Property ID | Yes |

##### Response

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Apartamento en el centro",
  "address": "Calle del Comercio 101",
  "price": 150000,
  "codeInternal": "APT-001",
  "year": 2015,
  "owner": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Sofía Martínez",
    "address": "Calle de la Luna 10",
    "photo": "http://example.com/photos/sofia.jpg",
    "birthday": "1990-03-25T00:00:00Z"
  },
  "images": [
    {
      "file": "http://example.com/images/apt_1.jpg",
      "enabled": true
    }
  ],
  "trace": [
    {
      "dateSale": "2020-05-18T00:00:00Z",
      "name": "Compra inicial",
      "value": 145000,
      "tax": 5800
    }
  ]
}
```

##### Example

```bash
GET /api/properties/507f1f77bcf86cd799439011
```

### Data Models

#### Property
- `id`: Unique identifier
- `name`: Property name
- `address`: Property address
- `price`: Property price
- `codeInternal`: Internal code
- `year`: Year built
- `owner`: Owner information (summary or detailed)
- `images`: Array of property images
- `trace`: Transaction history

#### Owner
- `id`: Unique identifier
- `name`: Owner name
- `address`: Owner address
- `photo`: Owner photo URL
- `birthday`: Owner birthday