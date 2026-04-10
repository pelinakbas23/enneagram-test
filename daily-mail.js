// api/daily-mail.js
// Vercel Cron Job — her sabah 07:00 TR saati (05:00 UTC) çalışır
// İçerikler sabit; Claude API gerekmez.

const tipNames = {
  1: "Mükemmeliyetçi", 2: "Yardımsever",   3: "Başarıcı",
  4: "Bireyci",        5: "Araştırmacı",    6: "Sadık",
  7: "Coşkucu",        8: "Meydan Okuyucu", 9: "Barışçıl",
};

// 9 tip x 7 gün içerik — gün sırası haftanın gününe göre döner (0=Pazar ... 6=Cumartesi)
const CONTENT = {
  1: [
    { affirmation: `"Mükemmel olmak zorunda değilim; yeterince iyi olmak zaten cesaret ister."`, tip: `Bugün bir işi bitirip bırak — daha fazla düzeltme yapma. 'Bu yeterince iyi' de ve geç.`, q1: `Bugün hangi an 'bu yeterli değil' diye düşündün? O düşünce seni nasıl etkiledi?`, q2: `Kendine bugün nazik miydin, yoksa eleştirel mi?` },
    { affirmation: `"Hatalarım beni tanımlamaz; onlardan öğrenerek büyürüm."`, tip: `Bugün küçük bir hata yaptığında özür dilemek yerine sadece 'Tamam, devam' de.`, q1: `Bugün neyi 'doğru yapmak' için fazla zaman harcadın?`, q2: `Başkalarına uyguladığın standartları kendine de uygulayabiliyor musun?` },
    { affirmation: `"Kurallar beni güvende tutar ama bazen esneklik daha çok güç gerektirir."`, tip: `Bugün bir planın dışına çık — küçük de olsa. Farklı bir yol dene.`, q1: `Bugün beklentilerine uymayan bir şey oldu mu? Ne hissettin?`, q2: `Kontrolü bırakmak seni özgürleştirir mi, yoksa kaygılandırır mı?` },
    { affirmation: `"Öfkem bir mesaj taşır; onu dinlemeyi öğreniyorum."`, tip: `Bugün seni rahatsız eden bir şeyi fark ettiğinde, tepki vermeden önce 3 nefes al.`, q1: `Bugün içinde biriken ama dışa vuramadığın bir şey var mıydı?`, q2: `Kızgınlığının altında ne yatıyor — yorgunluk mu, adalet duygusu mu?` },
    { affirmation: `"Doğruyu söylemek her zaman kolay değildir; ama bunu yapabildiğimde kendimle barışık oluyorum."`, tip: `Bugün bir geribildirim ver — kibar ama net. Yumuşatmadan, kırmadan.`, q1: `Bugün eleştirmek isteyip de sustuğun bir an oldu mu?`, q2: `Başkalarını düzeltme isteğin nereden geliyor sence?` },
    { affirmation: `"Mükemmellik bir varış noktası değil; bir yolculuktur."`, tip: `Bugün tamamlanmamış bir şeyi olduğu gibi bırak. Yarım kalmak da bir süreçtir.`, q1: `Bugün ne kadar zaman 'daha iyi olabilirdi' diye düşünerek geçirdin?`, q2: `Kendine en sık ne zaman kızıyorsun?` },
    { affirmation: `"Başkalarına gösterdiğim şefkati kendime de gösterebilirim."`, tip: `Bugün kendine bir iyilik yap — çünkü hak ediyorsun, bir şeyi başarmak için değil.`, q1: `Bugün kendine en sert ne zaman davrandın?`, q2: `Şefkatin içe dönmesini neyin engellediğini düşünüyorsun?` },
  ],
  2: [
    { affirmation: `"Başkalarına verdiğim ilgiyi kendime de verebilirim."`, tip: `Bugün birine yardım etmeden önce kendine sor: 'Ben şu an neye ihtiyaç duyuyorum?'`, q1: `Bugün kendi ihtiyaçlarını kaç kez geri planda bıraktın?`, q2: `Yardım etmek seni mutlu mu ediyor, yoksa bazen yoruyor mu?` },
    { affirmation: `"İhtiyaçlarımı dile getirmek bencillik değil, dürüstlüktür."`, tip: `Bugün bir 'hayır' de — küçük bir şeye. Ve ardından nasıl hissettiğini fark et.`, q1: `Bugün 'evet' dediğin ama 'hayır' demek istediğin bir an oldu mu?`, q2: `Sınır koymaktan seni en çok ne alıkoyuyor?` },
    { affirmation: `"Sevilmek için her şeyi yapmak zorunda değilim; olduğum gibi seviliyorum."`, tip: `Bugün birinin sana teşekkür etmesine izin ver — küçümsemeden, 'bir şey değil' demeden.`, q1: `Bugün takdir görmediğini hissettin mi? Bu seni nasıl etkiledi?`, q2: `Başkalarının onayına ne kadar ihtiyaç duyduğunu fark ediyor musun?` },
    { affirmation: `"Vermek güzeldir; ama almayı da öğrenmek cesaret ister."`, tip: `Bugün biri sana bir iyilik teklif ettiğinde kabul et. 'Gerek yok' deme.`, q1: `Bugün birinin yardımını reddettin mi? Neden?`, q2: `Almak sende nasıl bir his uyandırıyor?` },
    { affirmation: `"Duygularım gerçektir ve dile getirilmeyi hak eder."`, tip: `Bugün nasıl hissettiğini bir kişiye söyle — karşılıklı paylaşım beklemeden.`, q1: `Bugün duygularını bastırdığın bir an oldu mu?`, q2: `Kendi acını kabul etmek sana zor geliyor mu?` },
    { affirmation: `"İlişkilerim karşılıklı olduğunda daha derin ve sağlıklı oluyor."`, tip: `Bugün bir ilişkinde dengeyi gözlemle — ne kadar veriyorsun, ne kadar alıyorsun?`, q1: `Bugün karşılık görmediğini hissettiğin bir an oldu mu?`, q2: `Karşılıksız vermek seni ne zaman yoruyor?` },
    { affirmation: `"Kendime bakım göstermek, başkalarına daha çok verebilmemi sağlar."`, tip: `Bugün sadece kendin için bir şey yap — kimse için değil, yalnızca sen için.`, q1: `Bugün kendine ne kadar zaman ayırdın?`, q2: `Kendinle baş başa kalmak sana nasıl hissettiriyor?` },
  ],
  3: [
    { affirmation: `"Başarılarım kıymetlidir; ama ben onlardan çok daha fazlasıyım."`, tip: `Bugün bir görevi tamamladıktan sonra dur ve o anın tadını çıkar — hemen bir sonrakine geçme.`, q1: `Bugün 'yeterince başarılı mıyım?' diye düşündüğün bir an oldu mu?`, q2: `Başarı seni mutlu mu ediyor, yoksa sadece güvende mi hissettiriyor?` },
    { affirmation: `"Hız her zaman kazandırmaz; derin gitmek de bir başarıdır."`, tip: `Bugün bir işi yavaş ve özenle yap — sonucu değil, süreci hisset.`, q1: `Bugün ne kadar hızlı davrandın? Bu hız sana ne kazandırdı, ne kaybettirdi?`, q2: `Yavaşlamak seni nasıl hissettiriyor?` },
    { affirmation: `"Duygularım zayıflık değil; beni insan yapan şeydir."`, tip: `Bugün birisiyle gerçekten nasıl olduğunu paylaş — 'iyiyim'in ötesinde.`, q1: `Bugün duygularını ne zaman sakladın?`, q2: `Savunmasız görünmekten niye korkuyorsun?` },
    { affirmation: `"İmaj için değil, anlam için çalışıyorum."`, tip: `Bugün seni başkalarına iyi göstermeyecek ama doğru olan bir şeyi seç.`, q1: `Bugün izlenim yönetimine ne kadar enerji harcadın?`, q2: `Gerçek sen ile gösterdiğin sen arasında ne kadar fark var?` },
    { affirmation: `"Rekabet etmek yerine iş birliği yapmak daha büyük başarı getirir."`, tip: `Bugün bir başkasının başarısını kutla — içtenlikle, kıskançlık olmadan.`, q1: `Bugün kıyaslama yaptığın anlar oldu mu?`, q2: `Başkasının başarısı sende ne hissettiriyor?` },
    { affirmation: `"Dinlenmek tembellik değil; yeniden doğmaktır."`, tip: `Bugün planlı bir mola ver — telefonsuz, işsiz. Sadece ol.`, q1: `Bugün duraksadığın bir an oldu mu, yoksa hep koştun mu?`, q2: `Dinlenmeyi hak etmek için ne yapman gerektiğini düşünüyorsun?` },
    { affirmation: `"Sevgi koşulsuzdur; ben de öyle seviliyorum."`, tip: `Bugün biri seni takdir ettiğinde gerçekten içine al — geçiştirme.`, q1: `Bugün sevgi ve takdiri ne zaman hissettiremediler sana?`, q2: `Sevildiğini hissetmek için ne başarman gerekiyor sence?` },
  ],
  4: [
    { affirmation: `"Benzersizliğim bir armağan; onu dünyayla paylaşmak cesarettir."`, tip: `Bugün yarım kalan bir yaratıcı işi bitir — mükemmel değil, tamamlanmış olsun.`, q1: `Bugün kendini yanlış anlaşılmış hissettin mi?`, q2: `Acını ifade etmek mi, yoksa iyileşmek mi daha zor geliyor sana?` },
    { affirmation: `"Şimdiki an da değerlidir; özlem duyduğum şeyi burada bulabilirim."`, tip: `Bugün şu anın içinde bir güzellik bul — sıradan bir şeyde.`, q1: `Bugün geçmişe ya da geleceğe ne kadar zaman harcadın?`, q2: `Şu anı kaçırmana ne sebep oluyor?` },
    { affirmation: `"Duygularım benim pusulam; ama ben onların kaptanıyım."`, tip: `Bugün yoğun bir duygu hissettiğinde onu gözlemle — içinde kaybolmadan.`, q1: `Bugün duygularının seni sürüklediği bir an oldu mu?`, q2: `Duygularınla arkadaş olmak ne anlama gelir sence?` },
    { affirmation: `"Sıradan anlar da derin anlamlar taşıyabilir."`, tip: `Bugün sıradan bir aktiviteye — çay içmek, yürümek — tüm benliğinle katıl.`, q1: `Bugün ne zaman 'bu yeterince özel değil' diye düşündün?`, q2: `Sıradanlıktan kaçmak sana ne kazandırıyor, ne kaybettiriyor?` },
    { affirmation: `"Kendimi ifade etmek dünyaya katkı sunmaktır."`, tip: `Bugün bir şeyi — bir fikri, bir duyguyu — başkasıyla paylaş. Geri çekilme.`, q1: `Bugün kendini sakladığın bir an oldu mu?`, q2: `Görülmek sende korku mu, yoksa özgürlük mü hissettiriyor?` },
    { affirmation: `"Eksikliğim değil, bütünlüğüm beni tanımlar."`, tip: `Bugün kendinin bir güçlü yanını yüksek sesle kabul et — sadece kendin için.`, q1: `Bugün kendini yetersiz hissettiğin bir an oldu mu?`, q2: `Eksiklik hissinin altında ne yatıyor?` },
    { affirmation: `"Bağlantı, farklılığımın içinde de mümkündür."`, tip: `Bugün sana benzemediğini düşündüğün biriyle gerçek bir sohbet kur.`, q1: `Bugün insanlardan uzak durduğunda bu bir tercih miydi, yoksa bağlantıya ihtiyacın var mıydı?`, q2: `Ait olmak için neyi feda etmek zorundaymışsın gibi hissediyorsun kendini?` },
  ],
  5: [
    { affirmation: `"Bilgi güçtür; ama paylaşılan bilgi daha da güçlüdür."`, tip: `Bugün bildiğin bir şeyi biriyle paylaş — hazır hissetmesen de.`, q1: `Bugün geri çekildiğin bir an oldu mu? Ne hissettin?`, q2: `Bilgini paylaşmaktan seni ne alıkoyuyor?` },
    { affirmation: `"Yeterince bilmek için tüm cevaplara sahip olmam gerekmez."`, tip: `Bugün hazır olmadan bir adım at — küçük de olsa.`, q1: `Bugün 'henüz hazır değilim' diye ertelediğin bir şey var mıydı?`, q2: `Hazırlık ile kaçınma arasındaki farkı nasıl anlıyorsun?` },
    { affirmation: `"Duygularım düşüncelerim kadar gerçek ve değerlidir."`, tip: `Bugün bir duyguyu analiz etmeden sadece hisset — ne olduğunu izle.`, q1: `Bugün duygularını düşüncelerle bastırdığın bir an oldu mu?`, q2: `Duygularından koptuğunu ne zaman fark ediyorsun?` },
    { affirmation: `"Bağlantı kurduğumda enerji kaybetmem; derinleşirim."`, tip: `Bugün birisiyle yüzeysel değil, gerçek bir sohbet başlat.`, q1: `Bugün sosyal etkileşimden ne zaman uzaklaşmak istedin?`, q2: `Yalnız olmak ile izole olmak arasındaki fark nedir sence?` },
    { affirmation: `"Sahip olduklarım yeterli; güvenlik içeriden gelir."`, tip: `Bugün bir kaynağı — zamanını, enerjini, bilgini — cömertçe paylaş.`, q1: `Bugün kıtlık hissi yaşadın mı — zaman, enerji veya kaynak anlamında?`, q2: `Yeterince sahip olduğunu ne zaman hissediyorsun?` },
    { affirmation: `"Gözlemlemek kadar katılmak da benim için değerlidir."`, tip: `Bugün bir grup aktivitesinde gözlemci değil, aktif katılımcı ol.`, q1: `Bugün kenarda kaldığın bir an oldu mu?`, q2: `Dahil olmak sende ne hissettiriyor?` },
    { affirmation: `"Zihinsel netlik için bedensel farkındalık da şarttır."`, tip: `Bugün 5 dakika sadece bedenine odaklan — nefes, duruş, his.`, q1: `Bugün bedeninin sinyallerini ne zaman görmezden geldin?`, q2: `Zihin ile beden arasındaki bağlantın nasıl?` },
  ],
  6: [
    { affirmation: `"Güvenim içimde; onu dışarıda aramak zorunda değilim."`, tip: `Bugün küçük bir kararı başkasına danışmadan ver — kendi içgüdüne güven.`, q1: `Bugün en çok hangi konuda onay aradın?`, q2: `İçsel sesinle dışsal otoritenin çatıştığı anlar nasıl geçiyor?` },
    { affirmation: `"Belirsizlik tehlike değil; büyüme alanıdır."`, tip: `Bugün sonucu bilinmeyen bir şeye evet de — küçük ölçekte.`, q1: `Bugün belirsizlikle karşılaştığında nasıl tepki verdin?`, q2: `Kontrol edemediğin şeylerle nasıl barışabilirsin?` },
    { affirmation: `"Sadakatim güçtür; ama sınırlarla daha da güçlü olur."`, tip: `Bugün sana iyi gelmeyen bir ilişkide ya da durumda bir sınır belirle.`, q1: `Bugün sadakat ile korku arasında kaldığın bir an oldu mu?`, q2: `Kime sadık olduğunda kendinden ödün veriyorsun?` },
    { affirmation: `"Cesaretim kaygımdan daha büyüktür."`, tip: `Bugün seni korkutan ama önemli olan bir adımı at.`, q1: `Bugün kaygın seni durdurdu mu?`, q2: `Cesaretini en son ne zaman hissettin?` },
    { affirmation: `"Güvenilir biri olduğum kadar, güvenmeyi de öğreniyorum."`, tip: `Bugün birine — bir fikrinde, bir görevde — güven. Kontrol etme.`, q1: `Bugün güvenmekte zorlandığın bir an oldu mu?`, q2: `Güvensizliğinin altında ne yatıyor?` },
    { affirmation: `"Kaygı benim düşmanım değil; bir habercidir."`, tip: `Bugün kaygı hissettiğinde onu yargılamadan kabul et ve ne söylediğini sor.`, q1: `Bugün kaygın ne mesaj vermeye çalıştı?`, q2: `Kaygınla savaşmak mı, yoksa onu anlamak mı daha çok enerji alıyor?` },
    { affirmation: `"Şu an güvendeyim; ve bu yeterli."`, tip: `Bugün 'şu an güvendeyim' cümlesini üç kez tekrarla — gerçekten hissederek.`, q1: `Bugün tehdit hissettiğin ama gerçek tehlikenin olmadığı bir an oldu mu?`, q2: `Güvende hissetmek için neye ihtiyacın var?` },
  ],
  7: [
    { affirmation: `"Derinlik, genişlikten daha zengin bir deneyim sunar."`, tip: `Bugün tek bir şeye odaklan ve onu bitir — yeni bir şeye başlamadan.`, q1: `Bugün dikkatinin dağıldığı kaç an oldu?`, q2: `Bir şeyi bitirmek sende nasıl bir his uyandırıyor?` },
    { affirmation: `"Acıdan kaçmak yerine onunla oturmak beni güçlendirir."`, tip: `Bugün rahatsız edici bir duyguyla 5 dakika otur — kaçmadan, çözmeden.`, q1: `Bugün zor bir duygudan uzaklaşmak için ne yaptın?`, q2: `Acı ile oturmak sana ne öğretebilir?` },
    { affirmation: `"Yavaşlamak kaybetmek değil; daha çok görmektir."`, tip: `Bugün bir aktiviteyi normalden iki kat yavaş yap — yemek, yürüyüş, konuşma.`, q1: `Bugün ne kadar hızlı geçti? Neyi kaçırdın?`, q2: `Yavaşladığında ne fark ediyorsun?` },
    { affirmation: `"Bağlılık özgürlüğümü kısıtlamaz; onu derinleştirir."`, tip: `Bugün bir ilişkiye ya da projeye tam anlamıyla kendini ver — kaçış kapısı olmadan.`, q1: `Bugün bir şeyden ya da birinden kaçtığın an oldu mu?`, q2: `Bağlılık sende hangi duyguyu tetikliyor?` },
    { affirmation: `"Şimdiki an, gelecekteki heyecanlar kadar değerlidir."`, tip: `Bugün planlamak için değil, şu anı yaşamak için zaman ayır.`, q1: `Bugün zihnin ne sıklıkla geleceğe kaçtı?`, q2: `Şimdi burada olmak sana ne kazandırıyor?` },
    { affirmation: `"Minnet, daha fazlasını aramayı durdurur ve elimdekini gösterir."`, tip: `Bugün üç şükran yaz — büyük değil, küçük ve gerçek.`, q1: `Bugün 'daha iyi olabilirdi' diye düşündüğün kaç an oldu?`, q2: `Minnet ile tatminsizlik arasında nasıl bir denge kuruyorsun?` },
    { affirmation: `"Derinlemesine hissetmek, derinlemesine yaşamaktır."`, tip: `Bugün seni gerçekten mutlu eden bir şeyi — küçük de olsa — fark et ve içine al.`, q1: `Bugün gerçekten hissettiğin bir an oldu mu, yoksa hep yüzeyde mi kaldın?`, q2: `Bugün hissettiğin neşe gerçek miydi, yoksa bir şeyden kaçmak için mi iyimser davrandın?` },
  ],
  8: [
    { affirmation: `"Gücüm, savunmasızlığımı kabul ettiğimde daha da artar."`, tip: `Bugün birine 'bilmiyorum' de ya da yardım iste — zayıflık olarak değil, güç olarak.`, q1: `Bugün savunmasız hissettiğin bir an oldu mu? Bunu nasıl yönettin?`, q2: `Güçlü görünme ihtiyacın nereden geliyor?` },
    { affirmation: `"Kontrol etmek her zaman güçlü olmak değildir; bazen bırakmak daha cesur."`, tip: `Bugün bir durumun kontrolünü birisine bırak — müdahale etmeden izle.`, q1: `Bugün kontrolü bırakamadığın bir an oldu mu?`, q2: `Bırakmak sende hangi duyguyu uyandırıyor?` },
    { affirmation: `"Öfkemi hissetmek normaldir; onu nasıl gösterdiğim benim elimdedir."`, tip: `Bugün öfkeni hissettiğinde, ifade etmeden önce 10 saniye dur.`, q1: `Bugün öfkenin seni sürüklediği bir an oldu mu?`, q2: `Öfkenin altında ne var — korku mu, hayal kırıklığı mı, acı mı?` },
    { affirmation: `"Sertliğim insanları uzaklaştırabilir; yumuşaklığım daha çok güç çeker."`, tip: `Bugün sert olmak yerine nazik bir yaklaşım dene — aynı mesajı farklı ver.`, q1: `Bugün sert davranmak işe yaradı mı?`, q2: `Yumuşak olmak zayıflık mı, yoksa seçim mi?` },
    { affirmation: `"Dinlemek de bir güç biçimidir."`, tip: `Bugün bir sohbette sadece dinle — cevap hazırlamadan, yönlendirmeden.`, q1: `Bugün ne sıklıkla söz kestin ya da yönlendirdin?`, q2: `Gerçekten dinlediğinde ne fark ediyorsun?` },
    { affirmation: `"Adaletsizliğe karşı durmak, şefkatle de mümkündür."`, tip: `Bugün haksız bir duruma şefkatle müdahale et — güç gösterisi olmadan.`, q1: `Bugün adaletsizlik karşısında nasıl tepki verdin?`, q2: `Güç ile şefkati bir arada kullanmak mümkün mü?` },
    { affirmation: `"Gerçek hislerimi paylaştığımda insanlar benden uzaklaşmaz; tam tersine yakınlaşır."`, tip: `Bugün güvendiğin birine gerçek hissini paylaş — filtrelemeden.`, q1: `Bugün zırhını indirdiğin bir an oldu mu?`, q2: `Kim yanındayken gerçekten kendin olabiliyorsun?` },
  ],
  9: [
    { affirmation: `"Benim varlığım önemli. Sesimi yükseltmek, uyumu bozmaz — onu derinleştirir."`, tip: `Bugün küçük bir şeyde kendi tercihini öne koy — ne yemek istediğin, nereye gitmek istediğin.`, q1: `Bugün kendini geri çektiğin bir an oldu mu? O an ne hissediyordun?`, q2: `Bugün başkası için ne yaptın? Kendine ne yaptın?` },
    { affirmation: `"Uyum sağlamak güzel; ama kaybolmadan uyum sağlamak daha güçlü."`, tip: `Bugün bir görüşünü paylaş — muhalif de olsa. Sadece bir cümle yeterli.`, q1: `Bugün fikrini söylemekten kaçındığın bir an var mıydı?`, q2: `Sessiz kaldığında ne kazanıyorsun, ne kaybediyorsun?` },
    { affirmation: `"Harekete geçmek mükemmel zamanı beklemeyi gerektirmez."`, tip: `Bugün ertelediğin bir şeye sadece 10 dakika başla — bitirmek zorunda değilsin.`, q1: `Bugün başlamayı ertelediğin bir şey var mıydı?`, q2: `Ertelemenin altında ne yatıyor — korku mu, ilgisizlik mi, yorgunluk mu?` },
    { affirmation: `"Çatışmadan kaçmak huzur değil; gerçek huzur içimden gelir."`, tip: `Bugün zor ama gerekli bir konuşmayı başlat — saygılı ama net ol.`, q1: `Bugün bir çatışmadan kaçtın mı? Ne hissettin?`, q2: `Çatışma sende ne uyandırıyor?` },
    { affirmation: `"Kendime iyi baktığımda, etrafımdakilere de daha iyi bakabilirim."`, tip: `Bugün 'ben ne istiyorum?' sorusunu üç kez sor — ve cevabını dinle.`, q1: `Bugün kendi ihtiyaçlarını fark edebildin mi?`, q2: `Kendi ihtiyaçlarını ifade etmek sana zor geliyor mu?` },
    { affirmation: `"Enerjimi doğru yere akıtmak, herkese evet demekten daha değerlidir."`, tip: `Bugün bir isteği nazikçe reddet — seni tüketecek bir şeyi.`, q1: `Bugün enerji tüketen ama 'hayır' diyemediğin bir şey oldu mu?`, q2: `Hayır demek seni nasıl hissettiriyor?` },
    { affirmation: `"Ben de masanın etrafındayım; görüşlerim değer taşır."`, tip: `Bugün bir toplantıda ya da sohbette en az bir kez fikrini paylaş.`, q1: `Bugün görünmez hissettiğin bir an oldu mu?`, q2: `Sesini yükseltmek için neye ihtiyacın var?` },
  ],
};

