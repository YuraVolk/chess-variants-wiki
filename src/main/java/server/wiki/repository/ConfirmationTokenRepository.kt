package server.wiki.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import server.wiki.model.user.ConfirmationToken

@Repository
interface ConfirmationTokenRepository : MongoRepository<ConfirmationToken, String> {
    @Query("{'token':?0}")
    fun findByToken(title: String): ConfirmationToken?
}
