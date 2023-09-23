package com.example.heroku;

import com.example.heroku.data.Page;

import com.example.heroku.services.FirestoreDatabaseService;
import com.example.heroku.services.interfaces.DatabaseInterface;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Controller
@SpringBootApplication
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
