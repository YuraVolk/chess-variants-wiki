package server.wiki.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service

@Service("emailService")
class EmailService(@Autowired private val mailSender: JavaMailSender) {
    @Async
    fun sendEmail(email: SimpleMailMessage) = mailSender.send(email)
}
