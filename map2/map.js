"use strict";!function(a,b){var c="distributionmap";a[c]=b(a.jQuery,a.L)}(window,function(a,b){return void 0===b&&console.error("Required dependency Leaflet not found"),void 0===a&&console.error("Required dependency jQuery not found"),a.fn.distributionmap=function(c){function d(a,b,c){for(var d=a.concat(b),e=0;e<d.length;e++)for(var f=e+1;f<d.length;f++)c(d[e],d[f])&&(d.splice(f,1),f--);return d}var e=this;this.selection=[],Object.defineProperty(this,"total",{get:function(){return e.selection.map(function(a){return a.amount}).reduce(function(a,b){return a+b},0)}}),Object.defineProperty(this,"zipcodes",{get:function(){return e.selection.map(function(a){return a.zipcode})}}),this.options={style:{"default":{color:"#514689",weight:1,opacity:1,fillOpacity:.1,fillColor:"#514689"},highlight:{color:"#514689",weight:3,opacity:1,fillOpacity:.1,fillColor:"#514689"},selected:{color:"#514689",weight:1,opacity:1,fillOpacity:.65,fillColor:"#b7bf10"},highlightselected:{color:"#514689",weight:3,opacity:1,fillOpacity:.65,fillColor:"#b7bf10"}},url:"https://marvia.outliner.me/map",distributor:"spotta",maplayer:{url:"https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",attribution:'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> / <a href="http://mapbox.com">Mapbox</a>',id:"okdewit.0c5ho2j1",accessToken:"pk.eyJ1Ijoib2tkZXdpdCIsImEiOiJjaXA5cXgwNjAwMDJweGZtN2J0NGF5Y3EwIn0.7fT57uI6AgE4bv3lFe_Lwg"}},c=a.extend({},this.options,c);var f=this,g=b.latLngBounds([[53.62,2.931],[50.763,7.182]]),h=b.map(f.get(0),{maxZoom:15,minZoom:7}).fitBounds(g),i=b.tileLayer(c.maplayer.url,{attribution:c.maplayer.attribution,id:c.maplayer.id,accessToken:c.maplayer.accessToken}),j=function(a){return!!f.selection.find(function(b){return+b.zipcode==+a})},k=void 0,l=void 0,m={onEachFeature:function(a,b){b.setStyle(j(a.properties.zipcode)?c.style.selected:c.style["default"]),function(a,b){b.on("mouseover",function(){b.setStyle(j(a.zipcode)?c.style.highlightselected:c.style.highlight),f.trigger("areaover",[a])}),b.on("mouseout",function(){b.setStyle(j(a.zipcode)?c.style.selected:c.style["default"]),f.trigger("areaout",[a])}),b.on("click",function(){j(a.zipcode)?(f.selection=f.selection.filter(function(b){return b.zipcode!==a.zipcode}),b.setStyle(c.style.highlight)):(f.selection.push({zipcode:a.zipcode,amount:a.amount,town:a.town}),b.setStyle(c.style.selected)),f.trigger("areaselect",[a])})}(a.properties,b)}},n=function(a){k.eachLayer(function(b){var c=b.feature.properties;a.find(function(a){return+a==+c.zipcode})&&!j(c.zipcode)&&(f.selection.push({zipcode:c.zipcode,amount:c.amount,town:c.town}),f.trigger("areaselect",[c]))}),f.redraw()},o=function(){var a=[];k.eachLayer(function(b){j(b.feature.properties.zipcode)?(a.push(b.getBounds()),b.setStyle(c.style.selected)):b.setStyle(c.style["default"])}),h.fitBounds(a.length?a:c.restrict?k.getBounds():g)},p=function(a){var b=[];k.eachLayer(function(c){-1!==a.indexOf(c.feature.properties.zipcode)&&b.push(c.getBounds())}),h.fitBounds(b.length?b:c.restrict?k.getBounds():g)},q=function(d){l=h.getZoom();var e=h.getBounds(),g=[e._northEast.lng,e._northEast.lat,e._southWest.lng,e._southWest.lat];(!k||l>=11)&&(f.trigger("loadstart"),a("#load").html("true"),a.get(c.url,{box:g,zoom:l,distributor:c.distributor,restrict:c.restrict},function(a){k?!function(){var c=b.geoJson(a,m);k.eachLayer(function(a){c.eachLayer(function(b){b.feature.properties.zipcode==a.feature.properties.zipcode&&(b.selected=a.selected,k.removeLayer(a),k.addLayer(b))})})}():(k=b.geoJson(a,m).addTo(h),f.trigger("initialize")),f.trigger("loadend"),(d||Function)()}))};i.addTo(h),q(c.restrict?function(){h.fitBounds(k.getBounds())}:null),this.redraw=f.redraw=o,this.zoomto=f.zoomto=p,this.addSelection=f.addSelection=n,h.doubleClickZoom.disable(),h.on("movestart",function(){!a.layerperformance&&h.removeLayer(k)}),h.on("moveend",function(){q(),!a.layerperformance&&k.addTo(h)}),h.on("zoomstart",function(){!a.layerperformance&&h.removeLayer(k)}),h.on("zoomend",function(){!a.layerperformance&&k.addTo(h);var b=h.getZoom();f.trigger("zoom",[b]),b>l&&q(),l=b});var r=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.obj.whitespace("town"),queryTokenizer:Bloodhound.tokenizers.whitespace,prefetch:{url:c.url+"/search?distributor="+c.distributor,cache:!0,ttl:5e3}});return r.initialize(),a(".typeahead").typeahead({name:"cities",display:"town",items:6,source:r.ttAdapter(),displayText:function(a){return"<table><tr><td>"+a.town+"</td></table>"},afterSelect:function(b){console.log(b),a(".typeahead").val(b.town),f.selection=d(f.selection,b.items,function(a,b){return a.zipcode==b.zipcode}),f.redraw(),f.trigger("areaselect")},onShow:function(){setTimeout(function(){a(".typeahead.dropdown-menu").width(a("input.typeahead").outerWidth())},10)},sorter:function(a){return a.length?a.sort(function(a,b){return b.total-a.total}):a},highlighter:function(b){var c=a("<div></div>").html(b);if(!this.query)return c.html();var d=new RegExp("\\b("+this.query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")+")","gi"),e=a(c.find("*")).add(c).contents().filter(function(){return 3===this.nodeType});return e.replaceWith(function(){return a(this).text().replace(d,"<strong>$1</strong>")}),c.html()}}).on("keypress",function(b){if(13==b.which){var c=a(this).val(),d=void 0;(d=/([0-9]{4})-([0-9]{4})/.exec(c))?n(a.range(+d[1],+d[2])):/[0-9]{4}/.test(c)&&n([+c])}}),this},{version:"0.0.3"}}),function(a){var b=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,c=!!window.chrome&&!!window.chrome.webstore,d=(c||b)&&!!window.CSS;if(Array.prototype.fill||(Array.prototype.fill=function(a){for(var b=Object(this),c=b.length>>>0,d=arguments[1]>>0,e=0>d?Math.max(c+d,0):Math.min(d,c),f=void 0===arguments[2]?c:arguments[2]>>0,g=0>f?Math.max(c+f,0):Math.min(f,c);g>e;)b[e]=a,e++;return b}),a.layerperformance=b||c||d,a.range=function(a,b){return Array(b-a+1).fill().map(function(b,c){return c+a})},void 0!==a.fn.typeahead){var e=a.fn.typeahead.Constructor.prototype.show;a.fn.typeahead.Constructor.prototype.show=function(){"function"==typeof this.options.onShow&&this.options.onShow(),e.apply(this,[])}}Array.prototype.find||(Array.prototype.find=function(a){for(var b,c=Object(this),d=c.length>>>0,e=arguments[1],f=0;d>f;f++)if(b=c[f],a.call(e,b,f,c))return b})}(window.jQuery);
