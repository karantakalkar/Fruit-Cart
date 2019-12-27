$(function() {

        // fruit model
        var Fruit = Backbone.Model.extend({

            defaults: {
                title: 'Fruit',
                price: 10,
                checked: false
            },

            toggle: function(){
                this.set('checked', !this.get('checked'));
            }
        });

        // colection of fruit model
        var FruitList = Backbone.Collection.extend({

            model: Fruit,

            getSelectedFruits: function(){
                return this.where({checked:true});
            }
        });

        //predifined fruit obects in fruits collection
        var fruits = new FruitList ([
            new Fruit({ title: 'Apple', price: 20}),
            new Fruit({ title: 'Banana', price: 10}),
            new Fruit({ title: 'Mango', price: 25}),
            new Fruit({ title: 'Orange', price: 15})
        ])

        var FruitView = Backbone.View.extend({

            tagname: 'li',

            events: {
                'click': 'toggleFruit'
            },

            initialize: function(){
                this.listenTo(this.model, 'change', this.render);
            },


            render: function(){

                this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span> ');
                this.$('input').prop('checked', this.model.get('checked'));

                return this;
            },

            toggleFruit: function(){
                this.model.toggle();
            }

    });

    // main app view

    var App = Backbone.View.extend({

        el: $('#main'),

        initialize: function(){

            this.total = $('#total span');
            this.list = $('#fruitcart');

            this.listenTo(fruits, 'change', this.render);

            fruits.each(function(fruit){

                var view = new FruitView({ model: fruit });
                this.list.append(view.render().el);

            }, this);
        },

        render: function(){

            var total = 0;

            _.each(fruits.getSelectedFruits(), function(elem){
                total += elem.get('price');
            });
            this.total.text('$'+total);

            return this;
        }
    });

    new App();




});
