package server.wiki.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView
import server.wiki.security.SecurityConfig

@CrossOrigin(origins = ["*"], maxAge = SecurityConfig.SESSION_DURATION_SECONDS)
@RestController
class MainController {
    @RequestMapping("/sign-up")
    fun login() = ModelAndView().apply { viewName = "sign-up" }
}
