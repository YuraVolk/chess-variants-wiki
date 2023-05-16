package com.example.heroku.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Page {
    private String content;
    private String pageTitle;
    private List<String> categories = new ArrayList<>();

    public Page() { }

    public Page(String pageContent, List<String> categories) {
        this.content = pageContent.replace("\\n", "\n");
        this.categories = categories;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String pageContent) {
        this.content = pageContent;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Page)) return false;
        Page page = (Page) o;
        return content.equals(page.content) &&
                pageTitle.equals(page.pageTitle) &&
                categories.equals(page.categories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(content, pageTitle, categories);
    }
}
