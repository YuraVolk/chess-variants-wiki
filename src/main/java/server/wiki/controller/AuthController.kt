package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import server.wiki.model.user.User
import server.wiki.model.user.UserRole
import server.wiki.payload.AuthenticationPayload
import server.wiki.repository.RoleRepository
import server.wiki.repository.UserRepository
import server.wiki.security.SecurityConfig
import server.wiki.security.jwt.JwtUtils
import server.wiki.security.services.UserDetailsImplementation
import javax.servlet.http.HttpServletResponse

@CrossOrigin(origins = ["*"], maxAge = SecurityConfig.SESSION_DURATION_SECONDS)
@RestController
@RequestMapping("/api/auth")
open class AuthController(
    @Autowired
    val authenticationManager: AuthenticationManager,
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val roleRepository: RoleRepository,
    @Autowired
    val encoder: PasswordEncoder,
    @Autowired
    val jwtUtils: JwtUtils
) {
    @Value("\${wiki.jwtExpirationMs}")
    private val jwtExpirationMs = 0

    @PostMapping("/signin")
    fun authenticateUser(@RequestBody loginRequest: AuthenticationPayload.LoginRequest, response: HttpServletResponse): ResponseEntity<*> {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        response.addHeader(
            HttpHeaders.SET_COOKIE,
            ResponseCookie.from(SecurityConfig.COOKIE_TOKEN_NAME, jwtUtils.generateJwtToken(authentication))
                .secure(true)
                .httpOnly(true)
                .maxAge(jwtExpirationMs.toLong())
                .sameSite("Strict")
                .path("/")
                .build().toString()
        )
        val userDetails = authentication.principal as? UserDetailsImplementation
            ?: return ResponseEntity.badRequest().build<ResponseEntity<*>>()
        return ResponseEntity.ok<Any>(
            AuthenticationPayload.JwtResponse(
                userDetails.id,
                userDetails.getUsername(),
                userDetails.email,
                userDetails.getAuthorities().map { item -> item.authority }
            )
        )
    }

    @PostMapping("/signup")
    fun registerUser(@RequestBody signUpRequest: AuthenticationPayload.SignupRequest): ResponseEntity<*> {
        if (userRepository.existsByUsername(signUpRequest.username)) {
            return ResponseEntity
                .badRequest()
                .body<Any>(AuthenticationPayload.MessageResponse("Error: Username is already taken!"))
        }
        if (userRepository.existsByEmail(signUpRequest.email)) {
            return ResponseEntity
                .badRequest()
                .body<Any>(AuthenticationPayload.MessageResponse("Error: Email is already in use!"))
        }

        userRepository.save(User(signUpRequest.username, encoder.encode(signUpRequest.password), signUpRequest.email,
            setOf(roleRepository.findByName(UserRole.ROLE_VIEWER) ?: throw RuntimeException("Role not found"))))
        return ResponseEntity.ok<Any>(AuthenticationPayload.MessageResponse("User registered successfully!"))
    }
}
