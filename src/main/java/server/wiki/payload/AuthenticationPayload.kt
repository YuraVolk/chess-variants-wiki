package server.wiki.payload

sealed class AuthenticationPayload {
    data class LoginRequest(val username: String, val password: String) : AuthenticationPayload()
    data class SignupRequest(val username: String, val password: String, val email: String) : AuthenticationPayload()
    data class JwtResponse(
        val id: String,
        val username: String,
        val email: String,
        val roles: List<String>,
        val type: String = "Bearer"
    ) : AuthenticationPayload()
    data class MessageResponse(val message: String) : AuthenticationPayload()
}
