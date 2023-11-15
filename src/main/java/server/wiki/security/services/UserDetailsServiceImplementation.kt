package server.wiki.security.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import server.wiki.repository.UserRepository

@Service
class UserDetailsServiceImplementation(@Autowired val userRepository: UserRepository) : UserDetailsService {
    @Transactional
    override fun loadUserByUsername(username: String?): UserDetails {
        val user = userRepository.findByUsername(username ?: "") ?: throw Exception("User not found")
        return UserDetailsImplementation.build(user)
    }
}
