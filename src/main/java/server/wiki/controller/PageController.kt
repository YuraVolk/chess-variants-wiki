package server.wiki.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import server.wiki.model.Page
import server.wiki.security.SecurityConfig
import server.wiki.service.PagesService
import java.util.*

@CrossOrigin(origins = ["*"], maxAge = SecurityConfig.SESSION_DURATION_SECONDS)
@RestController
@RequestMapping("/api/pages")
open class PageController(@Autowired val pagesService: PagesService) {
    @PostMapping
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    open fun addPage(@RequestBody page: Page): ResponseEntity<String> {
        pagesService.addPage(page)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @PatchMapping
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    open fun updatePage(@RequestBody page: Page): ResponseEntity<String> {
        pagesService.updatePage(page)
        return ResponseEntity.ok().build()
    }

    @GetMapping
    open fun getAllPages(): ResponseEntity<List<Page>> = ResponseEntity.ok(pagesService.getAllPages())

    @GetMapping("/id/{id}")
    open fun getPageById(@PathVariable id: String): ResponseEntity<Optional<Page>> = ResponseEntity.ok(pagesService.getPageById(id))

    @GetMapping("/title/{title}")
    open fun getPageByTitle(@PathVariable title: String): ResponseEntity<Page> = ResponseEntity.ok(pagesService.getPageByTitle((title)))

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EDITOR') or hasRole('ADMIN')")
    open fun deletePage(@PathVariable id: String): ResponseEntity<String> {
        pagesService.deletePage(id)
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build()
    }
}
