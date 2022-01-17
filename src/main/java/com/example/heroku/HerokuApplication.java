package com.example.heroku;

import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DatabaseReference;
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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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
  private Firestore app;

    @EventListener(ApplicationReadyEvent.class)
    public void initDB() {
      try {
        File f = new File("."); // current directory

        File[] files = f.listFiles();
        for (File file : files) {
          if (file.isDirectory()) {
            System.out.print("directory:");
          } else {
            System.out.print("     file:");
          }
          System.out.println(file.getCanonicalPath());
        }

        FileInputStream stream = new FileInputStream("./database-secret.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(stream);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .setDatabaseUrl("https://pc-info-wiki.firebaseio.com/")
                .build();
        FirebaseApp.initializeApp(options);
      } catch (IOException e) {
        System.out.println("err");
        e.printStackTrace();
        FirebaseApp.initializeApp();
      }

      app = FirestoreClient.getFirestore();
    }

  @Value("${spring.datasource.url}")
  private String dbUrl;

  @Autowired
  private DataSource dataSource;

  public static void main(String[] args) throws Exception {
    SpringApplication.run(HerokuApplication.class, args);
  }

  @RequestMapping("/")
  String index() {
    return "index";
  }

  @RequestMapping("/api/getPageContent")
  String page() {
    ApiFuture<QuerySnapshot> query = app.collection("admins").get();
    try {
      QuerySnapshot querySnapshot = query.get();
      List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
      for (QueryDocumentSnapshot documentSnapshot : documents) {
        System.out.println(documentSnapshot.getId());
      }
    } catch (InterruptedException | ExecutionException e) {
      e.printStackTrace();
    }
    return "";
  }

  @RequestMapping("/db")
  String db(Map<String, Object> model) {
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
      stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
      ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");

      ArrayList<String> output = new ArrayList<String>();
      while (rs.next()) {
        output.add("Read from DB: " + rs.getTimestamp("tick"));
      }

      model.put("records", output);
      return "db";
    } catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }
  }

  @Bean
  public DataSource dataSource() throws SQLException {
    if (dbUrl == null || dbUrl.isEmpty()) {
      return new HikariDataSource();
    } else {
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl(dbUrl);
      return new HikariDataSource(config);
    }
  }

}
