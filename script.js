const endpoint = "https://script.google.com/macros/s/AKfycbwh-J3AuAB4cPQR35c5FT5H500mhva_qk4fPnSt5QGKmFdv5Xf9Smc7w4LqomgKCAiL8Q/exec";

/* ==========================
   20 SORULUK ENNEAGRAM TESTİ SORULARI
   ========================== */
let accessCodeInput; // Test kodu input'u burada tutulacak

const questions = [
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Başkalarının duygularına çok duyarlıyım; bu bana yakınlık ve güç verir, kimi zaman da ağır gelebilir.", type: 2 },
      { text: "Vicdanım güçlü; doğruyla yanlışı ayırt etmemi sağlar ama aşırıya kaçtığımda yargılayıcı olabilirim.", type: 1 },
      { text: "Çevremi dikkatle gözlemlerim; bu hem çözüm üretmemi sağlar hem de ayrıntılara fazlaca takılmama yol açabilir.", type: 5 },
      { text: "İlişkilerimde dürüstlüğe önem veririm; bu kalıcı bağlar kurmamı sağlar, fakat kimi zaman uzaklaşmama da neden olabilir.", type: 6 },
      { text: "Genelde huzurlu ve dengeliyim. İnsanları olduğu gibi kabul ederim; yine de kendi ihtiyaçlarımı geri plana atabildiğim olur.", type: 9 },
      { text: "Duygularımın farkındayım. Bu bana içsel güç katar; kimi zaman da duygularımı bastırmama neden olur.", type: 4 },
      { text: "Yeni deneyimler beni canlandırır; bazen büyük bir coşku, bazen de doyumsuzluk yaratır.", type: 7 },
      { text: "Azimliyim ve performansa önem veririm; bu bana başarı kazandırır ama kendimi yıpratmama da yol açabilir.", type: 3 },
      { text: "Kaynak yaratma gücüm ve iç enerjimle zorlukların üstesinden gelebilirim; bu bana başarı sağlar, fakat kimi zaman fazla hırslı olmama da yol açar.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Sabırlı ve yumuşak huylu oluşum bana huzur kazandırır; fakat pasifleşmemi de beraberinde getirebilir.", type: 9 },
      { text: "İhtiyaçlarım için dik dururum; bu bana güç verir ama kimi zaman fazla sert görünebilirim.", type: 8 },
      { text: "Dışa dönük ve enerjik biriyim; bazen bu sosyal bağlarımı güçlendirir, bazen de yüzeysellik yaratır.", type: 7 },
      { text: "Sadakatim ve güven arayışım ilişkilerimde istikrar sağlar; ancak bu, onay ve destek arama davranışına kayabilir.", type: 6 },
      { text: "Öngörüm ve odaklanma gücüm yüksektir; bu üretken olmamı sağlar ama bazen dar bir alana sıkışmama da yol açabilir.", type: 5 },
      { text: "Duygularımı derinden hissederim ve ince düşünceli oluşum bana özgünlük katar; fakat melankoliye kapılmama da yol açabilir.", type: 4 },
      { text: "Çok yönlülüğüm bana esneklik katar; ancak dağınık kalmama da neden olabilir.", type: 3 },
      { text: "İnsanlara yardım etmek beni besler; fakat kendimi fazla adadığımda tükenmiş hissedebilirim.", type: 2 },
      { text: "Mantıklı ve özdisiplinli olmayı isterim; bu bana düzen sağlar, öte yandan katı olmama da yol açabilir.", type: 1 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Çevremde öne çıkarım; bu bana takdir kazandırsa da gösterişe kapılmama yol açabilir.", type: 3 },
      { text: "Özgün fikirlerim bana değerli işler üretme gücü verir ama farklı görünme çabasına da dönüşebilir.", type: 5 },
      { text: "Adalet benim için çok önemlidir. İnsanların bana güvenmesini sağlar ama kimi zaman fazla katı görünebilirim.", type: 1 },
      { text: "Yeni deneyimlere kolayca uyum sağlarım; bu bana motivasyon verir ama bazen yüzeysellik de yaratır.", type: 7 },
      { text: "İyimserim ve çevremi rahatlatırım; bu uyum getirir ama sorunları görmezden gelmeme de yol açabilir.", type: 9 },
      { text: "İnsanların içindeki iyiliği görmem bana umut verir ama gerçek sorunları göz ardı etmeme de neden olabilir.", type: 2 },
      { text: "İnandığım kişi ve görüşlere bağlıyım; bu bana istikrar sağlar, öte yandan eleştirel düşüncemi kaybetmeme yol açabilir.", type: 6 },
      { text: "Kendi düşüncelerimi sorgular, içsel bütünlüğümü korurum; bu bana derinlik katar ama beni insanlardan uzaklaştırabilir.", type: 4 },
      { text: "Kararlıyım ve otorite sergilerim; bu bana liderlik sağlar ama baskıcı görünmeme de neden olabilir.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Etkileyici oluşum bana ilham verici bir duruş kazandırır; fakat bu gösterişe de dönüşebilir.", type: 3 },
      { text: "Kendimi olduğum gibi göstermem bana özgünlük katar ama uyumsuz olarak da algılanabilirim.", type: 4 },
      { text: "İnisiyatif alırım ve yönlendiriciyim; bu bana liderlik sağlar, öte yandan baskıcı görünmeme de neden olabilir.", type: 8 },
      { text: "İnsanları takdir eder ve yüreklendiririm; bu güven ilişkisi kurmamı sağlar ama onay arayışına da dönüşebilir.", type: 2 },
      { text: "Bilgi edinmek bana heyecan verir; ilgimi çeken konularda ustalaşırım, ancak dar bir alana sıkışmış gibi hissedebilirim.", type: 5 },
      { text: "İnsanları bir araya getirmem çoğu zaman barış ortamı yaratır; fakat kendi düşüncelerimin geri planda kalmasına da yol açar.", type: 9 },
      { text: "Sorumluluk sahibiyim ve ideallerim yüksektir; bu bana güvenilirlik kazandırır, fakat katı davranmama da yol açabilir.", type: 1 },
      { text: "Birçok işi iyi yapabilmem bana esneklik katar; ama dağınıklık riskini de beraberinde getirir.", type: 7 },
      { text: "Toplumda üstlendiğim yapıcı rol bana güven verir; öte yandan kendimi fazla sorumluluk altında bulmama da neden olabilir.", type: 6 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Doğruluk ve adalet benim için temel değerlerdir; güvenilirliğimi artırır ama aşırıya kaçtığında katı bir bakış açısına dönüşebilir.", type: 1 },
      { text: "Elimden gelenin en iyisini yapmaya çalışırım; bu bana motivasyon verir, fakat yetersizlik kaygısına da yol açabilir.", type: 3 },
      { text: "İnsanlara yardımcı olmak beni mutlu eder, bağ kurmamı sağlar; fakat aşırıya kaçtığında kendi ihtiyaçlarımı göz ardı edebilirim.", type: 2 },
      { text: "İyi bir arabulucu ve birleştiriciyim; bu uyum getirir ama kimi zaman kendi fikirlerimi bastırmama da yol açabilir.", type: 9 },
      { text: "Duygusal ve güçlü oluşum bana derinlik katar; aşırıya kaçtığında ise dramatik ya da kırılgan görünmeme yol açabilir.", type: 4 },
      { text: "Ekibimi destekler ve korurum; bu bana güven kazandırır, fakat baskıcı olarak algılanabilirim.", type: 8 },
      { text: "Pratikliğim ve üretkenliğim ilgi alanlarımı besler; yine de dağınık olmama sebep olabilir.", type: 7 },
      { text: "Dava edindiğim konularda kararlılıkla çalışır ve işbirliği ortamları kurarım; fakat aşırı bağlılığım sorgulamadan kabullenmeme neden olabilir.", type: 6 },
      { text: "Bağımsız ve alışılmadık fikirlerim bana yaratıcılık kazandırır; ancak farklılık arayışım uyumsuz olarak algılanmama yol açabilir.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Memnuniyetsizliğim beni daha doğru ve düzenli çözümler aramaya yönlendirir; aşırıya kaçtığında ise sürekli kusur ve hata görmeme neden olabilir.", type: 1 },
      { text: "İnsanlara yakın olmak ve onlara destek olmak bağ kurmamı sağlar; fakat aşırıya kaçtığında bu, onay arayışına ya da kendi ihtiyaçlarımı ihmal etmeme dönüşebilir.", type: 2 },
      { text: "Hedeflerime ulaşmak için gösterdiğim çaba bana başarı sağlar; fakat aşırısı yorgunluk ve imaj kaygısı yaratabilir.", type: 3 },
      { text: "Sanatsal bakış açım yaratıcılığımı besler; ileri gittiğinde ise uyumsuz ya da farklı görünme kaygısına yol açabilir.", type: 4 },
      { text: "Entelektüel gücüm özgün çözümler üretmemi sağlar; ama aşırıya kaçtığında pratikten kopmama neden olabilir.", type: 5 },
      { text: "Güvenli ve kalıcı alanlara yönelimim bana istikrar verir; fakat fazla ihtiyat yeni fırsatları görmemi zorlaştırabilir.", type: 6 },
      { text: "Seçeneklerin çokluğu bana özgürlük ve heyecan verir; fakat aşırıya kaçtığında kararsızlık ve dağınıklık yaratabilir.", type: 7 },
      { text: "Bağımsızlık ve kaynaklara sahip olmak bana güç kazandırır; ancak kontrol ve hâkimiyet isteğim ilişkilerimde mesafe yaratabilir.", type: 8 },
      { text: "Çatışmadan kaçınmam uyumu korumama yardım eder; ama bu eğilim kendi ihtiyaçlarımı geri plana itebilir.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İnsanlara yoğun ilgi göstermem onları değerli hissettirir; ancak aşırısı beni kendi ihtiyaçlarımı ihmal etmeye götürebilir.", type: 2 },
      { text: "Estetik arayışım bulunduğum ortama güzellik katar; kimi zaman da bu arayışım gereksiz detaylara fazlaca takılmama yol açabilir.", type: 4 },
      { text: "Planlı ve analitik düşünmem bana sağlam bir hazırlık sağlar; öte yandan fazlaca kurgu yapmak harekete geçmemi geciktirebilir.", type: 5 },
      { text: "Çalışkanlığım bana başarı ve ilerleme kazandırır; fakat yoğun tempo beni tükenmişliğe sürükleyebilir.", type: 3 },
      { text: "İdealist yaklaşımım gelişim ve yenilik sağlar; aşırıya kaçtığında ise hiçbir şeyi yeterli bulmamama yol açabilir.", type: 1 },
      { text: "Otoriteyle uyum arayışım bana güvenlik hissi verir; fakat aşırıya kaçtığında bağımsız karar vermemi zorlaştırabilir.", type: 6 },
      { text: "Beklentilere ve rollere uyum sağlamam çevremde uyumu korur; öte yandan bu durum kendi isteklerimi geri planda bırakmama neden olabilir.", type: 9 },
      { text: "Maceracı yönüm bana canlılık ve enerji katar; ancak sürekli yenilik arayışı derinleşmemi engelleyebilir.", type: 7 },
      { text: "Girişkenliğim ve fayda odaklılığım ilerlememi kolaylaştırır; fakat hedefe odaklanırken duygusal boyutu göz ardı edebilirim.", type: 8 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Gerçekleri hayal gücü ve duygularımla zengin algılamam yaratıcılığımı artırır; fakat aşırıya kaçtığında gerçeklerden kopmama yol açabilir.", type: 4 },
      { text: "Çevremdekilere her şeyin nasıl olması gerektiğini söylemem yön verici olabilir; ancak bu tutumum bazen katı ve eleştirel görünmeme neden olabilir.", type: 1 },
      { text: "Düşünce ve duygularımın iç içe geçmesi bana derinlik katar ama kimi zaman netlik kaybolabilir ve kararsız kalabilirim.", type: 5 },
      { text: "Alışıldık sözlere sığınmam çatışmadan kaçınmamı sağlar; fakat bu eğilim kendi düşüncelerimi geri planda bırakmama yol açabilir.", type: 9 },
      { text: "Tetikte oluşum olası sorunlara hazırlıklı olmamı sağlar ama bu kaygılı beklenti sürekli huzursuz hissetmeme sebep olabilir.", type: 6 },
      { text: "Risk alıp gayretle çalışmam bana güç kazandırır; ancak duygusal ihtiyaçlarımı göz ardı etmem içsel yıpranmaya yol açabilir.", type: 8 },
      { text: "Çeşitlilik ve yenilik arayışım bana canlılık verir; fakat aşırı maddiyat odaklılığım yüzeysellik yaratabilir.", type: 7 },
      { text: "Başarısızlıktan çekiniyor olmam beni daha çok çalışmaya iter; öte yandan bu korku cesaretimi kırabilir.", type: 3 },
      { text: "Sevgiye verdiğim önem bana derin bağlar kazandırır; fakat aşırıya kaçtığında bağımlılık ya da kırılganlık yaratabilir.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Pragmatik ve verimli oluşum işleri kolaylaştırır; fakat aşırısı bazen duygularımı ikinci plana atmamla sonuçlanabilir.", type: 3 },
      { text: "Her şeyi üstüme almam beni sorumlu kılar ama bu eğilim fazlasıyla yük hissetmeme yol açabilir.", type: 4 },
      { text: "Karmaşık fikirlerle uğraşmam entelektüel gücümü artırır; fakat bu durum insanlara mesafeli görünmeme sebep olabilir.", type: 5 },
      { text: "Görevlerimi üstlenmem bana bağlılık kazandırır; ama bu yük arttığında pasif bir dirence dönüşebilir.", type: 6 },
      { text: "Sakinliğim bana huzur verir; ama çoğu zaman dalgınlaşır ve çevremde olanları umursamayabilirim.", type: 9 },
      { text: "Kontrolcü yapım bana güç ve yön verme kapasitesi kazandırır; fakat bu baskıcı görünmeme neden olabilir.", type: 8 },
      { text: "Hareketli yapım bana enerji verir; ancak bu, gerçekten ne istediğimi karıştırmama yol açabilir.", type: 7 },
      { text: "İdeale olan inancım beni yüksek standartlar koymaya yönlendirir; fakat hata korkum aşırı mükemmeliyetçiliğe dönüşebilir.", type: 1 },
      { text: "İhtiyaç duyulmak bana değerli hissettirir; ancak bu durum bazen başkalarının onayına bağımlı kalmama yol açabilir.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Bağımsız kalma isteğim bana özgürlük sağlar; fakat pasif görünmeme de neden olabilir.", type: 9 },
      { text: "Güçlü durmak bana güven verir; fakat kontrolü fazla zorladığımda hayal kırıklığı yaşayabilirim.", type: 8 },
      { text: "İsteklerimin peşinden gitmem bana özgürlük ve canlılık katar; ancak bu tutumum bazen aceleci davranmama da neden olabilir.", type: 7 },
      { text: "Temkinli olmam beni korur; ancak fazla erteleme alışkanlığım gelişimimi yavaşlatabilir.", type: 6 },
      { text: "Düzenli ve dakik olmam bana başarı getirir; ancak bu tutumum katı ve işkolik görünmeme de neden olabilir.", type: 1 },
      { text: "Onay görmek bana değerli hissettirirse de özgünlüğümü gölgelememe neden olabilir.", type: 2 },
      { text: "İmajı önemsiyor olmam hedeflerime ulaşmamı kolaylaştırır; ama bu kaygı beni yüzeyselliğe itebilir.", type: 3 },
      { text: "İçe dönüklüğüm bana derinlik kazandırır; fakat çekingen görünmeme de neden olabilir.", type: 4 },
      { text: "Hayal gücüm bana farklı bakış açıları sunar; ama aşırıya kaçtığında gerçeklerden kopmama yol açabilir.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Disiplinli oluşum bana güç verir; fakat eğlence ve zevke mesafeli durmama neden olabilir.", type: 1 },
      { text: "Kriterlere uyum göstermem hedeflerime ulaşmamı kolaylaştırır; öte yandan kendi özgün yanımı gölgeleyebilir.", type: 3 },
      { text: "Gizli ve alışılmadık bilgileri merak etmem bana derinlik katar; ne var ki bu ilgi bazen gerçeklerden uzaklaştırabilir.", type: 5 },
      { text: "İçe kapanıklığım bana yoğun bir içsel dünya sunar, fakat duygularımı saklamam yalnız hissetmeme yol açabilir.", type: 4 },
      { text: "Hayata heyecan katmam beni motive eder; fakat durağanlık bana boğucu gelir.", type: 7 },
      { text: "Endişelerim beni daha dikkatli kılar, buna rağmen kimi zaman çelişkili ve olumsuz tavırlar sergileyebilirim.", type: 6 },
      { text: "Güçlü ve koruyucu tavrım çevreme güven verir; ama baskınlığım otoriter görünmeme yol açabilir.", type: 8 },
      { text: "Başkalarına kol kanat germem bana değerli hissettirir; kimi zaman da karşılık beklememe yol açabilir.", type: 2 },
      { text: "Problemlerden zihinsel olarak uzaklaşmam bana kısa süreli rahatlık verir, fakat bu kaçış çözümü ertelememe neden olabilir.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Pratik işlere zor uyum sağlamam bana özgün düşünme alanı bırakır; ama aynı zamanda günlük yaşamı zorlaştırır.", type: 5 },
      { text: "Sorumluluklarım bana güven verir; fakat içimdeki karmaşık duygular arttığında davranışlarım tahmin edilmez hale gelebilir.", type: 6 },
      { text: "Birçok fikir üretmem bana yaratıcılık katar; ama hepsini sürdürememem dağınıklık yaratabilir.", type: 7 },
      { text: "Kendime güvenim çevreme liderlik etmemi sağlar; ama bu tavır baskıcı algılanmama neden olabilir.", type: 8 },
      { text: "Zihinsel dağınıklığım beni esnek kılar; fakat bu durum bağımsız davranmak yerine uyum sağlamama neden olabilir.", type: 9 },
      { text: "Özgünlüğümü korumam bana anlam verir; fakat bunu abarttığımda çevremden kopabilirim.", type: 4 },
      { text: "Başkaları için fedakârlık yapmam bana anlam katar; ama aynı zamanda kendi sınırlarımı ihmal etmeme yol açabilir.", type: 2 },
      { text: "Duygularımı kontrol etmem bana disiplin sağlar; öte yandan bu baskı içsel gerginlik yaratabilir.", type: 1 },
      { text: "Yoğun çalışmam bana üretkenlik getirir; ama bu tempo hislerimi görmezden gelmeme sebep olabilir.", type: 3 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansiyel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Eleştirel ve seçici oluşum işleri daha iyi yapmamı sağlar; ama bu tavır aşırıya kaçtığında mükemmeliyetçilik ve hoşgörüsüzlük yaratabilir.", type: 1 },
      { text: "Başkalarına yardım ederek öne çıkma isteğim bana özgüven kazandırır; fakat bazen bu çabam bencillik gibi algılanabilir.", type: 2 },
      { text: "Kendimi iyi sunmam bana özgüven ve onay kazandırır; fakat aşırıya kaçtığında sadece markalaşmış bir görüntüye odaklanabilirim.", type: 3 },
      { text: "Başkalarından farklı olduğuma dair inancım bana özgünlük sağlar; ne var ki bu durum insanlara yabancılaşmama yol açabilir.", type: 4 },
      { text: "Zihinsel dünyam bana farklı bakış açıları sunar; ama aşırıya kaçtığında bana karşı olanlara muhalif olurum.", type: 5 },
      { text: "Güvenilirliğim çevreme destek olur; öte yandan özgüven eksikliğinde kızgın ve aşağılayıcı tavırlar sergileyebilirim.", type: 6 },
      { text: "Seçenekleri sürekli sorgulamam bana farklı bakış açıları sunar; fakat bu alışkanlık karar vermemi zorlaştırabilir.", type: 7 },
      { text: "Kararlılığım düşüncelerimi savunmamı sağlar; fakat bu tutumum inatçılığa ya da katı bir tavra dönüşebilir.", type: 8 },
      { text: "Barışı koruma isteğim çevremde uyum yaratır; ama problemleri küçümsemem gerçek çözümleri geciktirebilir.", type: 9 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Vazgeçilmez olduğumu hissetmek bana değerli olduğumu gösterir; ama bu duygu kimi zaman başkalarının onayına bağımlı kalmama yol açabilir.", type: 2 },
      { text: "Hayal dünyam bana ilham ve yaratıcılık katar; ne var ki aşırısı gerçeklerden uzaklaşmama neden olabilir.", type: 4 },
      { text: "Eleştirel düşüncem bana berraklık kazandırır; fakat aşırıya kaçtığında provokatif ve sürtüşmeci olabilirim.", type: 5 },
      { text: "Çatışmadan uzak durmam bana huzur verir; fakat bu eğilim kendi ihtiyaçlarımı geri plana atmama yol açabilir.", type: 9 },
      { text: "Meydan okuma ve savaşçı ruhum bana cesaret ve güç verir; ancak kontrolü zorladığımda herkesi yenmem gerektiğini düşünerek sert ve acımasızlaşabilirim.", type: 8 },
      { text: "Fırsatları değerlendirme isteğim bana geniş bir bakış açısı sağlar; buna rağmen odaklanmamı zorlaştırabilir.", type: 7 },
      { text: "Sorunlarımı başkalarına yüklemem beni geçici olarak rahatlatır; ama bu tavır sorumluluk almamı engelleyebilir.", type: 6 },
      { text: "Sağlam fikirlerim insanlara yol gösterir; ne var ki ısrarcılığım ilişkilerde gerilim yaratabilir.", type: 1 },
      { text: "Kariyere verdiğim önem bana başarı sağlar; fakat aşırısı özel hayatımı geri plana atabilir.", type: 3 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Kararlılığım bana direnç kazandırır; ama aşırısı pasifleşmeme ve kaderime boyun eğmeme yol açabilir.", type: 9 },
      { text: "Şakacı ve hazır cevap oluşum çevremde neşe yaratır; ancak bazen yeterince ciddi görünmemi engelleyebilir.", type: 7 },
      { text: "Sağlık konusundaki hassasiyetim beni dikkatli kılar; ama bu hassasiyet kaygıya dönüşebilir.", type: 2 },
      { text: "İçsel hassasiyetim bana derinlik katar; ama kontrolsüz olduğunda kendime acıma ve başkalarının yaşamlarına gıpta etme eğilimim oluşur.", type: 4 },
      { text: "İrademe olan inancım bana kararlılık kazandırır; ancak bu duruş kimi zaman inatçılığa dönüşebilir.", type: 8 },
      { text: "Net beklentilerim yaptığım işin kalitesini artırır; buna rağmen sabırsızlığım uyumsuzluğa sebep olabilir.", type: 1 },
      { text: "Saygı ve itibar arayışım motivasyonumu artırır; ama aşırısı onay bağımlılığı yaratabilir.", type: 3 },
      { text: "Yakın çevrem konusunda seçiciliğim bana kendimi koruma imkanı verir; fakat bu bakış açım güvensizliğe dönüşebilir.", type: 6 },
      { text: "Fikirlerimdeki radikallik bana zihinsel özgürlük verir; ama kontrolsüz olduğunda kasten muhaliflik yaratabilir.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Analitik düşüncem bana farklı bakış açıları sağlar; ama ileri gittiğinde küçümseyici ve tartışmacı görünebilirim.", type: 5 },
      { text: "İyi görünme isteğim beni motive eder; öte yandan bu eğilim sahiciliğimi gölgeleyebilir.", type: 3 },
      { text: "Hareketliliğim bana enerji katar; fakat sürekli yenilik arayışım odaklanmamı zorlaştırabilir.", type: 7 },
      { text: "Kendime güvenim liderlik etmemi kolaylaştırır; buna rağmen kibirli algılanabilirim.", type: 2 },
      { text: "İşlerin doğru yapılması için ısrar eder, gerekirse ders verir ve bazen insanları azarlayabilirim.", type: 1 },
      { text: "İradeli oluşum bana etki gücü verir; ancak sınırı aştığımda tehdit ve azarla itaat sağlamaya çalışabilirim.", type: 8 },
      { text: "Çözümlerin kendiliğinden gelmesini arzu ederim. Bu pasifliğim kısa süreli huzur sağlar; ama sorunları ertelemem çevremde rahatsızlık yaratabilir.", type: 9 },
      { text: "Otoriteden çekinmem beni temkinli yapar; fakat aynı kaygı başkalarına karşı otoriter davranmama yol açabilir.", type: 6 },
      { text: "Özgünlüğüm bana farklı bakış açıları kazandırır; öte yandan pratikliği kaybettiğimde işleri sonuçlandırmakta zorlanabilirim.", type: 4 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Kesin doğrulara bağlılığım bana netlik sağlar; fakat bu katılık esnek olmamı zorlaştırabilir.", type: 1 },
      { text: "Hayal gücüm düşüncelerimi zenginleştirir; öte yandan ileri gittiğinde beni gerçeklerden koparıp içe kapanmaya itebilir.", type: 5 },
      { text: "Bastırılmış hissetmem bana uyum sağlama eğilimi verir; ama bu duygu etkisiz hissetmeme yol açabilir.", type: 9 },
      { text: "Kontrolü reddetmem bana özgürlük kazandırır; fakat bu tavır kimi zaman acımasızlığa dönüşebilir.", type: 8 },
      { text: "Pozitifliğim bana enerji verir; fakat endişelendiğimde bunları bir an önce bastırmak isteyebilirim.", type: 7 },
      { text: "Sorumluluk duygum bana güven verir; fakat aşağılık duygularım arttığında panik olup kendimi küçümseyici tavırlar sergileyebilirim.", type: 6 },
      { text: "Sahip olduğum iyi şeyleri ve başarılarımı (iş, aile, çocuk, ödüller) paylaşmam motivasyonumu artırır; ama bu eğilim övünme olarak algılanabilir.", type: 3 },
      { text: "İçsel hassasiyetim bana anlam katar; öte yandan hayal kırıklığında bu yoğunluk kendime öfkeye dönüşebilir.", type: 4 },
      { text: "Yardımlarımı hatırlatmam bana değerli hissettirir; öte yandan bu tutum karşılık beklentisi yaratabilir.", type: 2 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İçsel dünyam bana derinlik kazandırır; fakat zorlandığımda kendimden ve herkesten uzaklaşabilirim.", type: 4 },
      { text: "Yüksek standartlarım bana doğruluk ve kalite arayışı kazandırır; ama aşırısı çevremde hata bulmama yol açabilir.", type: 1 },
      { text: "Tükenmiş hissetmem bana mola ihtiyacımı gösterir; öte yandan sorunlarla başa çıkma isteğimi zayıflatır.", type: 9 },
      { text: "Savunmasızlığım bana dikkatli olmayı öğretir; buna rağmen kaygımı artırabilir.", type: 6 },
      { text: "Çocuksu yönüm bana neşe katar; fakat düşüncesizliğim sorumluluklarımı aksatabilir.", type: 7 },
      { text: "Güce olan inancım bana kararlılık getirir; ne var ki bu yaklaşım sertlik yaratabilir.", type: 8 },
      { text: "İhtiyaçlarımı ihmal eder, başkaları için kendimi tüketirim; bu bazen sağlıksız alışkanlıklara yol açabilir.", type: 2 },
      { text: "Elit bir imaj yaratma isteğim bana prestij sağlar; öte yandan bu tavır yapay görünmeme neden olabilir.", type: 3 },
      { text: "Radikal düşüncelerim bana yenilik katar; ama ileri gittiğinde tuhaf ve kural tanımaz olarak algılanabilirim.", type: 5 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "Aşırılıklara yönelimim bana yoğun deneyimler yaşatır; fakat bu eğilimim yıpranmama neden olabilir.", type: 7 },
      { text: "Başkaldırışım bana özgürlük sağlar; öte yandan bu tavır otoriteyle çatışmama yol açabilir.", type: 8 },
      { text: "İnatçılığım beni kararlı kılar; ancak aşırısı işbirliğinden uzaklaştırabilir.", type: 9 },
      { text: "Daha güçlü kişi ve inançlardan destek almak bana cesaret verir; fakat sürekli başkalarına dayanmak kendi çözüm üretme gücümü zayıflatabilir.", type: 6 },
      { text: "Temkinli oluşum bana denge verir; ama aşırıya kaçtığında duygularım değişken olur ve çatışmalardan korkarım.", type: 5 },
      { text: "İçsel yoğunluğum bana özgünlük katar; ama aşırıya kaçtığında duygularımı hissedemez hale gelebilirim.", type: 4 },
      { text: "Kuralları esnetmem bana ilerleme fırsatları sunar; ancak bu tavır başkalarının gözünde güvenilirliğimi zedeleyebilir.", type: 3 },
      { text: "İlgim insanlara kendini değerli hissettirir; öte yandan fazla beklentiye girdiğimde küçümseyici olabilirim.", type: 2 },
      { text: "Eleştirel tavrım mükemmelliği destekler; ne var ki sertliğim hoşgörüsüz algılanabilir.", type: 1 }
    ]
  },
  {
    text: "Kendinizde gözlemlediğiniz veya potansel olarak hissettiğiniz özellikleri, ayrıca arkadaşlarınızın sizin hakkınızda sıkça söylediklerini göz önünde bulundurarak, bu ifadelerden üçünü seçiniz. Seçimlerinizi 1. Tercih, 2. Tercih ve 3. Tercih olarak önceliklendiriniz.",
    options: [
      { text: "İkna gücüm insanlarla bağ kurmamı ve onlara ilham vermemi sağlar; fakat karşılık beklediğimde yapay görünebilir, yanlış kullandığımda ise manipülatif algılanabilirim.", type: 2 },
      { text: "Kararlılığım bana güç verir; fakat abarttığımda kendi dediğimi neye mal olursa olsun uygulatmak isterim.", type: 8 },
      { text: "Disiplinim bana güven kazandırır; öte yandan bu tavrım çevremce zorlayıcı görülebilir.", type: 1 },
      { text: "Kendimi kanıtlamak bana özgüven verir; ama istediğim takdiri görmezsem huzursuz olurum.", type: 3 },
      { text: "Sakinliğim ve gevşekliğim bana rahatlık sağlar; fakat aşırı ihmal tehlike yaratabilir.", type: 9 },
      { text: "Hayallerimin peşinden gitmem bana canlılık kazandırır; öte yandan sınır tanımayan tavrım ilişkilerimi zorlayabilir.", type: 7 },
      { text: "Sadakatim bana sağlam ilişkiler kazandırır; ama zorlandığımda küçümseyici ve kırıcı tavırlar sergileyebilirim.", type: 6 },
      { text: "Yalnız kalmam bana düşünme alanı verir; ama aşırı uzaklaşmam çevremle bağımı koparabilir.", type: 5 },
      { text: "Alçakgönüllülüğüm bana hassasiyet kazandırır; ancak aşırı utanç duymam isteksizlik ve geri çekilmeme neden olabilir.", type: 4 }
    ]
  }
];

/* ==========================
   DOM YÜKLENİNCE ÇALIŞAN KISIM
   ========================== */

document.addEventListener("DOMContentLoaded", () => {
  // Ekranlar
  const introScreen  = document.getElementById("intro-screen");
  const startTestBtn = document.getElementById("start-test-btn");
  const introConsent = document.getElementById("intro-consent");

  const testSection   = document.getElementById("test-section");
  const testContainer = document.getElementById("test-container");
  const navigation    = document.getElementById("navigation");
  const resultDiv     = document.getElementById("result");

  const prevBtn       = document.getElementById("prev-btn");
  const nextBtn       = document.getElementById("next-btn");
  const submitBtn     = document.getElementById("submit-btn");

  const accessCodeInput = document.getElementById("access-code");

  // Başlangıç görünürlük
  introScreen.style.display = "block";
  testSection.style.display = "none";
  navigation.style.display  = "none";
  resultDiv.style.display   = "none";

  // Checkbox → buton aktif/pasif
  introConsent.addEventListener("change", () => {
    startTestBtn.disabled = !introConsent.checked;
  });

  // Test state
  let currentQuestion = 0;
  const answers = questions.map(() => ({
    col1: null,
    col2: null,
    col3: null
  }));

  function renderQuestion(qIndex) {
    const q = questions[qIndex];
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

    answers[qIndex].col1 = col1 ? parseInt(col1.value) : null;
    answers[qIndex].col2 = col2 ? parseInt(col2.value) : null;
    answers[qIndex].col3 = col3 ? parseInt(col3.value) : null;
  }

  // Teste Başla
// Teste Başla – sunucuya sormadan, sadece basit kontroller
startTestBtn.addEventListener("click", () => {
  if (!introConsent.checked) {
    alert("Lütfen bilgilendirme metnini okuduğunuzu onaylayın.");
    return;
  }

  const firstName  = document.getElementById("first-name").value.trim();
  const lastName   = document.getElementById("last-name").value.trim();
  const email      = document.getElementById("email").value.trim();
  const accessCode = accessCodeInput.value.trim();

  if (!firstName || !lastName || !email) {
    alert("Lütfen ad, soyad ve e-posta bilgilerini doldurun.");
    return;
  }

  if (!accessCode) {
    alert("Lütfen size verilen test kodunu girin.");
    return;
  }

  // İstersen format kontrolü (örnek: OANDA-5MSSHLU gibi):
  const codePattern = /^OANDA-[A-Z0-9]{8}$/i;
  if (!codePattern.test(accessCode)) {
    alert("Lütfen geçerli formatta bir test kodu girin (örn: OANDA-5MSSHLU).");
    return;
  }

  // Tüm kontroller geçti → testi aç
  introScreen.style.display = "none";
  testSection.style.display = "block";
  navigation.style.display  = "flex";
  resultDiv.style.display   = "none";

  currentQuestion = 0;
  renderQuestion(currentQuestion);
  window.scrollTo({ top: 0, behavior: "smooth" });
});


  // Sonraki
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

  // Önceki
  prevBtn.addEventListener("click", () => {
    saveCurrentAnswers();
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion(currentQuestion);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Sonuçları Göster
  submitBtn.addEventListener("click", () => {
    saveCurrentAnswers();

    // Tüm sorular dolu mu?
    for (let i = 0; i < answers.length; i++) {
      const a = answers[i];
      if (!a.col1 || !a.col2 || !a.col3) {
        alert(`Lütfen Soru ${i + 1} için 1., 2. ve 3. tercihlerini seç.`);
        return;
      }
    }

    // Skorlar
    const scores = Array(9).fill(0);
    answers.forEach(a => {
      if (a.col1) scores[a.col1 - 1] += 3;
      if (a.col2) scores[a.col2 - 1] += 2;
      if (a.col3) scores[a.col3 - 1] += 1;
    });

    const scoresWithTypes = scores
      .map((score, index) => ({ type: index + 1, score }))
      .sort((a, b) => b.score - a.score);

    const top3 = scoresWithTypes.slice(0, 3);

    // Tüm tip puanlarını liste şeklinde göster
    let scoreListHtml = `
      <h3>Enneagram Tip Puanlarınız</h3>
      <ul class="score-list">
        ${scores
          .map((s, i) => `<li>Tip ${i + 1}: <strong>${s} puan</strong></li>`)
          .join("")}
      </ul>
    `;

    const enneagramHtml = `
      <div id="enneagram-wrapper">
        <img src="Enneagram.png" alt="Enneagram Diyagramı" class="enneagram-image" />
      </div>
      ${scoreListHtml}
    `;

    testContainer.style.display = "none";
    navigation.style.display    = "none";
    resultDiv.style.display     = "block";

    resultDiv.innerHTML = `
      ${enneagramHtml}
      <h3>En baskın 3 Enneagram tipiniz</h3>
      <ol>
        ${top3
          .map(t => `<li>Tip ${t.type}: <strong>${t.score} puan</strong></li>`)
          .join("")}
      </ol>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Google Sheet'e gönder
    const firstName  = document.getElementById("first-name").value.trim();
    const lastName   = document.getElementById("last-name").value.trim();
    const email      = document.getElementById("email").value.trim();
    const accessCode = accessCodeInput.value.trim();

    fetch(endpoint, {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "saveResult",
        firstName,
        lastName,
        email,
        code: accessCode,
        first:  top3[0].type,
        second: top3[1].type,
        third:  top3[2].type
      })
    }).catch(err => {
      console.error("Google Sheet'e yazarken hata:", err);
    });
  });

}); // DOMContentLoaded'in kapanışı
