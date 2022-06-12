package com.example.heroku.services.interfaces;

import com.example.heroku.data.Page;

public interface DatabaseInterface {
    Page getPageContent(String documentName);
}