const ML_BASE = "https://connect.mailerlite.com/api";

function mlHeaders() {
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
  };
}

function getContent(tip) {
  const dayIndex = new Date().getDay(); // 0=Pazar, 1=Pazartesi ... 6=Cumartesi
  return CONTENT[tip][dayIndex];
}

async function sendCampaign(tip, content) {
  const groupId   = process.env[`MAILERLITE_GROUP_TIP_${tip}`];
  const fromEmail = process.env.MAILERLITE_FROM_EMAIL;
  const fromName  = process.env.MAILERLITE_FROM_NAME || "OANDA Enneagram";
  const tipName   = tipNames[tip];
  const today     = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  const createRes = await fetch(`${ML_BASE}/campaigns`, {
    method: "POST",
    headers: mlHeaders(),
    body: JSON.stringify({
      name: `Tip ${tip} - ${today}`,
      type: "regular",
      emails: [{
        subject: `Günlük Enneagram — Tip ${tip} için bugün 🌱`,
        from_name: fromName,
        from: fromEmail,
        content: buildEmailHtml(tip, tipName, today, content),
      }],
      groups: [groupId],
    }),
  });

  const campaign = await createRes.json();
  if (!createRes.ok) throw new Error(`Campaign create: ${JSON.stringify(campaign)}`);

  const scheduleRes = await fetch(`${ML_BASE}/campaigns/${campaign.data.id}/schedule`, {
    method: "POST",
    headers: mlHeaders(),
    body: JSON.stringify({ delivery: "instant" }),
  });

  if (!scheduleRes.ok) {
    const err = await scheduleRes.json();
    throw new Error(`Schedule error: ${JSON.stringify(err)}`);
  }

  return campaign.data.id;
}

