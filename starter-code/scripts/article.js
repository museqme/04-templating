'use strict';

var articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  //DONE: Use handlebars to render your articles.
  //       - Get your tmpl from the DOM.
  //       - Now "compile" your tmpl with Handlebars.
  var rawData = {
    title: this.title,
    category: this.category,
    author: this.author,
    authorUrl: this.authorUrl,
    publishedOn: this.publishedOn,
    body: this.body,
  }

  var tmpl = $('#tmpl').html()
  var compile = Handlebars.compile(tmpl)
  // REVIEW: If your tmpl will use properties that aren't on the object yet, add them.
  //   Since your tmpl can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced by key in the tmpl.
  //   For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // DONE: Use the function that Handlebars gave you to return your filled-in html tmpl for THIS article.
  var newSection = compile(rawData);
  $('#articles').append(newSection)
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});
