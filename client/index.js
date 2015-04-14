/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init(){
  $('#pokedex').on('click', '.pokemon', getPokemon);
  drawPokedex();
}

function getPokemon() {
  var $self = $(this);
  var domain = 'http://pokeapi.co/';
  var uri = $(this).data('uri');
  var url = domain + uri;
  $.getJSON(url, function(response) {
    console.log(response.sprites);

    var spriteUrls = response.sprites.map(function(o) {
      return domain +o.resource_uri;
    })
    spriteUrls.forEach(function(url) {
      $.getJSON(url, function(response) {
        $self.children('.image').css('background-image', 'url("'+ domain + response.image +'")');
        console.log($self, response.image);
      });
    });
  });
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemon){
    var $outer = $('<div>');
    var $name = $('<div>');
    var $image = $('<div>');

    $outer.addClass('pokemon');
    $outer.attr('data-uri', pokemon.resource_uri);
    $name.addClass('name');
    $name.text(pokemon.name);
    $image.addClass('image');

    $outer.append($name, $image);
    $('#pokedex').append($outer);
  });
}
