const endpoint = "https://script.google.com/macros/s/AKfycbxd1MJT1LHvbfUSH80n-Nk6sresNbwFfRRTp4nB48aTLioBymHc9ZRFw5D2N-sENjWD/exec";
/* ==========================
   20 SORULUK ENNEAGRAM TESTİ SORULARI
   ========================== */
//let accessCodeInput; // Test kodu input'u burada tutulacak

const questions = [
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İnsanların duygularını hemen hissederim ve bu bana ağır gelebilir.", type: 2 },
      { text: "Doğruyu yapmaya çalışırım; fakat bazen bu konuda kendimi çok zorlarken bulurum.", type: 1 },
      { text: "Her şeyi sakin sakin incelerim ama detaylarda kaybolabilirim.", type: 5 },
      { text: "Güven benim için temel bir ihtiyaçtır; belirsizlikte hemen huzursuzlaşırım.", type: 6 },
      { text: "Huzuru korumaya yatkınım; fakat bu uğurda kendi ihtiyaçlarımı unutabilirim.", type: 9 },
      { text: "Duygularım derindir; zorlandığımda içime kapanmaya eğilim gösteririm.", type: 4 },
      { text: "Yeni olan şeyler beni heyecanlandırır ama ilgim kısa sürede başka bir şeye kayabilir.", type: 7 },
      { text: "Kendimi fazla zorladığımı fark ettiğim anlar olur; çünkü hedefe çok çabuk kitlenebilirim.", type: 3 },
      { text: "Kararlı duruşum bana güç verir ama sert algılanmama da yol açabilir.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Ortamı yumuşatmaya çalışırken kendi ihtiyaçlarımdan ödün verebilirim.", type: 9 },
      { text: "Ne hissediyorsam doğrudan ifade ederim; bu da güçlü bir duruş yaratır.", type: 8 },
      { text: "Enerjim ilişkilerimi canlandırır ama hızım bazen yüzeysellik yaratır.", type: 7 },
      { text: "Her ihtimali kontrol etmeye çalıştığım için kolayca yorulurum.", type: 6 },
      { text: "Kendi alanımı severim ama fazla mesafe koyunca insanların uzaklaştığını hissederim.", type: 5 },
      { text: "Özgün biçimde kendimi ifade ederim; görülmediğimi hissettiğimde içe çekilebilirim.", type: 4 },
      { text: "Hızla işe koyulurum; ancak bu tempo imaj kaygımı artırabilir.", type: 3 },
      { text: "İnsanlara yakın davranırım; karşılık alamadığımda ise çabuk incinirim.", type: 2 },
      { text: "Sorumluluk bilincim yüksektir ama bu durum bazen beni sıkıştırır.", type: 1 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Öne çıkma isteğim yüzünden rekabetçi görünebilirim.", type: 3 },
      { text: "Yeni fikirleri hızla kavrarım ama zihinsel yoğunluk beni insanlardan uzaklaştırabilir.", type: 5 },
      { text: "Adalet duygum güçlüdür; ancak standartlarım yükseldikçe insanlara yaklaşmam zorlaşır.", type: 1 },
      { text: "Başladıklarımı bitirmekte zorlanıyorum; çünkü merakım beni sürekli yeni şeylere itiyor.", type: 7 },
      { text: "Geri çekildiğimi fark ettiğimde anlıyorum ki huzuru korumaya fazla odaklanmışım.", type: 9 },
      { text: "İnsanların iyi yanını görmeye eğilimliyim; bu da bazen sorunları küçümsememe yol açar.", type: 2 },
      { text: "Bağlı olduğum insanları desteklerim ama aşırı bağlılığım eleştirel düşüncemi zayıflatabilir.", type: 6 },
      { text: "İç sesime fazla kapıldığımda çevreyle bağımın zayıfladığını fark ederim.", type: 4 },
      { text: "Baskı yarattığım söylenir; çünkü yön vermek için net bir tavır sergilerim.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Dikkat çekmeyi ve öne çıkmayı severim; fakat bu bazen gösteriş gibi algılanabilir.", type: 3 },
      { text: "Kendimi özgün biçimde ifade ettiğimde farkında olmadan mesafe koyabiliyorum.", type: 4 },
      { text: "Sevdiklerimi güçlü biçimde sahiplenirim; bu tavrım zaman zaman baskın algılanabilir.", type: 8 },
      { text: "İnsanları yüreklendirmeyi severim ama bu ilgim bazen beklentiye dönüşebilir.", type: 2 },
      { text: "Bir konuya derinlemesine daldığımda çevreyle arama mesafe koyduğumu fark ederim.", type: 5 },
      { text: "Kendi görüşümün kaybolduğunu hissederim; çünkü insanları bir araya getirmeye odaklanırım.", type: 9 },
      { text: "Çevrem bazen beni zorlayıcı bulur; çünkü tutarlılık ve yüksek standart benim için önemlidir.", type: 1 },
      { text: "Birçok alana ilgi duyarım ama bu genişlik odaklanmamı zorlayabilir.", type: 7 },
      { text: "Görevleri sahiplenirim; fakat bu sorumluluk beni zaman zaman fazla yorar.", type: 6 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "En iyisini yapmaya çalıştığım için çoğu zaman bana fazla yük biner.", type: 1 },
      { text: "En iyimi vermek beni motive eder ama istediğim takdiri göremezsem huzursuz olurum.", type: 3 },
      { text: "İnsanlara destek olmayı severim; fakat bu beni kolayca tüketebilir.", type: 2 },
      { text: "Genelde herkesin rahat edeceği yolu seçerim; çünkü ne istediğime karar vermekte zorlanırım.", type: 9 },
      { text: "Duygularımı yoğun ve açık bir şekilde ifade ederim ama bu bazen abartılı görünebilir.", type: 4 },
      { text: "Baskıcı göründüğüm olur; çünkü insanları kararlı biçimde savunurum.", type: 8 },
      { text: "Çabuk heyecanlanırım; fakat aynı hızla ilgimi kaybedebilirim.", type: 7 },
      { text: "Benimsediğim konulara bağlıyım; bazen güven duyduğum için fazla sorgulamayabilirim.", type: 6 },
      { text: "Bağımsız düşünmeyi severim ama bu tavrım yüzünden uyumsuz görünebilirim.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Sabrım çabuk taşabilir; çünkü, gerginleştiğimde düzene fazla önem veririm.", type: 1 },
      { text: "İçten yaklaşırım; ancak duygularım yoğunlaştığında kendi sınırlarımı korumakta zorlanırım.", type: 2 },
      { text: "Güçlü görünmek isterim; bu yüzden zayıflığımı açmakta zorlanırım.", type: 3 },
      { text: "Zengin hayal dünyam beni besler; ancak yoğunluğu duygusal dalgalanmalar yaratabilir.", type: 4 },
      { text: "Bilgiyi derinlemesine işlediğim için karar vermem bazen yavaşlar.", type: 5 },
      { text: "Adım atmakta geciktiğim olur; çünkü her ihtimali önceden düşünmek isterim.", type: 6 },
      { text: "Zor duygularla yüzleşmekten kaçınırım; bu yüzden olumlu kalmaya çalışırım.", type: 7 },
      { text: "Güçlü durmayı seçerim ama duygularımı fazla saklayınca yanlış anlaşılabilirim.", type: 8 },
      { text: "Bir işe başlamak isterim ama motive olmam bazen gecikir.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İnsanlara yoğun ilgi göstermem bağ kurmamı kolaylaştırır ama aşırısı kendi ihtiyaçlarımı unutturabilir.", type: 2 },
      { text: "Gereksiz detaylara takıldığım anlar olur; çünkü estetik arayışım çoğu şeyde baskın gelir.", type: 4 },
      { text: "Planlı ve analitik düşündüğümde iyi hazırlanırım; fakat fazla kurguladığımda harekete geçmem zorlaşır.", type: 5 },
      { text: "Çalışkanlığım bana ilerleme getirir ama yoğun tempo sonunda beni tüketebilir.", type: 3 },
      { text: "Hiçbir şeyi yeterli bulmadığım zamanlar olur; çünkü idealist yaklaşırım.", type: 1 },
      { text: "Otoriteyle uyum ararım; bu bana güven verirken karar süreçlerimi yavaşlatabilir.", type: 6 },
      { text: "Kendi isteklerimi geri plana attığımı fark ederim; çünkü rollere uyum sağlamak bana daha kolay gelir.", type: 9 },
      { text: "Maceracı yanım bana enerji katar; ancak sürekli yenilik peşinde koşmak derinleşmemi zorlaştırır.", type: 7 },
      { text: "Duygusal boyutu gözden kaçırabildiğim olur; çünkü hedefe odaklandığımda ilerlemeyi öncelerim.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Hayal gücüm genişlediğinde gerçeklikten uzaklaşabilirim.", type: 4 },
      { text: "Nasıl olması gerektiğini söylemem bana doğal gelir ama katı görünmeme de neden olur.", type: 1 },
      { text: "Netlik arayışım duygularımla arama mesafe koyar; bu bazen kopukluk hissi yaratır.", type: 5 },
      { text: "Ne istediğimi netleştirmekte zorlandığım için sonunda başkalarının yönüne uyum sağlarım.", type: 9 },
      { text: "Tetikte oluşum beni hazırlıklı kılar ama bu beklenti bazen huzurumu bozar.", type: 6 },
      { text: "Risk alıp yoğun çalıştığım için duygusal ihtiyaçlarımı ihmal ederim.", type: 8 },
      { text: "Rahatsız eden durumlardan çabuk uzaklaşırım; bu tutum enerjimi korusa da bazı konularla yüzleşmeyi erteleyebilir.", type: 7 },
      { text: "Başarısızlık korkum beni çalıştırır ama aynı korku cesaretimi kırabilir.", type: 3 },
      { text: "Sevgiye önem veririm ama fazlası beni kırılganlaştırır.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Pragmatik yapım işleri hızlandırır ama duygularımı geri plana iter.", type: 3 },
      { text: "Duygularımı derin yaşarım; bu yoğunluk beni zamanla yorabilir.", type: 4 },
      { text: "Karmaşık fikirlere dalarım; bu yüzden mesafeli görünebilirim.", type: 5 },
      { text: "Sorumluluk alırım ama fazla olduğunda içten bir direnç hissederim.", type: 6 },
      { text: "Sakinliğim huzur verir ama dalgınlaşıp çevremdekileri kaçırırım.", type: 9 },
      { text: "Kontrol gücüm yüksektir; fakat bu baskıcı görünmeme neden olur.", type: 8 },
      { text: "Hareketliliğim enerji verir ama ne istediğimi karıştırabilirim.", type: 7 },
      { text: "Planım bozulduğunda kolayca gerilirim; uyum sağlamak zannettiğimden daha zor gelir.", type: 1 },
      { text: "İhtiyaç duyulmak bana değerli hissettirir; ancak bazen başkalarının onayına bağımlı kalabilirim.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Bağımsız kalmak bana iyi gelir; bazen bu hal pasif görünmeme neden olur.", type: 9 },
      { text: "Güçlü durmaya çalışırım; fakat kontrolü abarttığımda ilişkilerim zorlanabilir.", type: 8 },
      { text: "İsteklerimin peşinden hızla giderim; bazen durup düşünmeden hareket edebilirim.", type: 7 },
      { text: "Sevdiklerime bağlılığım yüksektir; bu bağlılık bazen bağımlı hissetmeme yol açar.", type: 6 },
      { text: "Düzenli ve dakik olmam işimi kolaylaştırır ama bazen katı ve işkolik görünebilirim.", type: 1 },
      { text: "Onay bana iyi gelir; fakat fazlası beni kendim olmaktan uzaklaştırır.", type: 2 },
      { text: "Eleştiri aldığımda hemen savunmaya geçerim; çünkü gelişme isteğim yüksektir.", type: 3 },
      { text: "Derin hissettiğim için içe kapanırım; bu da beni genelde çekingen gösterir.", type: 4 },
      { text: "Zihinsel kurgularım bakış açımı genişletir; aşırısı gerçeklerle arama mesafe koyabilir.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Disiplin bana güç verse de, bazen eğlenmek için bile kendime izin vermekte zorlanırım.", type: 1 },
      { text: "Kurallara uymak hedefime ulaştırır; fakat özgün yanım geri plana düşebilir.", type: 3 },
      { text: "Sıra dışı bilgileri merak ederim ama bu ilgi beni gerçeklerden koparır.", type: 5 },
      { text: "İç dünyam güçlüdür; duygularımı içimde tuttuğumda yalnız hissedebilirim.", type: 4 },
      { text: "Hareketlilik beni canlı tutar; fakat durağanlığa gelince sıkışmış hissederim.", type: 7 },
      { text: "Endişem beni dikkatli yapar ama bu çelişkili görünmeme neden olabilir.", type: 6 },
      { text: "Koruyucu duruşum çevreme güven verir; fakat otoriter bir izlenime de dönüşebilir.", type: 8 },
      { text: "Destek olmak beni besler; fakat karşılık beklediğim anlar da olur.", type: 2 },
      { text: "Zihinsel kaçışım kısa bir rahatlık sağlar ama çözümü biraz daha erteler.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Pratik işlere zor uyum sağlasam da, bu yönüm bana düşünsel alan bırakır.", type: 5 },
      { text: "Sorumluluklarımı sahiplenirim ama fazla yük üstlenince kolayca yorulurum.", type: 6 },
      { text: "Fikir üretmek bana heyecan verir, fakat sürdüremediğimde bazen dağılırım.", type: 7 },
      { text: "Kendime güvenim liderlik sağlar ama bu tavır yüzünden baskın görünebilirim.", type: 8 },
      { text: "Zihinsel dağınıklığım beni esnek kılar ama çoğu zaman uyuma yöneltir.", type: 9 },
      { text: "Özgünlüğümü korumak beni besler; ancak buna fazla tutunursam çevremden uzaklaşırım.", type: 4 },
      { text: "Başkaları için çabalamak bana iyi gelir, ne var ki bazen sınırlarımı kolayca unuturum.", type: 2 },
      { text: "İçimdeki ‘doğru olma’ ihtiyacı, duygularımı dizginlememe ve gerginlik yaşamama neden olur.", type: 1 },
      { text: "Yoğun çalışmak üretkenliğimi artırır; ancak bu tempo hislerimi geride bırakır.", type: 3 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Eleştirelliğim işleri iyileştirir ama aşırısı beni hoşgörüsüz yapabilir.", type: 1 },
      { text: "Yardım etmeye hızlıca yönelirim; karşılık görmeyince içten içe kırılabilirim.", type: 2 },
      { text: "Kendimi iyi sunmak avantaj sağlar ama aşırısı içimde boşluk yaratır.", type: 3 },
      { text: "Özgün olmak benim için anlamlıdır; buna fazla tutunduğumda kırılganlık hissi yaşayabilirim.", type: 4 },
      { text: "Zihinsel dünyam geniştir; bir konuya daldığımda farklı fikirlere kapanabilirim.", type: 5 },
      { text: "Güvenilirim; ancak tehdit hissedersem tepkilerim kolayca sertleşir.", type: 6 },
      { text: "Seçenekleri sorgulamam ufkumu açar ama odağımı çabuk dağıtır.", type: 7 },
      { text: "Kararlı duruşum beni güçlü kılar; bu kararlılık bazen esnememi zorlaştırabilir.", type: 8 },
      { text: "Motivasyonum geç gelir; o yüzden işe başlamakta zorlanırım.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Vazgeçilmez hissetmek bana değer verir ama beni bazen onay bağımlısı kılabilir.", type: 2 },
      { text: "Hayal dünyam bana ilham olur ama aşırısı gerçeklikten uzaklaştırır.", type: 4 },
      { text: "Eleştirel düşüncem berraklık sağlar; ancak baskınlaştığında provokatif görünebilirim.", type: 5 },
      { text: "Ne hissettiğimi anlamakta gecikirim; bu da yönümü bulmamı zorlaştırır.", type: 9 },
      { text: "Güçlü durmak kolay gelir ama yumuşak tarafımı göstermek zorlayabilir.", type: 8 },
      { text: "Heyecanım hızla yükselir; aynı hızla sönmesi yönümü sık değiştirmeme yol açabilir.", type: 7 },
      { text: "Sorunlarımı başkalarına danışmak beni rahatlatır; fakat sorumluluk almamı geciktirebilir.", type: 6 },
      { text: "Sağlam fikirlerim yol gösterir; ne var ki bazen ısrarım ilişkilerde gerilim yaratabilir.", type: 1 },
      { text: "Kariyere odaklanmak başarı sağlar ama aşırısı özel hayatımı gölgeleyebilir.", type: 3 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Kendi önceliklerimi belirlemekte zorlanırım; hedeflerim kolayca dağılır.", type: 9 },
      { text: "Neşem ortamı hafifletir ama ciddi görünmemi de engeller.", type: 7 },
      { text: "İşe yarar ve güçlü kalmak için bedenime dikkat ederim; bu çaba bazen içsel huzursuzluk yaratır.", type: 2 },
      { text: "Hassas yapım bana duygusal derinlik katar; bu hassasiyet arttığında içe çekilme eğilimim güçlenir.", type: 4 },
      { text: "İrademe güvenirim ama bu kararlılığım bazen inada kayabilir.", type: 8 },
      { text: "Beklentilerimi net koyarım; buna rağmen sabırsızlığım uyumu zorlaştırır.", type: 1 },
      { text: "Saygı ve itibar arayışım beni motive eder ve aşırısı onay bağımlılığı yaratabilir.", type: 3 },
      { text: "Seçici olmak beni güvende hissettirir; aşırıya kaçtığında ilişkilerimde güvensizlik oluşabilir.", type: 6 },
      { text: "Duygularımı geri planda tutarım; bu yüzden ne hissettiğimi anlamakta zorlanabilirim.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Analitik yanım bana netlik sağlar ama bazen mesafe de yaratır.", type: 5 },
      { text: "İyi görünmeye çalıştığım anlarda motive olurum; yine de içtenliğim ikinci plana düşebilir.", type: 3 },
      { text: "Enerjim yüksektir; ancak yenilik arzum derinleşmemi zorlaştırır.", type: 7 },
      { text: "İlgi göstermem sıcaklık yaratır ama aynı tavır kibir gibi de anlaşılabilir.", type: 2 },
      { text: "Düzene bağlılığım işi toparlar; fakat fazla bastırırsam insanları bunaltabilirim.", type: 1 },
      { text: "Gücümü ortaya koymak kolaydır; ancak abarttığımda çevremi korkutabilirim.", type: 8 },
      { text: "Sorunların kendiliğinden çözüleceğini umarım; bu da adım atmamı geciktirir.", type: 9 },
      { text: "Otoriteden çekinmem beni temkinli kılar; fakat kaygım kontrolcü davranmama yol açabilir.", type: 6 },
      { text: "Özgünlüğüm ruhumu besler; buna kapıldığımda gündelik akıştan kopabilirim.", type: 4 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İşleri net kurallarla yürütürüm; ne var ki bu tutum esnememi zorlaştırır.", type: 1 },
      { text: "Hayal gücüm zihnimi açar; fakat yoğunlaştığında gerçeklik bulanıklaşır.", type: 5 },
      { text: "Gerginlik hissettiğim anda uyum yolunu seçerim; bu da beni silik hissettirebilir.", type: 9 },
      { text: "Kontrole direnmem bana özgürlük verir; fakat dozunu aşarsam acımasız görünürüm.", type: 8 },
      { text: "Pozitif kalmak enerjimi yükseltir; yine de kaygılandığımda hislerimi hızla bastırırım.", type: 7 },
      { text: "Sorumluluk duygum bana güven verir; ancak güvensiz hissettiğimde paniğe kapılabilirim.", type: 6 },
      { text: "Başarılarımı paylaşınca motive olurum ama bu dışarıdan övünmek gibi durabilir.", type: 3 },
      { text: "İçime dönmek beni besler; yalnız uzun sürerse kendime yüklenmeye başlarım.", type: 4 },
      { text: "Yaptıklarımı hatırlatmak beni değerli hissettirir; fakat bu, karşılık bekliyormuşum gibi görünebilir.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Zengin iç dünyam beni derinleştirir; ancak zorlanınca kendimi geri çekerim.", type: 4 },
      { text: "Yüksek standartlarım kaliteyi artırır; fakat aşırısı çevremde sürekli kusur görmeme neden olur.", type: 1 },
      { text: "Tükenmişlik bana mola ihtiyacımı gösterir; ancak sorunlardan uzaklaşmama yol açabilir.", type: 9 },
      { text: "Savunmasız hissetmem beni dikkatli kılar; fakat bu duygu kaygımı kolayca artırabilir.", type: 6 },
      { text: "Olumlu kalmak bana enerji verir ama rahatsızlık hissedersem hemen kaçınırım.", type: 7 },
      { text: "Duygularımı gizlediğimde güçlenirim; gizledikçe ilişkilerimde mesafe oluşur.", type: 8 },
      { text: "Empatim güçlüdür; fakat aşırısı kendi sınırlarımı korumamı zorlaştırabilir.", type: 2 },
      { text: "Elit bir imaj yaratma isteğim bana prestij sağlar; öte yandan bu tavır yapay görünmeme neden olabilir.", type: 3 },
      { text: "Radikal fikirler üretirim; hatta bazen sınırları fazla zorlarım.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Yoğun deneyimler aramam bana heyecan verir; fakat aşırısı beni kolayca yıpratabilir.", type: 7 },
      { text: "Başkaldırışım bana özgürlük sağlar; bu duruşum otoriteyle çatışma yaratabilir.", type: 8 },
      { text: "Uyumu korumaya çalışırken rahatsızlık hissettiğimde pasifçe direnirim.", type: 9 },
      { text: "Destek aldığımda güçlenirim; fakat aşırısı kendi çözüm üretme gücümü zayıflatır.", type: 6 },
      { text: "Temkinli oluşum beni dengeler; aşırı düşününce duygularım dalgalanabilir.", type: 5 },
      { text: "İçsel yoğunluğum bana özgünlük katar; fakat zorlandığımda duygularımdan uzaklaşabilirim.", type: 4 },
      { text: "Kuralları esnetmek ilerlememi hızlandırır ama bu tutum güvenilirliğimi zedeleyebilir.", type: 3 },
      { text: "İlgim insanlara kendini değerli hissettirir; fakat beklentim arttığında kırıcı görünebilirim.", type: 2 },
      { text: "Eleştirel tavrım mükemmelliğimi destekler ve hoşgörüsüz de algılanabilirim.", type: 1 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden sadece üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      {text: "İkna yeteneğim bağ kurmamı kolaylaştırır; karşılık aradığımda yapay görünebilirim.", type: 2 },
      { text: "Kararlılığım bana güç verir; abarttığımda kendi istediğimin olmasını zorlayabilirim.", type: 8 },
      { text: "Disiplinim güven verir; öte yandan bu tavır çevremi zorlayabilir.", type: 1 },
      { text: "Kendimi kanıtlamak özgüvenimi artırır; fakat takdir görmezsem huzursuz olurum.", type: 3 },
      { text: "Rahatlığım bana sakinlik verir; ancak aşırısı riskleri görmemi zorlaştırır.", type: 9 },
      { text: "Hayallerimin peşinden gitmek beni canlı tutar; fakat sınırsızlık ilişkilerimi zorlayabilir.", type: 7 },
      { text: "Kendimi güvende hissetmediğimde sık sorgularım; bu bazen ilişkilerimi zorlayabilir.", type: 6 },
      { text: "Yalnızlık bana düşünme alanı sunar; ancak fazla uzaklaşmak bağlarımı zayıflatır.", type: 5 },
      { text: "Hassasiyetim beni derinleştirir; fakat utanç duyduğumda kolayca geri çekilirim.", type: 4 }
    ]
  }
];

/* ==========================
   DOM YÜKLENİNCE ÇALIŞAN KISIM
   ========================== */

document.addEventListener("DOMContentLoaded", () => {
  // ====== TOKEN ZORUNLU ======

  // ====== DOM ======
  const introScreen  = document.getElementById("intro-screen");
  const startTestBtn = document.getElementById("start-test-btn");
  const introConsent = document.getElementById("intro-consent");

  const testSection   = document.getElementById("test-section");
  const testContainer = document.getElementById("test-container");
  const navigation    = document.getElementById("navigation");
  const resultDiv     = document.getElementById("result");

  const prevBtn   = document.getElementById("prev-btn");
  const nextBtn   = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  introScreen.style.display = "block";
  testSection.style.display = "none";
  navigation.style.display  = "none";
  resultDiv.style.display   = "none";

  introConsent.addEventListener("change", () => {
    startTestBtn.disabled = !introConsent.checked;
  });

  // ====== STATE ======
  let currentQuestion = 0;
  const answers = questions.map(() => ({ col1: null, col2: null, col3: null }));

  function updateProgress(qIndex) {
    const total = questions.length;
    const current = qIndex + 1;
    const percent = Math.round((current / total) * 100);

    const progressText = document.getElementById("progress-text");
    const progressPercent = document.getElementById("progress-percent");
    const progressFill = document.getElementById("progress-fill");

    if (progressText) progressText.textContent = `Soru ${current} / ${total}`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  function renderQuestion(qIndex) {
    const q = questions[qIndex];
    updateProgress(qIndex);

    testContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("question");

    const p = document.createElement("p");
    p.textContent = `Soru ${qIndex + 1}: ${q.text}`;
    div.appendChild(p);

    const header = document.createElement("div");
    header.classList.add("question-header");
    header.innerHTML = `
      <div class="col-text">İfade</div>
      <div class="col-pref">1. Tercih</div>
      <div class="col-pref">2. Tercih</div>
      <div class="col-pref">3. Tercih</div>
    `;
    div.appendChild(header);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");
    optionsDiv.style.display = "grid";
    optionsDiv.style.gridTemplateColumns = "2fr 1fr 1fr 1fr";
    optionsDiv.style.alignItems = "center";
    optionsDiv.style.rowGap = "8px";

    const saved = answers[qIndex];

    q.options.forEach(opt => {
      const textDiv = document.createElement("div");
      textDiv.textContent = opt.text;

      const input1 = document.createElement("input");
      input1.type = "radio";
      input1.name = `q${qIndex}_col1`;
      input1.value = opt.type;
      if (saved.col1 === opt.type) input1.checked = true;

      const input2 = document.createElement("input");
      input2.type = "radio";
      input2.name = `q${qIndex}_col2`;
      input2.value = opt.type;
      if (saved.col2 === opt.type) input2.checked = true;

      const input3 = document.createElement("input");
      input3.type = "radio";
      input3.name = `q${qIndex}_col3`;
      input3.value = opt.type;
      if (saved.col3 === opt.type) input3.checked = true;

      // aynı satırda sadece 1 seçim (col1/col2/col3)
      const rowInputs = [input1, input2, input3];
      rowInputs.forEach(input => {
        input.addEventListener("change", () => {
          if (!input.checked) return;
          rowInputs.forEach(other => { if (other !== input) other.checked = false; });
        });
      });

      optionsDiv.appendChild(textDiv);
      optionsDiv.appendChild(input1);
      optionsDiv.appendChild(input2);
      optionsDiv.appendChild(input3);
    });

    div.appendChild(optionsDiv);
    testContainer.appendChild(div);

    prevBtn.style.display   = qIndex === 0 ? "none" : "inline-block";
    nextBtn.style.display   = qIndex === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = qIndex === questions.length - 1 ? "inline-block" : "none";
  }

  function saveCurrentAnswers() {
    const qIndex = currentQuestion;

    const col1 = document.querySelector(`input[name="q${qIndex}_col1"]:checked`);
    const col2 = document.querySelector(`input[name="q${qIndex}_col2"]:checked`);
    const col3 = document.querySelector(`input[name="q${qIndex}_col3"]:checked`);

    answers[qIndex].col1 = col1 ? parseInt(col1.value, 10) : null;
    answers[qIndex].col2 = col2 ? parseInt(col2.value, 10) : null;
    answers[qIndex].col3 = col3 ? parseInt(col3.value, 10) : null;
  }

  // ====== TESTE BAŞLA (SADECE TCKN zorunlu) ======
  // ====== TESTE BAŞLA (Ad+Soyad+Email+TCKN zorunlu) ======
startTestBtn.addEventListener("click", () => {
  if (!introConsent.checked) {
    alert("Lütfen bilgilendirme metnini okuduğunuzu onaylayın.");
    return;
  }

  const firstName = (document.getElementById("first-name")?.value || "").trim();
  const lastName  = (document.getElementById("last-name")?.value || "").trim();
  const email     = (document.getElementById("email")?.value || "").trim().toLowerCase();

  if (!firstName || firstName.length < 2) {
    alert("Lütfen adınızı girin.");
    return;
  }
  if (!lastName || lastName.length < 2) {
    alert("Lütfen soyadınızı girin.");
    return;
  }
  if (!email) {
    alert("Lütfen e-posta adresinizi girin.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Lütfen geçerli bir e-posta adresi girin.");
    return;
  }

  introScreen.style.display = "none";
  testSection.style.display = "block";
  navigation.style.display  = "flex";
  resultDiv.style.display   = "none";

  currentQuestion = 0;
  renderQuestion(currentQuestion);
  window.scrollTo({ top: 0, behavior: "smooth" });
});


  nextBtn.addEventListener("click", () => {
    saveCurrentAnswers();
    const a = answers[currentQuestion];
    if (!a.col1 || !a.col2 || !a.col3) {
      alert("Bu soru için 1., 2. ve 3. tercihlerini seçmelisiniz.");
      return;
    }
    currentQuestion++;
    renderQuestion(currentQuestion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    saveCurrentAnswers();
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion(currentQuestion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  submitBtn.addEventListener("click", () => {
    saveCurrentAnswers();

    for (let i = 0; i < answers.length; i++) {
      const a = answers[i];
      if (!a.col1 || !a.col2 || !a.col3) {
        alert(`Lütfen Soru ${i + 1} için 1., 2. ve 3. tercihleri seç.`);
        return;
      }
    }

    const scores = Array(9).fill(0);
    answers.forEach(a => {
      scores[a.col1 - 1] += 5;
      scores[a.col2 - 1] += 3;
      scores[a.col3 - 1] += 1;
    });

    const scoresWithTypes = scores
      .map((score, index) => ({ type: index + 1, score }))
      .sort((a, b) => b.score - a.score);

    const top3 = scoresWithTypes.slice(0, 3);

    testContainer.innerHTML = "";
    navigation.style.display = "none";

    const top3Html = top3.map(t => `<li>Tip ${t.type} — Puan: ${t.score}</li>`).join("");
    const allScoresHtml = scores.map((s, i) => `<li>Tip ${i + 1} — Puan: ${s}</li>`).join("");

    resultDiv.innerHTML = `
      <h2>Test Sonuçlarınız</h2>
      <p>Testi tamamladığınız için teşekkürler.</p>

      <h3>En Yüksek Puanlı 3 Tip</h3>
      <ul class="score-list">${top3Html}</ul>

      <h3>Tüm Tip Puanların</h3>
      <ul class="score-list">${allScoresHtml}</ul>

      <p style="margin-top: 16px; font-size: 14px; font-weight: 600;">
        📩 Detaylı raporunuz birkaç dakika içinde e-posta adresinize gönderilecektir.
      </p>
    `;
    resultDiv.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ====== GOOGLE SHEETS'e kaydet (email token'dan bulunacak) ======
    
const firstName = (document.getElementById("first-name")?.value || "").trim();
const lastName  = (document.getElementById("last-name")?.value || "").trim();
const email     = (document.getElementById("email")?.value || "").trim().toLowerCase();

submitBtn.disabled = true;

fetch(endpoint, {
  method: "POST",
  // ✅ JSON preflight tetiklemesin diye:
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({
  mode: "saveResult",
  firstName,
  lastName,
  email,
  answers,
  scores,
  first:  top3[0]?.type || "",
  second: top3[1]?.type || "",
  third:  top3[2]?.type || ""
})
})
  .then(r => r.json())
  .then(j => {
  if (!j.ok) {
    console.error("GAS error JSON:", j);
    alert("GAS hata: " + (j.error || "bilinmeyen") + (j.detail ? ("\n" + j.detail) : ""));
  } else {
    console.log("GAS ok:", j);
  }
})

});   // ✅ DOMContentLoaded kapanışı
})