function buildEmailHtml(tip, tipName, date, content) {
  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#F5F2EB;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;}
  .wrap{max-width:560px;margin:32px auto;background:#FDFAF4;border-radius:16px;overflow:hidden;}
  .header{background:#1C1A15;padding:24px 28px;display:flex;align-items:center;gap:14px;}
  .badge{width:42px;height:42px;border-radius:50%;background:#5DCAA5;font-size:20px;font-weight:600;color:#04342C;text-align:center;line-height:42px;flex-shrink:0;}
  .eyebrow{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#888780;margin:0 0 2px;}
  .ml-title{font-size:18px;color:#F1EFE8;margin:0;}
  .date{font-size:12px;color:#888780;margin-left:auto;}
  .body{padding:28px;}
  .label{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1D9E75;margin:0 0 10px;}
  .affirmation{border-left:3px solid #5DCAA5;padding:14px 18px;background:#E1F5EE;border-radius:0 10px 10px 0;font-style:italic;font-size:16px;color:#085041;line-height:1.55;margin:0;}
  .tip-text{font-size:14px;color:#1C1A15;line-height:1.75;margin:0;}
  .q-box{background:#F1EFE8;border-radius:10px;padding:12px 16px;font-size:13px;color:#5F5E5A;line-height:1.6;margin-bottom:8px;}
  .divider{border:none;border-top:1px solid rgba(28,26,21,.1);margin:20px 0;}
  .footer{display:flex;justify-content:space-between;font-size:12px;color:#888780;}
  .footer a{color:#888780;}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="badge">${tip}</div>
    <div>
      <div class="eyebrow">Günlük Enneagram</div>
      <div class="ml-title">Tip ${tip} — ${tipName}</div>
    </div>
    <div class="date">${date}</div>
  </div>
  <div class="body">
    <div class="label">Günün Affirmasyonu</div>
    <p class="affirmation">${content.affirmation}</p>
    <hr class="divider">
    <div class="label">Bugün için bir ipucu</div>
    <p class="tip-text">${content.tip}</p>
    <hr class="divider">
    <div class="label">Akşam refleksiyonu</div>
    <div class="q-box">${content.q1}</div>
    <div class="q-box">${content.q2}</div>
    <hr class="divider">
    <div class="footer">
      <span>Yarın da seninle olacağız.</span>
      <a href="{$unsubscribe}">Aboneliği iptal et</a>
    </div>
  </div>
</div>
</body></html>`;
}

export default async function handler(req, res) {
  const cronSecret = req.headers["x-cron-secret"];
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const results = [];
  const errors  = [];

  for (let tip = 1; tip <= 9; tip++) {
    if (!process.env[`MAILERLITE_GROUP_TIP_${tip}`]) continue;
    try {
      const content    = getContent(tip);
      const campaignId = await sendCampaign(tip, content);
      results.push({ tip, campaignId, ok: true });
      console.log(`✅ Tip ${tip} gönderildi — campaign: ${campaignId}`);
    } catch (err) {
      errors.push({ tip, error: err.message });
      console.error(`❌ Tip ${tip} hatası:`, err.message);
    }
  }

  return res.status(200).json({ results, errors });
}
