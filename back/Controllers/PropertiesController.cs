using Microsoft.AspNetCore.Mvc;

/// <summary>
/// Controller for managing property operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PropertiesController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    /// <summary>
    /// Initializes a new instance of the PropertiesController
    /// </summary>
    /// <param name="mongoDbService">MongoDB service for database operations</param>
    public PropertiesController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    /// <summary>
    /// Get a paginated list of properties with optional search filters
    /// </summary>
    /// <param name="name">Filter by property name (partial match, case-insensitive)</param>
    /// <param name="address">Filter by property address (partial match, case-insensitive)</param>
    /// <param name="minPrice">Filter properties with price greater than or equal to this value</param>
    /// <param name="maxPrice">Filter properties with price less than or equal to this value</param>
    /// <param name="page">Page number (1-based, default: 1)</param>
    /// <param name="pageSize">Number of items per page (default: 10, max: 100)</param>
    /// <returns>Paginated list of properties with owner information</returns>
    /// <response code="200">Returns the paginated list of properties</response>
    /// <response code="400">Invalid request parameters</response>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResponseDto<PropertyDto>), 200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<PaginatedResponseDto<PropertyDto>>> GetProperties(
        [FromQuery] string? name = null,
        [FromQuery] string? address = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // Validate parameters
        if (page < 1)
        {
            return BadRequest("Page must be greater than 0");
        }

        if (pageSize < 1 || pageSize > 100)
        {
            return BadRequest("PageSize must be between 1 and 100");
        }

        if (minPrice.HasValue && maxPrice.HasValue && minPrice.Value > maxPrice.Value)
        {
            return BadRequest("minPrice cannot be greater than maxPrice");
        }

        try
        {
            var result = await _mongoDbService.GetPropertiesAsync(name, address, minPrice, maxPrice, page, pageSize);
            return Ok(result);
        }
        catch (Exception ex)
        {
            // Log the exception (in a real app, you'd use a logger)
            return StatusCode(500, "An error occurred while retrieving properties");
        }
    }

    /// <summary>
    /// Get detailed information about a specific property by ID
    /// </summary>
    /// <param name="id">The property ID</param>
    /// <returns>Detailed property information with complete owner details</returns>
    /// <response code="200">Returns the property details</response>
    /// <response code="404">Property not found</response>
    /// <response code="400">Invalid property ID format</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDetailDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<PropertyDetailDto>> GetProperty(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            return BadRequest("Property ID cannot be empty");
        }

        try
        {
            var property = await _mongoDbService.GetPropertyByIdAsync(id);

            if (property == null)
            {
                return NotFound($"Property with ID '{id}' not found");
            }

            return Ok(property);
        }
        catch (Exception ex)
        {
            // Log the exception (in a real app, you'd use a logger)
            return StatusCode(500, "An error occurred while retrieving the property");
        }
    }
}