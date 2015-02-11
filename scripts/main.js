var AppRouter = Backbone.Router.extend({
    routes: {
      "": "index",
      "results/:id": "results",
      "brewery/:id": "brewery"
    },

  index: function(){
    var template = _.template(  $('#brewery-search-template').text() );
    var objectForTemplate = { 'index':'myVariable' };
    var renderedTemplate = template(objectForTemplate);
    $('.app-container').html(renderedTemplate);
  },

  results: function(id){
    var template = _.template( $('#brewery-list-template').text() );
    var objectForTemplate = { 'index' : 'someRandomVariable', 'urlReference' : id };
    var renderedTemplate = template(objectForTemplate);
    $('.app-container').html(renderedTemplate);
  },

  brewery: function(id){
    var template = _.template( $('#brewery-info-template').text() );
    var objectForTemplate = { 'index' : 'someRandomVariableAgain', 'urlReference' : id };
    var renderedTemplate = template(objectForTemplate);
    $('.app-container').html(renderedTemplate);
  }


});

$(document).ready(function(){
  var router = new AppRouter();
  Backbone.history.start();
});
