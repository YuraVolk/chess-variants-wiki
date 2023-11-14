package server.wiki.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document("pages")
data class Page(
    @Id
    val id: String,
    @Field(name="title")
    @Indexed(unique = true)
    var title: String,
    @Field(name="content")
    var content: String
)
