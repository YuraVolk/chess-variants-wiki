package server.wiki;

import server.wiki.data.Page;

import server.wiki.services.FirestoreDatabaseService;
import server.wiki.services.interfaces.DatabaseInterface;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@Controller
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class HerokuApplication {
  private DatabaseInterface db;

  @EventListener(ApplicationReadyEvent.class)
  public void initDB() {
    db = new FirestoreDatabaseService("private/certificates/database-secret.json", "https://pc-info-wiki.firebaseio.com/");
  }

  public static void main(String[] args) throws Exception {
    SpringApplication.run(HerokuApplication.class, args);
  }

  @RequestMapping("/")
  String index() {
    return "index";
  }

  @RequestMapping("/api/page/{pageTitle}")
  @ResponseBody
  Page page(@PathVariable String pageTitle) {
    return db.getPageContent(pageTitle);
  }
}
