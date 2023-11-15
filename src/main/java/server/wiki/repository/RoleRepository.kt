package server.wiki.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import server.wiki.model.user.Role
import server.wiki.model.user.UserRole

@Repository
interface RoleRepository : MongoRepository<Role, String> {
    @Query("{'name':?0}")
    fun findByName(name: UserRole): Role?
}
