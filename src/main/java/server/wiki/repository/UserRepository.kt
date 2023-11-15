package server.wiki.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import server.wiki.model.user.User

@Repository
interface UserRepository : MongoRepository<User, String> {
    @Query("{'username':?0}")
    fun findByUsername(username: String): User?
    fun existsByUsername(username: String): Boolean
    fun existsByEmail(email: String): Boolean
}
