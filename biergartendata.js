let biergartendata = [
    {
      "lat":"47.263473","lng":"11.394978","name":"Theresienbraeu","adresse":"Maria_Theresien_Strasse 51-53","link":"http://www.theresienbraeu.com","bild":"images/theresienbraeu.jpg","bildquelle":"http://www.theresienbraeu.com/images/speasyimagegallery/albums/1/images/dsc01639.gif" 
    },
    {
      "lat":"47.2767846","lng":"11.3991046","name":"Loewenhaus","adresse":"Rennweg 5","link": "http://www.loewenhaus.at","bild":"images/loewenhaus.jpg","bildquelle":"http://www.loewenhaus.at/wp-content/uploadsgallery/gastgarten/bild_04.jpg"
    },
    {
      "lat":"47.2697068","lng":"11.3974477","name":"Hofgarten","adresse":"Rennweg 6a","link":"http://www.hofgarten.cafe","bild":"images/hofgarten.jpg","bildquelle":"https://sperrstunde.at/media/1370/dsc-2.jpg?anchor=center&amp;mode=crop&amp;quality=90&amp;width=800&amp;heightratio=0.5&amp;format=jpg&amp;slimmage=true&amp;rnd=130918009150000000" 
    },
    {
      "lat":"47.265893","lng":"11.392105","name":"Goessers","adresse":"Adolf_Pichler_Platz 3","link":"http://www.goessers.at","bild":"images/goessers.jpg","bildquelle":"https://media-cdn.tripadvisor.com/media/photo-s/0c/cc/70/64/goessers.jpg" 
    },
    {
      "lat":"47.2514265","lng":"11.4012491","name":"Bierstindl","adresse":"Klostergasse 6","link":"https://www.bierstindl.eu","bild":"images/bierstindl.jpg","bildquelle":"https://www.bing.com/th?id=OIP.IlzqoFW7vucsffzQZ3eFHQHaE8&pid=Api" 
    },
    {
      "lat":"47.279924","lng":"11.4041895","name":"Restaurant Panorama","adresse":"Rennweg 39","link":"http://restaurant-panorama.info","bild":"images/panorama.jpg","bildquelle":"http://www.gastrotour.cc/index.php?it=oesterreich/tirol/innsbruck-stadt/innsbruck/gastgarten-und-biergarten-restaurant-panorama/" 
    },
    {
      "lat":"47.2685811","lng":"11.3936288","name":"","adresse":"Stiftskeller","link":"https://www.stiftskeller.eu/","bild":"images/stiftskeller.jpg","bildquelle":"https://www.innsbruck.info/emobilder/x/15131/Biergarten.jpg" 
    },
    {
      "lat":"47.3063381","lng":"11.3797005","name":"Alpenlounge Seegrube","adresse":"","link":"https://www.nordkette.com/de/restaurant-seegrube.html","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2730955","lng":"11.3933872","name":"Gastgarten zur Eiche","adresse":"","link":"http://zureiche.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2696596","lng":"11.3994036","name":"Kapuziner","adresse":"Kaiserjaegerstrasse 4a","link":"https://www.facebook.com/kapuziner6020","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2694643","lng":"11.3934397","name":"Fischerhaeusl","adresse":"Herrengasse 8","link":"http://www.fischerhaeusl.com","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2677112","lng":"11.3936949","name":"Weisses Kreuz","adresse":"Herzog_Friedrich_Strasse 31","link":"http://www.weisseskreuz.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2575182","lng":"11.427565","name":"Bierwirt","adresse":"Bichlweg 2","link":"http://www.bierwirt.com","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2490702","lng":"11.3675894","name":"Gasthaus Peterbruennl","adresse":"Voelser Strasse 25","link":"https://www.peterbruennl.at/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2518797","lng":"11.4048398","name":"Gasthaus Bretterkeller","adresse":"Viller Berg 1","link":"https://www.gasthaus-bretterkeller.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2641426","lng":"11.4258137","name":"Restaurant Martin","adresse":"Geyrstrasse 3","link":"http://www.cafe-restaurant-martin.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2555207","lng":"11.394446","name":"Gasthaus Riese Haymon","adresse":"Haymongasse 4","link":"https://www.riese-haymon.at/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.259905","lng":"11.396397","name":"Gasthaus Steneck","adresse":"Leopoldstrasse 21","link":"https://www.facebook.com/pages/Gasthaus-Steneck/188884881152417","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2622246","lng":"11.3947435","name":"Vapiano","adresse":"Leopoldstrasse 1","link":"https://at.vapiano.com/de/restaurants/vapiano-innsbruck-2-leopoldstrasse-1/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2683536","lng":"11.3918077","name":"Ottoburg","adresse":"Herzog_Friedrich_Strasse 1","link":"http://www.ottoburg.at/de/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2684602","lng":"11.392082","name":"Piano Bar","adresse":"Herzog_Friedrich_Strasse 5","link":"https://www.cafepiano.at/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.268488","lng":"11.3926827","name":"Elferhaus","adresse":"Herzog_Friedrich_Strasse 11","link":"https://www.facebook.com/elferhaus","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2626761","lng":"11.3967122","name":"Stieglbraeu","adresse":"Wilhelm_Greil_Strasse 25","link":"http://www.stiegl-braeu-innsbruck.at/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2711355","lng":"11.3732702","name":"Gasthaus Hoettinger Schießstand","adresse":"Schwabeneckweg 7","link":"https://www.facebook.com/gasthaus.hoettinger.schiessstand","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2701405","lng":"11.358619","name":"Gasthaus Berchtoldshof","adresse":"Schneeburggasse 140","link":"https://www.berchtoldshof.com/","bild":"images/Berchtoldshof.jpg","bildquelle":"https://www.innsbruck.info/emobilder/x/27309/Berchtoldshof.jpg" 
    },
    {
      "lat":"47.2721546","lng":"11.3591399","name":"Gasthof Buzihuette","adresse":"Berchtoldshofweg 14","link":"http://www.buzihuette.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2763926","lng":"11.3822642","name":"Gasthaus Planötzenhof","adresse":"Planötzenhofstraße 30","link":"http://www.planoetzenhof.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2774699","lng":"11.3866415","name":"Gasthof Oelberg","adresse":"Höhenstrasse 52","link":"http://www.oelberg.eu","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2835293","lng":"11.3794032","name":"Gasthof Gramarthof","adresse":"Gramartstraße 117","link":"http://www.gramarthof.com/","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2860912","lng":"11.398091","name":"Cafe Pension Alpina","adresse":"Hungerburgweg 4","link":"http://www.cafe-pension-alpina.at","bild":"","bildquelle":"" 
    },
    {
      "lat":"47.2677564","lng":"11.3910974","name":"Cammerlander","adresse":"Innrain 2","link":"http://www.cammerlander.at/","bild":"","bildquelle":""
    },
    {
      "lat":"47.2615781","lng":"11.3926908","name":"Glasmalerei","adresse":"Müllerstrasse 10","link":"https://at.speisekarte.menu/restaurants/innsbruck/restaurant-bar-glasmalerei","bild":"","bildquelle":""
    },
];