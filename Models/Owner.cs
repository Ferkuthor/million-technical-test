using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

/// <summary>
/// Represents an owner in the real estate system
/// </summary>
public class Owner
{
    /// <summary>
    /// Unique identifier for the owner
    /// </summary>
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    /// <summary>
    /// Full name of the owner
    /// </summary>
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Address of the owner
    /// </summary>
    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// URL to the owner's photo
    /// </summary>
    [BsonElement("photo")]
    public string Photo { get; set; } = string.Empty;

    /// <summary>
    /// Owner's birthday
    /// </summary>
    [BsonElement("birthday")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime Birthday { get; set; }
}