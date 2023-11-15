package server.wiki.model.user

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document("roles")
data class Role(
    @Id
    val id: String,
    @Field(name = "name")
    val name: UserRole
)
