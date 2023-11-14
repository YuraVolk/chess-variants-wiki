package server.wiki.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import server.wiki.model.Page

@Repository
interface PagesRepository : MongoRepository<Page, String> {
    @Query("{'title':?0}")
    fun findByTitle(title: String): Page
}
