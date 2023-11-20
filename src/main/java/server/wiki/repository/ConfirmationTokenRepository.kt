package server.wiki.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import server.wiki.model.user.ConfirmationToken

@Repository
interface ConfirmationTokenRepository : MongoRepository<ConfirmationToken, String>
