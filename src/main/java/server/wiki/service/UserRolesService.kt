package server.wiki.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import server.wiki.model.user.UserRole
import server.wiki.payload.UserRolePayload
import server.wiki.repository.RoleRepository
import server.wiki.repository.UserRepository

@Service
class UserRolesService(
    @Autowired val userRepository: UserRepository,
    @Autowired val roleRepository: RoleRepository
) {
    fun changeRole(payload: UserRolePayload, userRole: UserRole) {
        val user = userRepository.findByUsername(payload.username) ?: return
        val role = roleRepository.findByName(userRole) ?: return
        if (payload.revokeRole) {
            user.roles = user.roles.toMutableSet().also { it.remove(role) }
        } else user.roles = user.roles.toMutableSet().also { it.add(role) }

        userRepository.save(user)
    }
}
