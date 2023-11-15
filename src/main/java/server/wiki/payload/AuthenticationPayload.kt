package server.wiki.payload

sealed class AuthenticationPayload {
    data class LoginRequest(val username: String, val password: String)
    data class SignupRequest(val username: String, val password: String, val email: String)
    data class JwtResponse(
        val token: String,
        val id: String,
        val username: String,
        val email: String,
        val roles: List<String>,
        val type: String = "Bearer"
    )
    data class MessageResponse(val message: String)
}
