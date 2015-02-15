/*globals Backbone, _  */

(function() {

  'use strict';

  window.App = window.App || {};

  var searchTerm;

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
    initialize: function(collection, options) {
      this.appModel = options.appModel;
    },

    url: function() {
      var cors = 'https://jsonp.nodejitsu.com/?url=';
      var searchTerm = this.appModel.get('searchTerm').replace(/ /g, '+');
      var base = 'http://api.brewerydb.com/v2/locations?region=';
      var keyBase = '&key=';
      // var key = 'da7893f044ebeecf79010b9e07bc84aa';
      var key = 'ebc1178ffae225ad44a88dcb1d8e221c';
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

    events: {
      'click': 'renderBrewery'
    },

    initialize: function() {
      this.listenTo(this.collection, 'sync', this.render);
    },

    render: function() {
      this.$el.empty();
      var self = this;
      this.collection.each(function(result) {
        self.$el.append('<li><a href="#results/' + searchTerm.replace(/ /g, '+') + '/' + result.get('breweryId') + '">' + result.get('brewery').name + '</a></li>');

      });
    },
  });

  var BreweryView = Backbone.View.extend({
     el: '#details',

     initialize: function(){
       this.listenTo(this.collection, 'sync', this.render);
     },

     render: function() {
       this.$('input');
       this.$el.empty();

       var test = this.collection.find(function(results){
         return results.get('breweryId');
       });

       console.log(this.collection);

       console.log(test);

       console.log(test.attributes.brewery.name);

       this.$el.append('this is where the brewery info goes');
     }


   });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'results/:state': 'search',
      'results/:state/:brewery': 'details'

    },

    initialize: function() {
      this.appModel = new AppModel();
      this.list = new ResultsCollection([], {
        appModel: this.appModel
      });
      this.listView = new ResultsView({
        collection: this.list
      });
    },

    index: function() {},

    search: function(state) {
      this.appModel.set('searchTerm', state);
      this.list.fetch();
      this.listView.render();
    },

    details: function(state, brewery) {
      this.appModel.set('searchTerm', state);
      this.list.fetch();

      var breweryView = new BreweryView({collection: this.list});
      breweryView.render();
    }
  });

  window.inputview = new TextInputView({
    model: State
  });

  $(document).ready(function() {
    window.router = new AppRouter();
    Backbone.history.start();
  });
})();
