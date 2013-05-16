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
        	           		 colori:  [[255,137,0],[176,62,72],[102,120,204]]//ok
        	           	 },
        	           	 {
        	           		 codice: 		"atm2",
        	           		 nome:	 		"atm2",
        	           		 immagine:		"images/mostri/atelier2.png",
        	           		 contorno:		"images/mostri/atelier2_tr.png",
        	           		 colori:  [[63,182,255],[255,191,50]]//ok
        	           	 }
        	           	 ]
	};
	var sezioni = [
	               //### SEZIONE 1
	               {
	            	   codice:			"w1",
	            	   index:			"0",
	            	   nome:			"mondo1",
	            	   sfondo:			"images/sfondi/sfondo1.png",
	            	   immagine:		"images/sezioni/sec1presentation.png",
	            	   immagineBlocked: "images/sezioni/sec1locked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w1m1",
	            	           		 nome:	 		"w1m1",
	            	           		 immagine:		"images/mostri/w1_monster1.png",
	            	           		 contorno:		"images/mostri/w1_monster1_tr.png",
	            	           		 colori:  [[199, 147, 216],[216, 17, 124],[155, 154, 216]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m2",
	            	           		 nome:	 		"w1m2",
	            	           		 immagine:		"images/mostri/w1_monster2.png",
	            	           		 contorno:		"images/mostri/w1_monster2_tr.png",
	            	           		 colori:  [[208, 221, 40],[219, 203, 121],[239, 239, 232],[204, 149, 51]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m3",
	            	           		 nome:	 		"w1m3",
	            	           		 immagine:		"images/mostri/w1_monster3.png",
	            	           		 contorno:		"images/mostri/w1_monster3_tr.png",
	            	           		 colori:  [[249, 135, 222],[173, 76, 150],[158, 150, 244]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m4",
	            	           		 nome:	 		"w1m4",
	            	           		 immagine:		"images/mostri/w1_monster4.png",
	            	           		 contorno:		"images/mostri/w1_monster4_tr.png",
	            	           		 colori:  [[127, 204, 190],[154, 63, 55],[185, 161, 143]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m5",
	            	           		 nome:	 		"w1m5",
	            	           		 immagine:		"images/mostri/w1_monster5.png",
	            	           		 contorno:		"images/mostri/w1_monster5_tr.png",
	            	           		 colori:  [[151, 198, 196],[206, 140, 167],[204, 209, 148]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m6",
	            	           		 nome:	 		"w1m6",
	            	           		 immagine:		"images/mostri/w1_monster6.png",
	            	           		 contorno:		"images/mostri/w1_monster6_tr.png",
	            	           		 colori:  [[255, 198, 72],[0, 143, 230],[229, 89, 11]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m7",
	            	           		 nome:	 		"w1m7",
	            	           		 immagine:		"images/mostri/w1_monster7.png",
	            	           		 contorno:		"images/mostri/w1_monster7_tr.png",
	            	           		 colori:  [[170, 193, 181],[146, 158, 191],[174, 143, 164],[117, 109, 79]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m8",
	            	           		 nome:	 		"w1m8",
	            	           		 immagine:		"images/mostri/w1_monster8.png",
	            	           		 contorno:		"images/mostri/w1_monster8_tr.png",
	            	           		 colori:  [[144, 108, 143],[226, 128, 10],[226, 64, 10],[56, 117, 231]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w1m9",
	            	           		 nome:	 		"w1m9",
	            	           		 immagine:		"images/mostri/w1_monster9.png",
	            	           		 contorno:		"images/mostri/w1_monster9_tr.png",
	            	           		 colori:  [[255, 196, 71],[254, 124, 46],[129, 109, 171]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w1m10",
	            	           		 nome:	 		"w1m10",
	            	           		 immagine:		"images/mostri/w1_monster10.png",
	            	           		 contorno:		"images/mostri/w1_monster10_tr.png",
	            	           		 colori:  [[152, 132, 206],[77, 67, 129],[194, 108, 171]]//ok
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 2
	               {
	            	   codice:			"w2",
	            	   index:			"1",
	            	   nome:			"mondo2",
	            	   sfondo:			"images/sfondi/sfondo2.png",
	            	   immagine:		"images/sezioni/sec2presentation.png",
	            	   immagineBlocked: "images/sezioni/sec2locked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w2m1",
	            	           		 nome:	 		"w2m1",
	            	           		 immagine:		"images/mostri/w2_monster1.png",
	            	           		 contorno:		"images/mostri/w2_monster1_tr.png",
	            	           		 colori:  [[86, 184, 55],[43, 130, 153],[249, 58, 6],[250, 142, 56]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m2",
	            	           		 nome:	 		"w2m2",
	            	           		 immagine:		"images/mostri/w2_monster2.png",
	            	           		 contorno:		"images/mostri/w2_monster2_tr.png",
	            	           		 colori:  [[205, 197, 0],[204, 124, 0],[204, 51, 0]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m3",
	            	           		 nome:	 		"w2m3",
	            	           		 immagine:		"images/mostri/w2_monster3.png",
	            	           		 contorno:		"images/mostri/w2_monster3_tr.png",
	            	           		 colori:  [[161, 178, 98],[178, 118, 98],[111, 124, 162]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m4",
	            	           		 nome:	 		"w2m4",
	            	           		 immagine:		"images/mostri/w2_monster4.png",
	            	           		 contorno:		"images/mostri/w2_monster4_tr.png",
	            	           		 colori:  [[107, 129, 148],[217, 224, 33],[221, 153, 33],[145, 95, 7]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m5",
	            	           		 nome:	 		"w2m5",
	            	           		 immagine:		"images/mostri/w2_monster5.png",
	            	           		 contorno:		"images/mostri/w2_monster5_tr.png",
	            	           		 colori:  [[150, 86, 120],[150, 176, 215],[221, 179, 124],[247, 229, 169]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m6",
	            	           		 nome:	 		"w2m6",
	            	           		 immagine:		"images/mostri/w2_monster6.png",
	            	           		 contorno:		"images/mostri/w2_monster6_tr.png",
	            	           		 colori:  [[213, 216, 122],[226, 122, 237],[114, 142, 72]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m7",
	            	           		 nome:	 		"w2m7",
	            	           		 immagine:		"images/mostri/w2_monster7.png",
	            	           		 contorno:		"images/mostri/w2_monster7_tr.png",
	            	           		 colori:  [[154, 116, 188],[150, 196, 234],[188, 116, 154]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m8",
	            	           		 nome:	 		"w2m8",
	            	           		 immagine:		"images/mostri/w2_monster8.png",
	            	           		 contorno:		"images/mostri/w2_monster8_tr.png",
	            	           		 colori:  [[198, 193, 23],[167, 51, 63],[98, 99, 26]]//ok
	            	           	 },
	            	           	{
	            	           		 codice: 		"w2m9",
	            	           		 nome:	 		"w2m9",
	            	           		 immagine:		"images/mostri/w2_monster9.png",
	            	           		 contorno:		"images/mostri/w2_monster9_tr.png",
	            	           		 colori:  [[154,191,17],[124,133,163],[153,112,105]]//ok
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w2m10",
	            	           		 nome:	 		"w2m10",
	            	           		 immagine:		"images/mostri/w2_monster10.png",
	            	           		 contorno:		"images/mostri/w2_monster10_tr.png",
	            	           		 colori:  [[201,175,0],[87,150,180],[180,108,87]]//ok
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 3
	               {
	            	   codice:			"w3",
	            	   index:			"2",
	            	   nome:			"mondo3",
	            	   sfondo:			"images/sfondi/sfondo3.png",
	            	   immagine:		"images/sezioni/sec3presentation.png",
	            	   immagineBlocked: "images/sezioni/sec3locked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w3m1",
	            	           		 nome:	 		"w3m1",
	            	           		 immagine:		"images/mostri/w3_monster1.png",
	            	           		 contorno:		"images/mostri/w3_monster1_tr.png",
	            	           		 colori:  [[239, 221, 175],[186, 143, 185],[239, 191, 175],[103, 163, 117]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m2",
	            	           		 nome:	 		"w3m2",
	            	           		 immagine:		"images/mostri/w3_monster2.png",
	            	           		 contorno:		"images/mostri/w3_monster2_tr.png",
	            	           		 colori:  [[149, 187, 206],[192, 166, 160],[214, 155, 112],[93, 103, 110]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m3",
	            	           		 nome:	 		"w3m3",
	            	           		 immagine:		"images/mostri/w3_monster3.png",
	            	           		 contorno:		"images/mostri/w3_monster3_tr.png",
	            	           		 colori:  [[237, 54, 32],[199, 148, 85],[76, 131, 214]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m4",
	            	           		 nome:	 		"w3m4",
	            	           		 immagine:		"images/mostri/w3_monster4.png",
	            	           		 contorno:		"images/mostri/w3_monster4_tr.png",
	            	           		 colori:  [[199, 109, 201],[196, 200, 156],[216, 111, 111],[210, 169, 156]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m5",
	            	           		 nome:	 		"w3m5",
	            	           		 immagine:		"images/mostri/w3_monster5.png",
	            	           		 contorno:		"images/mostri/w3_monster5_tr.png",
	            	           		 colori:  [[189, 204, 212],[219, 168, 152],[121, 101, 132],[143, 119, 80]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m6",
	            	           		 nome:	 		"w3m6",
	            	           		 immagine:		"images/mostri/w3_monster6.png",
	            	           		 contorno:		"images/mostri/w3_monster6_tr.png",
	            	           		 colori:  [[244, 110, 0],[121, 63, 63],[98, 69, 146]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m7",
	            	           		 nome:	 		"w3m7",
	            	           		 immagine:		"images/mostri/w3_monster7.png",
	            	           		 contorno:		"images/mostri/w3_monster7_tr.png",
	            	           		 colori:  [[202, 130, 95],[150, 52, 5],[14, 206, 226],[226, 85, 14]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m8",
	            	           		 nome:	 		"w3m8",
	            	           		 immagine:		"images/mostri/w3_monster8.png",
	            	           		 contorno:		"images/mostri/w3_monster8_tr.png",
	            	           		 colori:  [[229, 166, 244],[18, 185, 136],[218, 88, 18],[18, 118, 177],[219, 148, 18]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w3m9",
	            	           		 nome:	 		"w3m9",
	            	           		 immagine:		"images/mostri/w3_monster9.png",
	            	           		 contorno:		"images/mostri/w3_monster9_tr.png",
	            	           		 colori:  [[41, 171, 226],[134, 129, 134],[231, 135, 88]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w3m10",
	            	           		 nome:	 		"w3m10",
	            	           		 immagine:		"images/mostri/w3_monster10.png",
	            	           		 contorno:		"images/mostri/w3_monster10_tr.png",
	            	           		 colori:  [[171, 168, 171],[87, 150, 180],[157, 120, 110]]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 4
	               {
	            	   codice:			"w4",
	            	   index:			"3",
	            	   nome:			"mondo4",
	            	   sfondo:			"images/sfondi/sfondo4.png",
	            	   immagine:		"images/sezioni/sec4presentation.png",
	            	   immagineBlocked: "images/sezioni/sec4locked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w4m1",
	            	           		 nome:	 		"w4m1",
	            	           		 immagine:		"images/mostri/w4_monster1.png",
	            	           		 contorno:		"images/mostri/w4_monster1_tr.png",
	            	           		 colori:  [[177, 198, 229],[201, 148, 174],[255, 204, 77]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m2",
	            	           		 nome:	 		"w4m2",
	            	           		 immagine:		"images/mostri/w4_monster2.png",
	            	           		 contorno:		"images/mostri/w4_monster2_tr.png",
	            	           		 colori:  [[226, 199, 10],[73, 79, 98],[231, 83, 33]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m3",
	            	           		 nome:	 		"w4m3",
	            	           		 immagine:		"images/mostri/w4_monster3.png",
	            	           		 contorno:		"images/mostri/w4_monster3_tr.png",
	            	           		 colori:  [[204, 62, 23],[126, 40, 12],[135, 213, 45]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m4",
	            	           		 nome:	 		"w4m4",
	            	           		 immagine:		"images/mostri/w4_monster4.png",
	            	           		 contorno:		"images/mostri/w4_monster4_tr.png",
	            	           		 colori:  [[191, 209, 134],[54, 92, 26],[121, 86, 134],[236, 80, 107],[158, 86, 62]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m5",
	            	           		 nome:	 		"w4m5",
	            	           		 immagine:		"images/mostri/w4_monster5.png",
	            	           		 contorno:		"images/mostri/w4_monster5_tr.png",
	            	           		 colori:  [[255, 95, 6],[70, 224, 224]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m6",
	            	           		 nome:	 		"w4m6",
	            	           		 immagine:		"images/mostri/w4_monster6.png",
	            	           		 contorno:		"images/mostri/w4_monster6_tr.png",
	            	           		 colori:  [[250, 161, 255],[148, 204, 255],[112, 115, 161],[207, 255, 135]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m7",
	            	           		 nome:	 		"w4m7",
	            	           		 immagine:		"images/mostri/w4_monster7.png",
	            	           		 contorno:		"images/mostri/w4_monster7_tr.png",
	            	           		 colori:  [[165, 175, 181],[155, 67, 48],[64, 121, 155]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m8",
	            	           		 nome:	 		"w4m8",
	            	           		 immagine:		"images/mostri/w4_monster8.png",
	            	           		 contorno:		"images/mostri/w4_monster8_tr.png",
	            	           		 colori:  [[244, 198, 3],[56, 56, 56],[244, 97, 3],[125, 149, 168]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w4m9",
	            	           		 nome:	 		"w4m9",
	            	           		 immagine:		"images/mostri/w4_monster9.png",
	            	           		 contorno:		"images/mostri/w4_monster9_tr.png",
	            	           		 colori:  [[78, 198, 34],[77, 142, 175],[198, 75, 34]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w4m10",
	            	           		 nome:	 		"w4m10",
	            	           		 immagine:		"images/mostri/w4_monster10.png",
	            	           		 contorno:		"images/mostri/w4_monster10_tr.png",
	            	           		 colori:  [[95, 198, 211],[211, 194, 116],[160, 69, 87]]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE 5
	               {
	            	   codice:			"w5",
	            	   index:			"4",
	            	   nome:			"mondo5",
	            	   sfondo:			"images/sfondi/sfondo5.png",
	            	   immagine:		"images/sezioni/sec5presentation.png",
	            	   immagineBlocked: "images/sezioni/sec5locked.png",
	            	   livelli:	[
	            	           	 {
	            	           		 codice: 		"w5m1",
	            	           		 nome:	 		"w5m1",
	            	           		 immagine:		"images/mostri/w5_monster1.png",
	            	           		 contorno:		"images/mostri/w5_monster1_tr.png",
	            	           		 colori:  [[79, 133, 213],[132, 216, 75],[247, 25, 115]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m2",
	            	           		 nome:	 		"w5m2",
	            	           		 immagine:		"images/mostri/w5_monster2.png",
	            	           		 contorno:		"images/mostri/w5_monster2_tr.png",
	            	           		 colori:  [[117, 193, 58],[205, 177, 61]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m3",
	            	           		 nome:	 		"w5m3",
	            	           		 immagine:		"images/mostri/w5_monster3.png",
	            	           		 contorno:		"images/mostri/w5_monster3_tr.png",
	            	           		 colori:  [[216, 97, 219],[251, 63, 201],[176, 139, 251]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m4",
	            	           		 nome:	 		"w5m4",
	            	           		 immagine:		"images/mostri/w5_monster4.png",
	            	           		 contorno:		"images/mostri/w5_monster4_tr.png",
	            	           		 colori:  [[82, 199, 239],[239, 121, 82],[213, 151, 0]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m5",
	            	           		 nome:	 		"w5m5",
	            	           		 immagine:		"images/mostri/w5_monster5.png",
	            	           		 contorno:		"images/mostri/w5_monster5_tr.png",
	            	           		 colori:  [[242, 186, 28],[165, 83, 3],[165, 97, 160]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m6",
	            	           		 nome:	 		"w5m6",
	            	           		 immagine:		"images/mostri/w5_monster6.png",
	            	           		 contorno:		"images/mostri/w5_monster6_tr.png",
	            	           		 colori:  [[206, 118, 74],[129, 62, 34],[101, 130, 34]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m7",
	            	           		 nome:	 		"w5m7",
	            	           		 immagine:		"images/mostri/w5_monster7.png",
	            	           		 contorno:		"images/mostri/w5_monster7_tr.png",
	            	           		 colori:  [[188, 94, 164],[111, 67, 100],[134, 196, 193],[206, 173, 162]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m8",
	            	           		 nome:	 		"w5m8",
	            	           		 immagine:		"images/mostri/w5_monster8.png",
	            	           		 contorno:		"images/mostri/w5_monster8_tr.png",
	            	           		 colori:  [[209, 137, 21],[217, 190, 65],[134, 103, 96],[209, 68, 21]]
	            	           	 },
	            	           	{
	            	           		 codice: 		"w5m9",
	            	           		 nome:	 		"w5m9",
	            	           		 immagine:		"images/mostri/w5_monster9.png",
	            	           		 contorno:		"images/mostri/w5_monster9_tr.png",
	            	           		 colori:  [[232, 86, 86],[112, 170, 124],[54, 88, 112]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"w5m10",
	            	           		 nome:	 		"w5m10",
	            	           		 immagine:		"images/mostri/w5_monster10.png",
	            	           		 contorno:		"images/mostri/w5_monster10_tr.png",
	            	           		 colori:  [[242, 104, 39],[79, 86, 229],[127, 32, 0],[242, 221, 156]]
	            	           	 }
	            	           	 ]
	               },
	               //### SEZIONE BONUS
	               {
	            	   codice:			"wb",
	            	   index:			"5",
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
	            	           		 colori:  [[53, 53, 68],[193, 0, 0],[255, 255, 255],[132, 103, 73]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm2",
	            	           		 nome:	 		"wbm2",
	            	           		 immagine:		"images/mostri/wb_monster2.png",
	            	           		 contorno:		"images/mostri/wb_monster2_tr.png",
	            	           		 colori:  [[77, 117, 140],[243,251,255],[252,167,196]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm3",
	            	           		 nome:	 		"wbm3",
	            	           		 immagine:		"images/mostri/wb_monster3.png",
	            	           		 contorno:		"images/mostri/wb_monster3_tr.png",
	            	           		 colori:  [[147,71,45],[249,192,192],[223,154,38]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm4",
	            	           		 nome:	 		"wbm4",
	            	           		 immagine:		"images/mostri/wb_monster4.png",
	            	           		 contorno:		"images/mostri/wb_monster4_tr.png",
	            	           		 colori:  [[88, 149, 204],[99,158,151],[114,128,168],[77,94,87]]
	            	           	 },
	            	           	 {
	            	           		 codice: 		"wbm5",
	            	           		 nome:	 		"wbm5",
	            	           		 immagine:		"images/mostri/wb_monster5.png",
	            	           		 contorno:		"images/mostri/wb_monster5_tr.png",
	            	           		 colori:  [[54, 59,88],[216,216,216],[255,145,0],[164,96,73]]
	            	           	 }
	            	           	 ]
	               }
	               ];

	//Il nostro oggetto da esporre
	var mod = {
		 getSezioni: function(){
				return sezioni;
		 },
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
			 if(index < this.getSectionCount()) {
				 return sezioni[index];
			 }else return undefined;
		 },
		 isSectionUnlocked: function(section) {
			 //la prima sezione e il bonus sono sempre sbloccate
			 if(section.codice=="w1" || section.codice=="wb") return true;
			 var unlocked = INVENKTION.StorageManager.getItem(section.codice+"_unlocked");
			 if(unlocked == "true") return true;
			 else return false;
		 },
		 //Restituisce il livello di una specifica sezione dato il suo numero
		 getSectionLevel: function(section,index) {
			 return section.livelli[index];
		 },
		 isLevelUnlocked: function(level) {
			 //Il primissimo livello è sempre sbloccato
			 if(level.codice=="w1m1") return true;
			 var unlocked = INVENKTION.StorageManager.getItem(level.codice+"_unlocked");
			 if(unlocked == "true") return true;
			 else return false;
		 },
		 unlockLevel: function(level) {
			 INVENKTION.StorageManager.setItem(level.codice+"_unlocked", "true");
		 },
		 unlockSection: function(sec) {
			 INVENKTION.StorageManager.setItem(sec.codice+"_unlocked", "true");
		 },
		 unlockNextLevel: function(lev,sec) {
			 //se bonus non sblocco nulla
			 if(sec.codice == "wb") return;
			 //Se il livello è l'ultimo della sezione controllo se c'è una sezione successiva
			 //nel caso positivo sblocco la sezione nuova e il suo primo livello
			 if(sec.livelli[sec.livelli.length-1].codice == lev.codice) {
				 console.log("Ultimo livello della sezione, devo sbloccare la sezione successiva...");
				 var numSection = this.getSectionCount();
				 for(var i=0; i<numSection; i++) {
					 var s = this.getSection(i);
					 if(s.codice == sec.codice) {
						 //ok è la sezione corrente
						 //prendo la successiva se esiste
						 var nextSection = this.getSection(i+1);
						 if(nextSection) {//se esiste sblocco anche il suo primo livello oltre a lei
							 this.unlockSection(nextSection);
							 //se è la sezione bonus non sblocco il primo livello
							 if(nextSection.codice !="wb"){
								 var firstLevel = this.getSectionLevel(nextSection, 0);
								 this.unlockLevel(firstLevel);
							 }
						 }
					 }
				 }
			 }else {
				 //Se non è l'ultimo sblocco il livello successivo e basta
				 var numLevel = this.getSectionLevelCount(sec);
				 for(var i=0; i<numLevel; i++) {
					 var l = this.getSectionLevel(sec,i);
					 if(l.codice == lev.codice) {
						 //ok è il livello corrente
						 //prendo il successivo
						 var nextLevel = this.getSectionLevel(sec,i+1);
						 if(nextLevel) {//se esiste sblocco
							 this.unlockLevel(nextLevel);
						 }
					 }
				 }
			 }
			 //Check 3 stelle su tutti i livelli per sbloccare il quadro bonus
			 var sectionStars = this.getSectionTotalStars(sec);
			 if(parseInt(sectionStars) == parseInt(this.getSectionLevelCount(sec))*3) {
				 var index = sec.index;
				 this.unlockBonus(index);
			 }
		 },
		 getLevelBestResult: function(level) {
			 var percentage = INVENKTION.StorageManager.getItem(level.codice+"_best");
			 if(!percentage) return "0";
			 else return percentage;
		 },
		 setLevelBestResult: function(level, percentage) {
			 //Aggiorno se e solo se il risultato è migliore di quello esistente
			 var currentBest = parseInt(this.getLevelBestResult(level));
			 if(currentBest < parseInt(percentage)) {
				 INVENKTION.StorageManager.setItem(level.codice+"_best", percentage);
			 }
		 },
		 getLevelStars: function(section, level) {
			 var stars =  INVENKTION.StorageManager.getItem("star_"+section.codice+"_"+level.codice);
			 if(!stars) stars = "0";
			 return stars;
		 },
		 setLevelStars: function(section, level, stars) {
			 //Aggiorno se e solo se il risultato è migliore di quello esistente
			 var currentStars = parseInt(this.getLevelStars(section, level));
			 if(currentStars < parseInt(stars)) {
				 INVENKTION.StorageManager.setItem("star_"+section.codice+"_"+level.codice,""+stars);
			 }
		 },
		 getSectionTotalStars: function(section) {
			 var total = 0;
			 var numLevels = this.getSectionLevelCount(section);
			 for(var i=0; i<numLevels; i++) {
				 var lev = this.getSectionLevel(section, i);
				 var levStars = this.getLevelStars(section, lev);
				 total += parseInt(levStars);
			 }
			 
			 return total;
		 },
		 unlockBonus: function(index) {
			 var bonusSection = this.getSection(5);
			 var level = bonusSection.livelli[parseInt(index)];
			 if(level) {
				 this.unlockLevel(level);
			 }
		 }
	};

	//Espongo nel global object
	exports.INVENKTION.LevelManager = mod;
})(jQuery, window);
	