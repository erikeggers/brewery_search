var AppRouter = Backbone.Router.extend({
    routes: {
      "": "index",
      // "results/:id": "results",
      // "brewery/:id": "brewery"
    },

  index: function(){
    var template = _.template( $('#brewery-search-template').text() );
    var renderedTemplate = template;
    $('.app-container').html(renderedTemplate);
  },

  // results: function(){
  //   var template = _.template( $('#brewery-list-template').text() );
  //   var renderedTemplate = template;
  //   $('.app-container').html(renderedTemplate);
  // },
  //
  // brewery: function(){
  //   var template = _.template( $('#brewery-info-template').text() );
  //   var renderedTemplate = template;
  //   $('.app-container').html(renderedTemplate);
  // }


});

$(document).ready(function(){
  var router = new AppRouter();
  Backbone.history.start();
});
