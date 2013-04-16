/*
 * INVENKTION.LevelManager
 * author: Marco Uberti 
 * date:   April, 2013
 * 
 * 		Manager che gestisce i livelli
 * 
 */
(function($, exports){
	
	//Metodi e variabili private
	var atelier = {
			codice:			"atelier",
      	    nome:			"atelier",
      	    sfondo:			"images/sfondi/sfondo1.png",
			livelli:	[
        	           	 {
        	           		 codice: 		"atm1",
        	           		 nome:	 		"atm1",
        	           		 immagine:		"images/mostri/atelier1.png",
        	           		 contorno:		"images/mostri/atelier1_tr.png",
        	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
        	           	 },
        	           	 {
        	           		 codice: 		"atm2",
        	           		 nome:	 		"atm2",
        	           		 immagine:		"images/mostri/atelier2.png",
        	           		 contorno:		"images/mostri/atelier2_tr.png",
        	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
        	           	 }
        	           	 ]
	};
	var sezioni = [
	               //### SEZIONE 1
	               {
	            	   codice:			"w1",
	            	   nome:			"mondo1",
	            	   sfondo:			"images/sfondi/sfondo1.png",
	            	   immagine:		"images/sezioni/sec1presentation.png",
	            	   immagineBlocked: "images/sezioni/sec1blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w1m1",
	            	           		 nome:	 		"w1m1",
	            	           		 immagine:		"images/mostri/w1_monster1.png",
	            	           		 contorno:		"images/mostri/w1_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m2",
	            	           		 nome:	 		"w1m2",
	            	           		 immagine:		"images/mostri/w1_monster2.png",
	            	           		 contorno:		"images/mostri/w1_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m3",
	            	           		 nome:	 		"w1m3",
	            	           		 immagine:		"images/mostri/w1_monster3.png",
	            	           		 contorno:		"images/mostri/w1_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m4",
	            	           		 nome:	 		"w1m4",
	            	           		 immagine:		"images/mostri/w1_monster4.png",
	            	           		 contorno:		"images/mostri/w1_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m5",
	            	           		 nome:	 		"w1m5",
	            	           		 immagine:		"images/mostri/w1_monster5.png",
	            	           		 contorno:		"images/mostri/w1_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m6",
	            	           		 nome:	 		"w1m6",
	            	           		 immagine:		"images/mostri/w1_monster6.png",
	            	           		 contorno:		"images/mostri/w1_monster6_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m7",
	            	           		 nome:	 		"w1m7",
	            	           		 immagine:		"images/mostri/w1_monster7.png",
	            	           		 contorno:		"images/mostri/w1_monster7_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m8",
	            	           		 nome:	 		"w1m8",
	            	           		 immagine:		"images/mostri/w1_monster8.png",
	            	           		 contorno:		"images/mostri/w1_monster8_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m9",
	            	           		 nome:	 		"w1m9",
	            	           		 immagine:		"images/mostri/w1_monster9.png",
	            	           		 contorno:		"images/mostri/w1_monster9_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m10",
	            	           		 nome:	 		"w1m10",
	            	           		 immagine:		"images/mostri/w1_monster10.png",
	            	           		 contorno:		"images/mostri/w1_monster10_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 2
	               {
	            	   codice:			"w2",
	            	   nome:			"mondo2",
	            	   sfondo:			"images/sfondi/sfondo2.png",
	            	   immagine:		"images/sezioni/sec2presentation.png",
	            	   immagineBlocked: "images/sezioni/sec2blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w2m1",
	            	           		 nome:	 		"w2m1",
	            	           		 immagine:		"images/mostri/w2_monster1.png",
	            	           		 contorno:		"images/mostri/w2_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m2",
	            	           		 nome:	 		"w2m2",
	            	           		 immagine:		"images/mostri/w2_monster2.png",
	            	           		 contorno:		"images/mostri/w2_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m3",
	            	           		 nome:	 		"w2m3",
	            	           		 immagine:		"images/mostri/w2_monster3.png",
	            	           		 contorno:		"images/mostri/w2_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m4",
	            	           		 nome:	 		"w2m4",
	            	           		 immagine:		"images/mostri/w2_monster4.png",
	            	           		 contorno:		"images/mostri/w2_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m5",
	            	           		 nome:	 		"w2m5",
	            	           		 immagine:		"images/mostri/w2_monster5.png",
	            	           		 contorno:		"images/mostri/w2_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m6",
	            	           		 nome:	 		"w2m6",
	            	           		 immagine:		"images/mostri/w2_monster6.png",
	            	           		 contorno:		"images/mostri/w2_monster6_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m7",
	            	           		 nome:	 		"w2m7",
	            	           		 immagine:		"images/mostri/w2_monster7.png",
	            	           		 contorno:		"images/mostri/w2_monster7_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m8",
	            	           		 nome:	 		"w2m8",
	            	           		 immagine:		"images/mostri/w2_monster8.png",
	            	           		 contorno:		"images/mostri/w2_monster8_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m9",
	            	           		 nome:	 		"w2m9",
	            	           		 immagine:		"images/mostri/w2_monster9.png",
	            	           		 contorno:		"images/mostri/w2_monster9_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m10",
	            	           		 nome:	 		"w2m10",
	            	           		 immagine:		"images/mostri/w2_monster10.png",
	            	           		 contorno:		"images/mostri/w2_monster10_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 3
	               {
	            	   codice:			"w3",
	            	   nome:			"mondo3",
	            	   sfondo:			"images/sfondi/sfondo3.png",
	            	   immagine:		"images/sezioni/sec3presentation.png",
	            	   immagineBlocked: "images/sezioni/sec3blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w3m1",
	            	           		 nome:	 		"w3m1",
	            	           		 immagine:		"images/mostri/w3_monster1.png",
	            	           		 contorno:		"images/mostri/w3_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m2",
	            	           		 nome:	 		"w3m2",
	            	           		 immagine:		"images/mostri/w3_monster2.png",
	            	           		 contorno:		"images/mostri/w3_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m3",
	            	           		 nome:	 		"w3m3",
	            	           		 immagine:		"images/mostri/w3_monster3.png",
	            	           		 contorno:		"images/mostri/w3_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m4",
	            	           		 nome:	 		"w3m4",
	            	           		 immagine:		"images/mostri/w3_monster4.png",
	            	           		 contorno:		"images/mostri/w3_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m5",
	            	           		 nome:	 		"w3m5",
	            	           		 immagine:		"images/mostri/w3_monster5.png",
	            	           		 contorno:		"images/mostri/w3_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m6",
	            	           		 nome:	 		"w3m6",
	            	           		 immagine:		"images/mostri/w3_monster6.png",
	            	           		 contorno:		"images/mostri/w3_monster6_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m7",
	            	           		 nome:	 		"w3m7",
	            	           		 immagine:		"images/mostri/w3_monster7.png",
	            	           		 contorno:		"images/mostri/w3_monster7_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m8",
	            	           		 nome:	 		"w3m8",
	            	           		 immagine:		"images/mostri/w3_monster8.png",
	            	           		 contorno:		"images/mostri/w3_monster8_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m9",
	            	           		 nome:	 		"w3m9",
	            	           		 immagine:		"images/mostri/w3_monster9.png",
	            	           		 contorno:		"images/mostri/w3_monster9_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m10",
	            	           		 nome:	 		"w3m10",
	            	           		 immagine:		"images/mostri/w3_monster10.png",
	            	           		 contorno:		"images/mostri/w3_monster10_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 4
	               {
	            	   codice:			"w4",
	            	   nome:			"mondo4",
	            	   sfondo:			"images/sfondi/sfondo4.png",
	            	   immagine:		"images/sezioni/sec4presentation.png",
	            	   immagineBlocked: "images/sezioni/sec4blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w4m1",
	            	           		 nome:	 		"w4m1",
	            	           		 immagine:		"images/mostri/w4_monster1.png",
	            	           		 contorno:		"images/mostri/w4_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m2",
	            	           		 nome:	 		"w4m2",
	            	           		 immagine:		"images/mostri/w4_monster2.png",
	            	           		 contorno:		"images/mostri/w4_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m3",
	            	           		 nome:	 		"w4m3",
	            	           		 immagine:		"images/mostri/w4_monster3.png",
	            	           		 contorno:		"images/mostri/w4_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m4",
	            	           		 nome:	 		"w4m4",
	            	           		 immagine:		"images/mostri/w4_monster4.png",
	            	           		 contorno:		"images/mostri/w4_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m5",
	            	           		 nome:	 		"w4m5",
	            	           		 immagine:		"images/mostri/w4_monster5.png",
	            	           		 contorno:		"images/mostri/w4_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m6",
	            	           		 nome:	 		"w4m6",
	            	           		 immagine:		"images/mostri/w4_monster6.png",
	            	           		 contorno:		"images/mostri/w4_monster6_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m7",
	            	           		 nome:	 		"w4m7",
	            	           		 immagine:		"images/mostri/w4_monster7.png",
	            	           		 contorno:		"images/mostri/w4_monster7_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m8",
	            	           		 nome:	 		"w4m8",
	            	           		 immagine:		"images/mostri/w4_monster8.png",
	            	           		 contorno:		"images/mostri/w4_monster8_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m9",
	            	           		 nome:	 		"w4m9",
	            	           		 immagine:		"images/mostri/w4_monster9.png",
	            	           		 contorno:		"images/mostri/w4_monster9_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m10",
	            	           		 nome:	 		"w4m10",
	            	           		 immagine:		"images/mostri/w4_monster10.png",
	            	           		 contorno:		"images/mostri/w4_monster10_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 5
	               {
	            	   codice:			"w5",
	            	   nome:			"mondo5",
	            	   sfondo:			"images/sfondi/sfondo5.png",
	            	   immagine:		"images/sezioni/sec5presentation.png",
	            	   immagineBlocked: "images/sezioni/sec5blocked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w5m1",
	            	           		 nome:	 		"w5m1",
	            	           		 immagine:		"images/mostri/w5_monster1.png",
	            	           		 contorno:		"images/mostri/w5_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m2",
	            	           		 nome:	 		"w5m2",
	            	           		 immagine:		"images/mostri/w5_monster2.png",
	            	           		 contorno:		"images/mostri/w5_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m3",
	            	           		 nome:	 		"w5m3",
	            	           		 immagine:		"images/mostri/w5_monster3.png",
	            	           		 contorno:		"images/mostri/w5_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m4",
	            	           		 nome:	 		"w5m4",
	            	           		 immagine:		"images/mostri/w5_monster4.png",
	            	           		 contorno:		"images/mostri/w5_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m5",
	            	           		 nome:	 		"w5m5",
	            	           		 immagine:		"images/mostri/w5_monster5.png",
	            	           		 contorno:		"images/mostri/w5_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m6",
	            	           		 nome:	 		"w5m6",
	            	           		 immagine:		"images/mostri/w5_monster6.png",
	            	           		 contorno:		"images/mostri/w5_monster6_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m7",
	            	           		 nome:	 		"w5m7",
	            	           		 immagine:		"images/mostri/w5_monster7.png",
	            	           		 contorno:		"images/mostri/w5_monster7_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m8",
	            	           		 nome:	 		"w5m8",
	            	           		 immagine:		"images/mostri/w5_monster8.png",
	            	           		 contorno:		"images/mostri/w5_monster8_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m9",
	            	           		 nome:	 		"w5m9",
	            	           		 immagine:		"images/mostri/w5_monster9.png",
	            	           		 contorno:		"images/mostri/w5_monster9_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m10",
	            	           		 nome:	 		"w5m10",
	            	           		 immagine:		"images/mostri/w5_monster10.png",
	            	           		 contorno:		"images/mostri/w5_monster10_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE BONUS
	               {
	            	   codice:			"wb",
	            	   nome:			"mondob",
	            	   sfondo:			"images/sfondi/sfondobonus.png",
	            	   immagine:		"images/sezioni/bonuspresentation.png",
	            	   immagineBlocked: "images/sezioni/bonuspresentation.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"wbm1",
	            	           		 nome:	 		"wbm1",
	            	           		 immagine:		"images/mostri/wb_monster1.png",
	            	           		 contorno:		"images/mostri/wb_monster1_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm2",
	            	           		 nome:	 		"wbm2",
	            	           		 immagine:		"images/mostri/wb_monster2.png",
	            	           		 contorno:		"images/mostri/wb_monster2_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm3",
	            	           		 nome:	 		"wbm3",
	            	           		 immagine:		"images/mostri/wb_monster3.png",
	            	           		 contorno:		"images/mostri/wb_monster3_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm4",
	            	           		 nome:	 		"wbm4",
	            	           		 immagine:		"images/mostri/wb_monster4.png",
	            	           		 contorno:		"images/mostri/wb_monster4_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm5",
	            	           		 nome:	 		"wbm5",
	            	           		 immagine:		"images/mostri/wb_monster5.png",
	            	           		 contorno:		"images/mostri/wb_monster5_tr.png",
	            	           		 colori:  [{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0},{r: 0,g: 0, b: 0}]
	            	           	 }
	            	           	 ]
	               }
	               ];

	//Il nostro oggetto da esporre
	var mod = {
		 //Numero di sezioni
		 getSectionCount : function() {
			 return sezioni.length;
		 },
		 //Numero dei livelli di una particolare sezione
		 getSectionLevelCount: function(section) {
			return section.livelli.length; 
		 },
		 //Restituisce la sezione dato il suo numero
		 getSection: function(index) {
			 return sezioni[index];
		 },
		 //Restituisce il livello di una specifica sezione dato il suo numero
		 getSectionLevel: function(section,index) {
			 return section.livelli[index];
		 },
		 isLevelUnlocked: function(level) {
			 var unlocked = INVENKTION.StorageManager.getItem(level.codice+"_unlocked");
			 if(unlocked == "true") return true;
			 else return false;
		 },
		 unlockLevel: function(level) {
			 INVENKTION.StorageManager.setItem(level.codice+"_unlocked", "true");
		 },
		 getLevelBestResult: function(level) {
			 var percentage = INVENKTION.StorageManager.getItem(level.codice+"_best");
			 if(!percentage) return "0";
			 else return percentage;
		 },
		 setLevelBestResult: function(level, percentage) {
			 INVENKTION.StorageManager.setItem(level.codice+"_best", percentage);
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.LevelManager = mod;
})(jQuery, window);
	