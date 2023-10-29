package server.wiki.services;

import server.wiki.data.Page;
import server.wiki.services.interfaces.DatabaseInterface;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

public class FirestoreDatabaseService implements DatabaseInterface {
    private Firestore app;
    private CollectionReference pagesReference;

    private static final String CONTENT = "content";
    private static final String CATEGORIES = "categories";

    public FirestoreDatabaseService(String certificatePath, String databaseURL) {
        ClassPathResource configFile = new ClassPathResource(certificatePath);
        try {
            GoogleCredentials credentials = GoogleCredentials.fromStream(configFile.getInputStream());
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .setDatabaseUrl(databaseURL)
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            e.printStackTrace();
            FirebaseApp.initializeApp();
        }

        app = FirestoreClient.getFirestore();
        pagesReference = app.collection("pages");
    }

    @SuppressWarnings("unchecked")
    public Page getPageContent(String documentName) {
        ApiFuture<DocumentSnapshot> future = pagesReference.document(documentName).get();

        try {
            DocumentSnapshot document = future.get();
            if (document.exists()) {
                System.out.println(document.get("content"));
                return new Page(document.getString(CONTENT), (ArrayList<String>) document.get(CATEGORIES));
            } else {
                return null; // TODO replace with boilerplate 404
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null; // TODO replace with boilerplate 404
        }
    }
}
