package server.wiki.services.interfaces;

import server.wiki.data.Page;

public interface DatabaseInterface {
    Page getPageContent(String documentName);
}
