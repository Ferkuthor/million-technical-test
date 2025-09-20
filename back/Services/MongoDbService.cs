using MongoDB.Driver;
using System.Text.RegularExpressions;

/// <summary>
/// Service for MongoDB database operations
/// </summary>
public class MongoDbService
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Property> _properties;
    private readonly IMongoCollection<Owner> _owners;

    /// <summary>
    /// Initializes a new instance of the MongoDbService
    /// </summary>
    /// <param name="connectionString">MongoDB connection string</param>
    /// <param name="databaseName">Database name</param>
    public MongoDbService(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
        _properties = _database.GetCollection<Property>("properties");
        _owners = _database.GetCollection<Owner>("owners");
    }

    /// <summary>
    /// Gets paginated properties with owner information and optional filters
    /// </summary>
    /// <param name="name">Optional name filter (partial match)</param>
    /// <param name="address">Optional address filter (partial match)</param>
    /// <param name="minPrice">Optional minimum price filter</param>
    /// <param name="maxPrice">Optional maximum price filter</param>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of properties with owner information</returns>
    public async Task<PaginatedResponseDto<PropertyDto>> GetPropertiesAsync(
        string? name = null,
        string? address = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int page = 1,
        int pageSize = 10)
    {
        // Build filter
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
        {
            filters.Add(filterBuilder.Regex(p => p.Name, new Regex(name, RegexOptions.IgnoreCase)));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            filters.Add(filterBuilder.Regex(p => p.Address, new Regex(address, RegexOptions.IgnoreCase)));
        }

        if (minPrice.HasValue)
        {
            filters.Add(filterBuilder.Gte(p => p.Price, minPrice.Value));
        }

        if (maxPrice.HasValue)
        {
            filters.Add(filterBuilder.Lte(p => p.Price, maxPrice.Value));
        }

        var filter = filters.Count > 0 ? filterBuilder.And(filters) : FilterDefinition<Property>.Empty;

        // Get total count
        var totalItems = await _properties.CountDocumentsAsync(filter);

        // Calculate pagination
        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
        var skip = (page - 1) * pageSize;

        // Get properties with pagination
        var properties = await _properties
            .Find(filter)
            .Skip(skip)
            .Limit(pageSize)
            .ToListAsync();

        // Get owner IDs for lookup
        var ownerIds = properties.Select(p => p.OwnerId).Distinct().ToList();

        // Fetch owners
        var ownerFilter = Builders<Owner>.Filter.In(o => o.Id, ownerIds);
        var owners = await _owners.Find(ownerFilter).ToListAsync();
        var ownerDict = owners.ToDictionary(o => o.Id!, o => o);

        // Map to DTOs
        var propertyDtos = properties.Select(p => new PropertyDto
        {
            Id = p.Id,
            Name = p.Name,
            Address = p.Address,
            Price = p.Price,
            CodeInternal = p.CodeInternal,
            Year = p.Year,
            Images = p.Images,
            Trace = p.Trace,
            Owner = ownerDict.TryGetValue(p.OwnerId, out var owner) ? new OwnerSummaryDto
            {
                Id = owner.Id,
                Name = owner.Name,
                Address = owner.Address
            } : new OwnerSummaryDto()
        }).ToList();

        return new PaginatedResponseDto<PropertyDto>
        {
            Data = propertyDtos,
            Pagination = new PaginationDto
            {
                CurrentPage = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                HasNext = page < totalPages,
                HasPrevious = page > 1
            }
        };
    }

    /// <summary>
    /// Gets paginated properties optimized for listing (only essential fields)
    /// </summary>
    /// <param name="name">Optional name filter (partial match)</param>
    /// <param name="address">Optional address filter (partial match)</param>
    /// <param name="minPrice">Optional minimum price filter</param>
    /// <param name="maxPrice">Optional maximum price filter</param>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of properties with only essential fields</returns>
    public async Task<PaginatedResponseDto<PropertyListDto>> GetPropertiesListAsync(
        string? name = null,
        string? address = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        int page = 1,
        int pageSize = 10)
    {
        // Build filter (same as GetPropertiesAsync)
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
        {
            filters.Add(filterBuilder.Regex(p => p.Name, new Regex(name, RegexOptions.IgnoreCase)));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            filters.Add(filterBuilder.Regex(p => p.Address, new Regex(address, RegexOptions.IgnoreCase)));
        }

        if (minPrice.HasValue)
        {
            filters.Add(filterBuilder.Gte(p => p.Price, minPrice.Value));
        }

        if (maxPrice.HasValue)
        {
            filters.Add(filterBuilder.Lte(p => p.Price, maxPrice.Value));
        }

        var filter = filters.Count > 0 ? filterBuilder.And(filters) : FilterDefinition<Property>.Empty;

        // Get total count
        var totalItems = await _properties.CountDocumentsAsync(filter);

        // Calculate pagination
        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
        var skip = (page - 1) * pageSize;

        // Get properties with pagination
        var properties = await _properties
            .Find(filter)
            .Skip(skip)
            .Limit(pageSize)
            .ToListAsync();

        // Map to optimized DTOs (no owner lookup needed)
        var propertyListDtos = properties.Select(p => new PropertyListDto
        {
            Id = p.Id,
            Name = p.Name,
            Address = p.Address,
            Price = p.Price,
            Year = p.Year,
            MainImage = p.Images.FirstOrDefault(img => img.Enabled)?.File
        }).ToList();

        return new PaginatedResponseDto<PropertyListDto>
        {
            Data = propertyListDtos,
            Pagination = new PaginationDto
            {
                CurrentPage = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                HasNext = page < totalPages,
                HasPrevious = page > 1
            }
        };
    }

    /// <summary>
    /// Gets a single property with complete owner details by ID
    /// </summary>
    /// <param name="id">Property ID</param>
    /// <returns>Property with complete owner information</returns>
    public async Task<PropertyDetailDto?> GetPropertyByIdAsync(string id)
    {
        var property = await _properties.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (property == null)
        {
            return null;
        }

        var owner = await _owners.Find(o => o.Id == property.OwnerId).FirstOrDefaultAsync();

        return new PropertyDetailDto
        {
            Id = property.Id,
            Name = property.Name,
            Address = property.Address,
            Price = property.Price,
            CodeInternal = property.CodeInternal,
            Year = property.Year,
            Images = property.Images,
            Trace = property.Trace,
            Owner = owner != null ? new OwnerDetailDto
            {
                Id = owner.Id,
                Name = owner.Name,
                Address = owner.Address,
                Photo = owner.Photo,
                Birthday = owner.Birthday
            } : new OwnerDetailDto()
        };
    }
}