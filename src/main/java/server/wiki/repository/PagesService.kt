package server.wiki.repository

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import server.wiki.model.Page
import kotlin.jvm.optionals.getOrNull

@Service
class PagesService(@Autowired val pagesRepository: PagesRepository) {
    fun addPage(page: Page): Page = pagesRepository.insert(page)
    fun updatePage(page: Page) {
        val storedPage = pagesRepository.findById(page.id).getOrNull() ?: return
        storedPage.title = page.title
        storedPage.content = page.content
        pagesRepository.save(storedPage)
    }

    fun getAllPages(): List<Page> = pagesRepository.findAll()
    fun getPageByTitle(title: String) = pagesRepository.findByTitle(title)
    fun deletePage(id: String) = pagesRepository.deleteById(id)
}
