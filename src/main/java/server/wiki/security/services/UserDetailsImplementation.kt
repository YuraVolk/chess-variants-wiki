package server.wiki.security.services

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import server.wiki.model.user.User

class UserDetailsImplementation(
    val id: String,
    private val username: String,
    val email: String,
    @JsonIgnore private val password: String,
    private val authorities: Collection<GrantedAuthority>,
    private val isVerified: Boolean
) : UserDetails {
    companion object {
        fun build(user: User): UserDetailsImplementation {
            return UserDetailsImplementation(
                user.id,
                user.username,
                user.email,
                user.password,
                user.roles.map { role -> SimpleGrantedAuthority(role.name.name) },
                user.isVerified
            )
        }
    }

    override fun getAuthorities() = authorities.toMutableList()
    override fun getPassword() = password
    override fun getUsername() = username
    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = isVerified
}
