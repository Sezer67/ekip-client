# Seller

\*\*\* Tedarikçilerim oluştur. Kullanıcı onları takip edebilsin (maybe chat)
path="my-products"
edit işlemi yapılacak Form un yanında tüm bilgiler listelenecek.
satışlarım sayfası yapılacak chart eklenecek
add product sayfasına loading eklenecek

product ın içerisinde favoritelist (backendden o kişinin favorilerini döndürecek)
favotire table oluşturulacak.

# Customer

Product.tsx product page de satıcıyı takip et
Favorilere ekle
Spiariş ver

FAVORİLER CUSTOMER + (product page favorilere ekle kontrol edilecek)

NOTIFICATION ALL
TAKIP ETTIKLERIM (customer follow page desing + seller -)
(MESAJ)
AUTH DOLDUĞUNDA LOGIN E AT
HER ISTEKTEN YANIT DÖNENE KADAR LOADING GLOBAL LOADING (notf state e loading prop u eklendi onun üzernde işlemler yapılacak.)
// customer okey.

SELLER
en çok satılan ürünüm , en sadık müşterim query i nasıl kuracağım
satışlarım kısmındaki ilk tabloya ay değiştirme eklenmeli ++++

admin günlük satış listesi (query) ++++
admin color pick;
öneri kutusu +++
öneriden update tammalanacak ++
öneriye destek +++
öneri sayfasında bir de şikayet kısmı +++

add column isFreeze in user table; ++++
en çok satanlar

FEATURE
ürünü satın alan kişiler değerlendirme yapabilsin.
yorumların üzerinde satın alan kullanıcılardan yazsın (eğer öyleyse)

backend => product comments table
product table => description, degerlendirme sayısı , degerlendirme puanı

ürün update description eklenecek seller tarafında **Done**

customer tarafında ise rating ler ekleencek
prdouct table içerisinde satın alanlar array i (user-id) tutulsun.
satın alan müşteri giriş yapılı ise o rating verebilir.

yorumların başında da satın alan kişilerdendir. yazması için comment deki userid ile kontrol edilecek. Yorumlar müşteri onclick yaptığında getirilecek.
Frontend yorumları görüntüle func. yazılacak.
Backend table create
id,userId,productId,comment,date,ref (null | comment.id)

değerlendirmeler tablosu **Done**
id, productid, userid , isRating (bool);**Done**
product sayfasına girdiğinde o ürün ve kullanıcı çekilecek. (comment)
eğer değerlendirme yapmadıysa değerlendirme modal i açılacak. **Done**

seller tarafında kategori create etmek eklenecek. **Done**

BUGS
hesap log out işleminde followers state i sıfırlanacak. **fixed**
seller hesabı my products page de product card click düzenlenecek. **fixed**
öneri şikayet sayfasında admin yanıtı yerine kullanıcı description gösteriliyor. **fixed**
hesap isFreeze ise login olamayacak. Uyarı yesin.**need test** **closed now**
user update den role kaldırılacak.**fixed**
ProductCard min h ayarlarsın **fixed**
product page de refresh yiyince best statistic gidiyor app de istek yolla **Fixed**

TODOS 18 NOVEMBER
kayıt olurken role seçme **Done**
404 not found sayfasına geri dön butonu **Done**
seller / staışlarım sayfasında yıllık satış empty yüklenecek. **Done**
isFreeze olan hesap login olamayacak. Bir modal ile engellendiği mesajı verilecek. **Done**
ProductCard yeniden yapılacak. **Done**
Yorum ve iç içe yorum test edilecek. **Done** **need detailed tested**
çok satanlar içerisinde gelen rating yakalanacak. **Done**
Tab ların renklerini ayarla

BUG
kullanıcı satın almadığı halde satın alanlardan yazısı çıkıyor. **fixed**

Nginx kurulumu.
Dropdown en yeniler sıralaması yapılacak.