namespace RestRoutes;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using OrchardCore.Users.Indexes;
using System.Text.Json.Nodes;
using System.Security.Claims;
using DocumentFormat.OpenXml.Office2010.Excel;
using YesSql;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        // Register new user
        app.MapPost("/api/auth/register", async (
            [FromBody] RegisterRequest request,
            [FromServices] IUserService userService,
            [FromServices] UserManager<IUser> userManager) =>
        {
            if (string.IsNullOrEmpty(request.Username) ||
                string.IsNullOrEmpty(request.Password))
            {
                return Results.BadRequest(new { error = "Username and password required" });
            }

            var errors = new Dictionary<string, string>();
            var user = await userService.CreateUserAsync(
                new User
                {
                    UserName = request.Username,
                    Email = request.Email,
                    EmailConfirmed = true,
                    PhoneNumber = request.Phone,

                    Properties = new JsonObject
                    {
                        ["FirstName"] = request.FirstName ?? "",
                        ["LastName"] = request.LastName ?? "",
                        ["Description"] = request.Description ?? "",
                        ["Rating"] = request.Rating ?? "",
                        ["TripCount"] = request.TripCount ?? "",
                        ["Preferences"] = request.preferences != null ?
                            JsonValue.Create(request.preferences) : new JsonArray()
                    }
                },
                request.Password,
                (key, message) => errors[key] = message
            );

            if (user == null)
            {
                return Results.BadRequest(new
                {
                    error = "Registration failed",
                    details = errors
                });
            }

            // Assign Customer role (must exist in Orchard)
            await userManager.AddToRoleAsync(user, "Customer");

            return Results.Ok(new
            {
                username = user.UserName,
                email = request.Email,
                firstName = request.FirstName,
                lastName = request.LastName,
                phone = request.Phone,
                role = "Customer",
                message = "User created successfully"
            });
        })
        .AllowAnonymous()
        .DisableAntiforgery();

        // POST /api/auth/login - Login with username OR email
        app.MapPost("/api/auth/login", async (
            [FromBody] LoginRequest request,
            [FromServices] SignInManager<IUser> signInManager,
            [FromServices] UserManager<IUser> userManager,
            HttpContext context) =>
        {
            if (string.IsNullOrEmpty(request.UsernameOrEmail) ||
                string.IsNullOrEmpty(request.Password))
            {
                return Results.BadRequest(new { error = "Username/email and password required" });
            }

            // Try to find user by username first, then by email
            var user = await userManager.FindByNameAsync(request.UsernameOrEmail);
            if (user == null)
            {
                user = await userManager.FindByEmailAsync(request.UsernameOrEmail);
            }

            if (user == null)
            {
                return Results.Unauthorized();
            }

            var result = await signInManager.PasswordSignInAsync(
                user,
                request.Password,
                isPersistent: true,
                lockoutOnFailure: false
            );

            if (!result.Succeeded)
            {
                return Results.Unauthorized();
            }

            var u = user as User;
            return Results.Ok(new
            {
                id = u?.UserId,
                username = user.UserName,
                email = u?.Email,
                phoneNumber = u?.PhoneNumber,
                firstName = u?.Properties?["FirstName"]?.ToString(),
                lastName = u?.Properties?["LastName"]?.ToString(),
                description = u?.Properties?["Description"]?.ToString(),
                rating = u?.Properties?["Rating"]?.ToString(),
                tripCount = u?.Properties?["TripCount"]?.ToString(),
                preferences = u?.Properties?["Preferences"]?.AsArray(),
                roles = context.User.FindAll(ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList()
            });
        })
        .AllowAnonymous()
        .DisableAntiforgery();

        // GET /api/auth/login - Get current user
        app.MapGet("/api/auth/login", async (
            HttpContext context,
            [FromServices] UserManager<IUser> userManager) =>
        {
            var user = await userManager.GetUserAsync(context.User);

            if (user == null)
            {
                return Results.Unauthorized();
            }

            var u = user as User;

            return Results.Ok(new
            {
                id = u?.UserId,
                username = user.UserName,
                email = u?.Email,
                phoneNumber = u?.PhoneNumber,
                firstName = u?.Properties?["FirstName"]?.ToString(),
                lastName = u?.Properties?["LastName"]?.ToString(),
                description = u?.Properties?["Description"]?.ToString(),
                rating = u?.Properties?["Rating"]?.ToString(),
                tripCount = u?.Properties?["TripCount"]?.ToString(),
                preferences = u?.Properties?["Preferences"]?.AsArray(),
                roles = context.User.FindAll(ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList()
            });
        });

        // GET /api/auth/user/{userId} - Get user by ID
        app.MapGet("/api/auth/user/{userId}", async (
            string userId,
            [FromServices] UserManager<IUser> userManager) =>
        {
            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return Results.NotFound(new { error = "User not found" });
            }

            var u = user as User;

            return Results.Ok(new
            {
                id = u?.UserId,
                username = user.UserName,
                email = u?.Email,
                phoneNumber = u?.PhoneNumber,
                firstName = u?.Properties?["FirstName"]?.ToString(),
                lastName = u?.Properties?["LastName"]?.ToString(),
                description = u?.Properties?["Description"]?.ToString(),
                rating = u?.Properties?["Rating"]?.ToString(),
                tripCount = u?.Properties?["TripCount"]?.ToString(),
                preferences = u?.Properties?["Preferences"]?.AsArray()
            });
        });

        app.MapGet("/api/auth/user/", async ([FromServices] ISession session, [FromServices] UserManager<IUser> userManager, [FromQuery] int page = 1, [FromQuery] int pageSize = 10) =>
        {
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var totalUsers = await session.Query<User, UserIndex>().CountAsync();

            var users = await session.Query<User, UserIndex>()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ListAsync();

            var result = users.Select(u => new
            {
                id = u?.UserId,
                username = u?.UserName,
                email = u?.Email,
                phoneNumber = u?.PhoneNumber,
                firstName = u?.Properties?["FirstName"]?.ToString(),
                lastName = u?.Properties?["LastName"]?.ToString(),
                description = u?.Properties?["Description"]?.ToString(),
                rating = u?.Properties?["Rating"]?.ToString(),
                tripCount = u?.Properties?["TripCount"]?.ToString(),
                preferences = u?.Properties?["Preferences"]?.AsArray()
            });

            return Results.Ok(new
            {
                page,
                pageSize,
                totalUsers,
                totalPages = (int)Math.Ceiling((double)totalUsers / pageSize),
                users = result
            });
        });

        // DELETE /api/auth/login - Logout
        app.MapDelete("/api/auth/login", async (
            [FromServices] SignInManager<IUser> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return Results.Ok(new { message = "Logged out successfully" });
        })
        .AllowAnonymous()
        .DisableAntiforgery();

        // PUT /api/auth/login - Edit users
        app.MapPut("/api/auth/login", async (
            [FromBody] UpdateUserRequest request,
            [FromServices] UserManager<IUser> userManager,
            HttpContext context
        ) =>
        {
            var currentUser = await userManager.GetUserAsync(context.User);
            if (currentUser == null)
            {
                return Results.Unauthorized();
            }

            var user = currentUser as User;

            if (!string.IsNullOrEmpty(request.Email) && user != null)
                user.Email = request.Email;

            if (!string.IsNullOrEmpty(request.Phone) && user != null)
                user.PhoneNumber = request.Phone;

            var props = user?.Properties ?? new System.Text.Json.Nodes.JsonObject();

            props["FirstName"] = request.FirstName ?? props["FirstName"];
            props["LastName"] = request.LastName ?? props["LastName"];
            props["Description"] = request.Description ?? props["Description"];
            props["Rating"] = request.Rating ?? props["Rating"];
            props["TripCount"] = request.TripCount ?? props["TripCount"];
            props["Preferences"] = request.preferences != null ?
                JsonValue.Create(request.preferences) : props["Preferences"];

            user!.Properties = props;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return Results.BadRequest(new { error = "Failed to update user", details = result.Errors.Select(e => e.Description).ToList() });
            }

            return Results.Ok(new
            {
                message = "User updated successfully",
                username = user.UserName,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
                firstName = user.Properties?["FirstName"]?.ToString(),
                lastName = user.Properties?["LastName"]?.ToString(),
                description = user.Properties?["Description"]?.ToString(),
                rating = user.Properties?["Rating"]?.ToString(),
                tripCount = user.Properties?["TripCount"]?.ToString(),
                preferences = user.Properties?["Preferences"]?.ToJsonString()
            });
        }).RequireAuthorization().DisableAntiforgery();
    }
}

public record RegisterRequest(
    string Username,
    string Email,
    string Password,
    string? FirstName,
    string? LastName,
    string? Phone,
    string? Description,
    string? Rating,
    string? TripCount,
    string[]? preferences
);

public record UpdateUserRequest(
    string? Id,
    string? Email,
    string? FirstName,
    string? LastName,
    string? Phone,
    string? Description,
    string? Rating,
    string? TripCount,
    string[]? preferences
);

public record LoginRequest(string UsernameOrEmail, string Password);