package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import server.wiki.payload.AuthenticationPayload
import server.wiki.security.SecurityConfig
import server.wiki.security.jwt.JwtUtils
import server.wiki.security.services.UserDetailsImplementation
import server.wiki.service.UserService
import java.time.Duration
import javax.servlet.http.HttpServletResponse

@CrossOrigin(origins = ["*"], maxAge = SecurityConfig.SESSION_DURATION_SECONDS)
@RestController
@RequestMapping("/api/auth")
open class AuthController(
    @Autowired
    val authenticationManager: AuthenticationManager,
    @Autowired
    val userService: UserService,
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
                .maxAge(Duration.ofMillis(jwtExpirationMs.toLong()))
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
        return try {
            userService.saveUser(signUpRequest)
            ResponseEntity.ok<Any>(AuthenticationPayload.MessageResponse(
                    "User registered successfully! " +
                    "A verification message was sent to specified email."))
        } catch (e: RuntimeException) {
            ResponseEntity.badRequest().body(e.localizedMessage)
        }
    }

    @RequestMapping(value = ["/confirm-account"], method = [RequestMethod.GET, RequestMethod.POST])
    fun confirmUserAccount(@RequestParam("token") token: String): ResponseEntity<*> {
        return try {
            userService.confirmEmail(token)
            ResponseEntity.ok<Any>(AuthenticationPayload.MessageResponse("User email verified successfully!"))
        } catch (e: RuntimeException) {
            ResponseEntity.badRequest().body(e.localizedMessage)
        }
    }
}
