package server.wiki.payload

data class UserRolePayload(val username: String, val revokeRole: Boolean = false)
