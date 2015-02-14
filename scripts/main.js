(function(){

  var searchTerm;

  window.App = window.App || {};

  var AppModel = Backbone.Model.extend({
    defaults: {
      searchTerm: ''
    }
  });

  var State = Backbone.Model.extend({
    defaults: {
      body: ''
    }
  });

  var Result = Backbone.Model.extend({});

  var ResultsCollection = Backbone.Collection.extend({
    initialize: function(collection, options){
      this.appModel = options.appModel;
    },

    url: function (){
      var cors = 'https://jsonp.nodejitsu.com/?url=';
      var searchTerm = this.appModel.get('searchTerm').replace(/ /g, '+');
      var base = "http://api.brewerydb.com/v2/locations?region=";
      var keyBase = "&key=";
      var key = "da7893f044ebeecf79010b9e07bc84aa";
      return cors + encodeURIComponent(base + searchTerm + keyBase + key);
    },

    model: Result,

    parse: function(response) {
     return response.data;
   }
});

var TextInputView = Backbone.View.extend({
  el: 'form',
  events: {
    'submit': 'stateSearch'
  },

  stateSearch: function(event) {
    event.preventDefault();
    searchTerm = this.$('input').val();
    this.$('input').val('');
    window.location = '#results/' + searchTerm.replace(/ /g, '+');
  }

});

var ResultsView = Backbone.View.extend({

   el: '#results',

   initialize: function(){
     this.listenTo(this.collection, 'sync', this.render);
   },

   render: function(){
     this.$el.empty();
     var self = this;
     this.collection.each(function(result){
       self.$el.append('<li><a href="#results/' + searchTerm.replace(/ /g, '+') + "/" + result.get('breweryId') + '">' + result.get('brewery').name + '</a></li>');

     });
   }
 });

 var BreweryView = Backbone.View.extend({

  //  template: _.template( $('#brewery-info-template').text() ),


 });

 var AppRouter = Backbone.Router.extend({
   routes: {
     '': 'index',
     'results/:state': 'search',
     'results/:state/:brewery': 'details'

   },

   initialize: function(){
     this.appModel = new AppModel();
     this.list = new ResultsCollection([], {appModel: this.appModel});
     this.listView = new ResultsView({collection: this.list});
    //  this.listView.render();
   },

   index: function(){
    //  this.list.fetch();
   },

   search: function(state){
     this.appModel.set('searchTerm', state);
     this.list.fetch();
     this.listView.render();
   },

   details: function(state, brewery){
     this.appModel.set('searchTerm', state);
     this.list.fetch();
     console.log(this.list.findWhere({breweryId: brewery.toString()}));
    //  this.listView.render();
   }
 });

 window.inputview = new TextInputView({model: State});


 $(document).ready(function(){
   window.router = new AppRouter();
   Backbone.history.start();
 });
})();
