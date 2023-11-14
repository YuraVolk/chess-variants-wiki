package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.wiki.model.Page
import server.wiki.repository.PagesService

@RestController
@RequestMapping("/api/page")
class PageController(@Autowired val pagesService: PagesService) {
    @PostMapping
    fun addPage(@RequestBody page: Page): ResponseEntity<String> {
        pagesService.addPage(page)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @PatchMapping
    fun updatePage(@RequestBody page: Page): ResponseEntity<String> {
        pagesService.updatePage(page)
        return ResponseEntity.ok().build()
    }

    @GetMapping
    fun getAllPages(): ResponseEntity<List<Page>> = ResponseEntity.ok(pagesService.getAllPages())
}
