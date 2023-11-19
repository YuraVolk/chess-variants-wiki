package server.wiki.model.user

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field

@Document("users")
data class User(
    @Field(name = "username")
    val username: String,
    @Field(name = "password")
    val password: String,
    @Field(name = "email")
    val email: String,
    @DBRef
    var roles: Set<Role> = setOf(),
    @Field(name = "isVerified")
    var isVerified: Boolean = false
) {
    @Id
    lateinit var id: String
}
