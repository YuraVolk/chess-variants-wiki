package server.wiki.model.user

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.UUID

@Document("confirmation_tokens")
data class ConfirmationToken(
    @Field("email")
    var email: String,
    @Id
    @Field("token")
    var token: String = UUID.randomUUID().toString()
)
