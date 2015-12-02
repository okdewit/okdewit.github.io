(function( $, window, document, undefined ) {
    $( document ).ready(function() {
        var t = $( "#tag" ).tagging({'edit-on-delete':false});
        t[0].addClass( "form-control" );
    });
})( window.jQuery, window, document );