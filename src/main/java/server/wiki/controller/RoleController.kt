package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import server.wiki.model.user.UserRole
import server.wiki.payload.UserRolePayload
import server.wiki.service.UserRolesService

@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/role")
@PreAuthorize("hasRole('ADMIN')")
open class RoleController(@Autowired val userRolesService: UserRolesService) {
    @PostMapping("/admin")
    open fun adminPrivileges(@RequestBody userRole: UserRolePayload): ResponseEntity<String> {
        if (userRole.revokeRole) return ResponseEntity.status(HttpStatus.FORBIDDEN).build()
        userRolesService.changeRole(userRole, UserRole.ROLE_ADMIN)
        return ResponseEntity.status(HttpStatus.OK).build()
    }

    @PostMapping("/editor")
    open fun editorPrivileges(@RequestBody userRole: UserRolePayload): ResponseEntity<String> {
        userRolesService.changeRole(userRole, UserRole.ROLE_EDITOR)
        return ResponseEntity.status(HttpStatus.OK).build()
    }

    @PostMapping("/viewer")
    open fun viewerPrivileges(@RequestBody userRole: UserRolePayload): ResponseEntity<String> {
        userRolesService.changeRole(userRole, UserRole.ROLE_VIEWER)
        return ResponseEntity.status(HttpStatus.OK).build()
    }
}
