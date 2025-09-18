/// <summary>
/// Pagination metadata for API responses
/// </summary>
public class PaginationDto
{
    /// <summary>
    /// Current page number (1-based)
    /// </summary>
    public int CurrentPage { get; set; }

    /// <summary>
    /// Number of items per page
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total number of items across all pages
    /// </summary>
    public long TotalItems { get; set; }

    /// <summary>
    /// Total number of pages
    /// </summary>
    public int TotalPages { get; set; }

    /// <summary>
    /// Whether there is a next page available
    /// </summary>
    public bool HasNext { get; set; }

    /// <summary>
    /// Whether there is a previous page available
    /// </summary>
    public bool HasPrevious { get; set; }
}

/// <summary>
/// Generic paginated response wrapper
/// </summary>
/// <typeparam name="T">Type of items in the response</typeparam>
public class PaginatedResponseDto<T>
{
    /// <summary>
    /// Array of items for the current page
    /// </summary>
    public List<T> Data { get; set; } = new List<T>();

    /// <summary>
    /// Pagination metadata
    /// </summary>
    public PaginationDto Pagination { get; set; } = new PaginationDto();
}