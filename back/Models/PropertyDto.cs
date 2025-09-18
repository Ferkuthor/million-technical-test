/// <summary>
/// Data Transfer Object for Property with Owner information
/// Used for API responses that include owner details
/// </summary>
public class PropertyDto
{
    /// <summary>
    /// Unique identifier for the property
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Name of the property
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the property
    /// </summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// Price of the property
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Internal code for the property
    /// </summary>
    public string CodeInternal { get; set; } = string.Empty;

    /// <summary>
    /// Year the property was built
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Owner information
    /// </summary>
    public OwnerSummaryDto Owner { get; set; } = new OwnerSummaryDto();

    /// <summary>
    /// List of images associated with the property
    /// </summary>
    public List<PropertyImage> Images { get; set; } = new List<PropertyImage>();

    /// <summary>
    /// Transaction history of the property
    /// </summary>
    public List<PropertyTrace> Trace { get; set; } = new List<PropertyTrace>();
}

/// <summary>
/// Summary information about an owner
/// </summary>
public class OwnerSummaryDto
{
    /// <summary>
    /// Unique identifier for the owner
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Full name of the owner
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the owner
    /// </summary>
    public string Address { get; set; } = string.Empty;
}

/// <summary>
/// Detailed property information with complete owner details
/// </summary>
public class PropertyDetailDto
{
    /// <summary>
    /// Unique identifier for the property
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Name of the property
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the property
    /// </summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// Price of the property
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Internal code for the property
    /// </summary>
    public string CodeInternal { get; set; } = string.Empty;

    /// <summary>
    /// Year the property was built
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Complete owner information
    /// </summary>
    public OwnerDetailDto Owner { get; set; } = new OwnerDetailDto();

    /// <summary>
    /// List of images associated with the property
    /// </summary>
    public List<PropertyImage> Images { get; set; } = new List<PropertyImage>();

    /// <summary>
    /// Transaction history of the property
    /// </summary>
    public List<PropertyTrace> Trace { get; set; } = new List<PropertyTrace>();
}

/// <summary>
/// Complete owner information
/// </summary>
public class OwnerDetailDto
{
    /// <summary>
    /// Unique identifier for the owner
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// Full name of the owner
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the owner
    /// </summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// URL to the owner's photo
    /// </summary>
    public string Photo { get; set; } = string.Empty;

    /// <summary>
    /// Owner's birthday
    /// </summary>
    public DateTime Birthday { get; set; }
}