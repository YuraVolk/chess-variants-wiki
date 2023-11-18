package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
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
import server.wiki.security.jwt.JwtUtils
import server.wiki.security.services.UserDetailsImplementation
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@CrossOrigin(origins = ["*"], maxAge = 3600)
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
    @PostMapping("/signin")
    fun authenticateUser(@RequestBody loginRequest: AuthenticationPayload.LoginRequest, response: HttpServletResponse): ResponseEntity<*> {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtUtils.generateJwtToken(authentication)
        response.addCookie(Cookie("jwtToken", jwt).apply { isHttpOnly = true; maxAge = 3600 })
        val userDetails = authentication.principal as? UserDetailsImplementation
            ?: return ResponseEntity.badRequest().build<ResponseEntity<*>>()
        return ResponseEntity.ok<Any>(
            AuthenticationPayload.JwtResponse(
                jwt,
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
