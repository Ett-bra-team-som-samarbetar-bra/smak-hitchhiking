namespace RestRoutes;

using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Metadata;
using YesSql.Services;

public static class FieldValidator
{
    public static async Task<HashSet<string>> GetValidFieldsAsync(
        string contentType,
        IContentManager contentManager,
        YesSql.ISession session)
    {
        if (contentType.Equals("Trip", StringComparison.OrdinalIgnoreCase))
        {
            var tripFields = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "id", "title", "driver", "driverId", "arrivalTime", "distance", 
                "carId", "carIdId", "startPosition", "endPosition", "departureTime", 
                "seats", "tripInfo"
            };
            return tripFields;
        }

        // Try to get existing items first
        var cleanObjects = await GetRoutes.FetchCleanContent(contentType, session, populate: false);

        if (cleanObjects.Any())
        {
            // Use existing item to extract valid fields
            return cleanObjects.First().Keys.ToHashSet(StringComparer.OrdinalIgnoreCase);
        }

        // No existing items - create a temporary one to get the schema
        var tempItem = await contentManager.NewAsync(contentType);
        tempItem.DisplayText = "_temp_schema_item";

        await contentManager.CreateAsync(tempItem, VersionOptions.Published);
        await session.SaveChangesAsync();

        // Get the cleaned version to extract fields
        cleanObjects = await GetRoutes.FetchCleanContent(contentType, session, populate: false);
        var validFields = cleanObjects.First().Keys.ToHashSet(StringComparer.OrdinalIgnoreCase);

        // Delete the temporary item
        await contentManager.RemoveAsync(tempItem);
        await session.SaveChangesAsync();

        return validFields;
    }

    private static string ToCamelCase(string str)
    {
        if (string.IsNullOrEmpty(str) || char.IsLower(str[0]))
            return str;
        return char.ToLower(str[0]) + str.Substring(1);
    }

    public static (bool isValid, List<string> invalidFields) ValidateFields(
        Dictionary<string, object> body,
        HashSet<string> validFields,
        HashSet<string> reservedFields)
    {
        var invalidFields = body.Keys
            .Where(key => !reservedFields.Contains(key) && !validFields.Contains(key))
            .ToList();

        return (invalidFields.Count == 0, invalidFields);
    }
}
