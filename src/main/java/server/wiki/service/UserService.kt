package server.wiki.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.mail.SimpleMailMessage
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import server.wiki.model.user.ConfirmationToken
import server.wiki.model.user.User
import server.wiki.model.user.UserRole
import server.wiki.payload.AuthenticationPayload
import server.wiki.payload.UserRolePayload
import server.wiki.repository.ConfirmationTokenRepository
import server.wiki.repository.RoleRepository
import server.wiki.repository.UserRepository

@Service
class UserService(
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val roleRepository: RoleRepository,
    @Autowired
    val emailService: EmailService,
    @Autowired
    val confirmationTokenRepository: ConfirmationTokenRepository,
    @Autowired
    val encoder: PasswordEncoder
) {
    @Value("\${wiki.domainName}")
    lateinit var domainName: String

    fun changeRole(payload: UserRolePayload, userRole: UserRole) {
        val user = userRepository.findByUsername(payload.username) ?: return
        val role = roleRepository.findByName(userRole) ?: return
        if (payload.revokeRole) {
            user.roles = user.roles.toMutableSet().also { it.remove(role) }
        } else user.roles = user.roles.toMutableSet().also { it.add(role) }

        userRepository.save(user)
    }

    fun saveUser(payload: AuthenticationPayload.SignupRequest) {
        if (userRepository.existsByUsername(payload.username)) throw RuntimeException("The username is already taken!")
        if (userRepository.existsByEmail(payload.email)) throw RuntimeException("The email is already taken!")
        userRepository.save(
            User(payload.username, encoder.encode(payload.password), payload.email,
            setOf(roleRepository.findByName(if (userRepository.count() == 0L) UserRole.ROLE_VIEWER else UserRole.ROLE_ADMIN)
                ?: throw RuntimeException("Role not found")))
        )

        val token = ConfirmationToken(payload.email)
        emailService.sendEmail(SimpleMailMessage().apply {
            setTo(token.email)
            subject = "Verify your email for Chess Variants Wiki"
            text = "To confirm your account, please click here: " +
                    "$domainName/api/auth/confirm-account?token=${token.token}"
        }).also { confirmationTokenRepository.save(token) }
    }

    fun confirmEmail(token: String) {
        val foundToken = confirmationTokenRepository.findByToken(token) ?: throw RuntimeException("Invalid token!")
        userRepository.findByEmail(foundToken.email)?.apply { isVerified = true }?.let {
            userRepository.save(it)
            confirmationTokenRepository.delete(foundToken)
        }
    }
}
