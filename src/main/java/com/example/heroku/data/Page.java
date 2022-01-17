package com.example.heroku.data;

public class Page {
    private String pageContent;
    private String pageTitle;

    public Page(String pageContent, String pageTitle) {
        this.pageContent = pageContent;
        this.pageTitle = pageTitle;
    }

    public String getPageContent() {
        return pageContent;
    }

    public void setPageContent(String pageContent) {
        this.pageContent = pageContent;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    @Override
    public String toString() {
        return "Page{" +
                "pageContent='" + pageContent + '\'' +
                ", pageTitle='" + pageTitle + '\'' +
                '}';
    }
}
