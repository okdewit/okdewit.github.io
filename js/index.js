// More info: https://github.com/sniperwolf/taggingJS

// jQuery on Ready example
(function( $, window, document, undefined ) {
    $( document ).ready(function() {
        var t = $( "#tag" ).tagging({'edit-on-delete':false});
        t[0].addClass( "form-control" );
        // console.log( t[0] );
    });
})( window.jQuery, window, document );