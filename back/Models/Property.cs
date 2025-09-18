using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

/// <summary>
/// Represents a property in the real estate system
/// </summary>
public class Property
{
    /// <summary>
    /// Unique identifier for the property
    /// </summary>
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    /// <summary>
    /// Name of the property
    /// </summary>
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the property
    /// </summary>
    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// Price of the property
    /// </summary>
    [BsonElement("price")]
    public decimal Price { get; set; }

    /// <summary>
    /// Internal code for the property
    /// </summary>
    [BsonElement("codeInternal")]
    public string CodeInternal { get; set; } = string.Empty;

    /// <summary>
    /// Year the property was built
    /// </summary>
    [BsonElement("year")]
    public int Year { get; set; }

    /// <summary>
    /// Reference to the owner of the property
    /// </summary>
    [BsonElement("owner_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string OwnerId { get; set; } = string.Empty;

    /// <summary>
    /// List of images associated with the property
    /// </summary>
    [BsonElement("images")]
    public List<PropertyImage> Images { get; set; } = new List<PropertyImage>();

    /// <summary>
    /// Transaction history of the property
    /// </summary>
    [BsonElement("trace")]
    public List<PropertyTrace> Trace { get; set; } = new List<PropertyTrace>();
}

/// <summary>
/// Represents an image associated with a property
/// </summary>
public class PropertyImage
{
    /// <summary>
    /// URL or path to the image file
    /// </summary>
    [BsonElement("file")]
    public string File { get; set; } = string.Empty;

    /// <summary>
    /// Whether the image is enabled for display
    /// </summary>
    [BsonElement("enabled")]
    public bool Enabled { get; set; }
}

/// <summary>
/// Represents a transaction record for a property
/// </summary>
public class PropertyTrace
{
    /// <summary>
    /// Date of the sale transaction
    /// </summary>
    [BsonElement("dateSale")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime DateSale { get; set; }

    /// <summary>
    /// Name or description of the transaction
    /// </summary>
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Value of the transaction
    /// </summary>
    [BsonElement("value")]
    public decimal Value { get; set; }

    /// <summary>
    /// Tax amount for the transaction
    /// </summary>
    [BsonElement("tax")]
    public decimal Tax { get; set; }
}