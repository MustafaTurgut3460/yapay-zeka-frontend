import { Icon } from "@iconify/react";
import { Button, Input, Progress, Select, Steps, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import MultipleCircleProgress from "./components/MultipleCircleProgress";
import SingleCircleProgress from "./components/SingleCircleProgress";

function App() {
  const [appMode, setAppMode] = useState("test_start_teacher"); // login, test_student, test_teacher, test_start_1, test_start_2, test_finish, test_start_teacher,
  const [testCodeCopy, setTestCodeCopy] = useState(false);
  const progressSegments = [25, 35, 20]; // Her renk için ilerleme yüzdeleri
  const colors = ["#059669", "#FACC15", "#EF4444"]; // Renkler

  useEffect(() => {
    const timer = setTimeout(() => {
      setTestCodeCopy(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [testCodeCopy]);

  return (
    <div className="bg-orange-200 w-screen h-screen relative duration-300 transition-all">
      <div className={`flex justify-center items-center -space-x-48 h-full`}>
        <div
          className={`bg-white my-20 rounded-2xl backdrop-blur-sm bg-white/80 p-8 z-20 relative`}
        >
          {/* ilk giriş ekranı */}
          {appMode === "login" && (
            <div>
              <div>ICON</div>
              <p className="mt-10 text-xl mb-2">HOŞGELDİN!</p>
              <p className="text-sm text-gray-500">
                Bir teste girmek için lütfen test kodu giriniz veya yeni bir
                test oluşturun.
              </p>
              <Input
                placeholder="İsminizi giriniz"
                className="mt-4"
                size="large"
              />
              <p className="text-orange-700 mt-8 font-semibold">Teste Gir</p>
              <Input
                placeholder="Test kodunu giriniz"
                className="mt-1"
                size="large"
              />
              <Button
                className="mt-4 font-semibold"
                type="primary"
                block
                size="large"
                onClick={() => setAppMode("test_student")}
              >
                Teste Gir
              </Button>

              <p className="text-orange-700 mt-12 font-semibold">
                Test Oluştur
              </p>
              <div className="flex space-x-2 items-center mt-2">
                <p className="text-xl">AS2TM</p>
                <Tooltip title="Yeni Kod Oluştur">
                  <Icon
                    icon={"flowbite:refresh-outline"}
                    className="text-gray-500 cursor-pointer hover:text-gray-800 text-xl"
                  />
                </Tooltip>
              </div>
              <Button
                className="mt-4 font-medium"
                type="dashed"
                block
                size="large"
                onClick={() => setAppMode("test_teacher")}
              >
                Test Oluştur
              </Button>
            </div>
          )}

          {/* öğrenci teste katıldı */}
          {appMode === "test_student" && (
            <div>
              <div>ICON</div>

              <div className="flex justify-center mt-10">
                <img
                  src={require("./assets/illustrations/teste_katildi.png")}
                  alt=""
                  className="h-48"
                />
              </div>
              <p className="text-xl font-medium text-center mt-4">
                Test Başarıyla Katıldınız !
              </p>
              <p className="text-sm text-gray-500 text-center mt-1">
                Lütfen testi oluşturan kullanıcının testi başlatmasını bekleyin.
              </p>
              <Button
                type="primary"
                size="large"
                className="font-semibold mt-4"
                block
                onClick={() => setAppMode("test_start_1")}
              >
                Teste Gir!
              </Button>
            </div>
          )}

          {/* öğretmen test başlattı */}
          {appMode === "test_teacher" && (
            <div>
              <div className="flex justify-between items-center">
                <div>ICON</div>
                <div className="flex space-x-2 items-center">
                  <p className="text-2xl">S35DX</p>
                  {testCodeCopy ? (
                    <Icon
                      icon={"charm:tick-double"}
                      className="text-gray-400 cursor-pointer text-xl -mt-1"
                    />
                  ) : (
                    <Icon
                      icon={"streamline:copy-paste"}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer text-xl"
                      onClick={async () => {
                        await navigator.clipboard.writeText("code")
                        setTestCodeCopy(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="mt-8">
                <div className="grid grid-cols-12 gap-4">
                  <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 overflow-hidden flex justify-center items-center">
                    Mustafa Turgut
                  </div>

                  <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 text-center overflow-hidden flex justify-center items-center">
                    Mustafa Turgut
                  </div>

                  <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 text-center overflow-hidden flex justify-center items-center">
                    Mustafa Emirhan Yıldız
                  </div>

                  <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 text-center overflow-hidden flex justify-center items-center">
                    Taha Yasin Muslu
                  </div>

                  <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 text-center overflow-hidden flex justify-center items-center">
                    Mustafa Turgut
                  </div>
                </div>

                <div className="flex justify-center text-blue-500 mt-10">
                  Katılımcılar bekleniyor... (15)
                </div>

                <div className="flex items-center space-x-4 mt-10">
                  <Button
                    block
                    type="dashed"
                    size="large"
                    onClick={() => setAppMode("login")}
                  >
                    İptal Et
                  </Button>
                  <Button
                    block
                    type="primary"
                    size="large"
                    onClick={() => setAppMode("test_start_teacher")}
                  >
                    Testi Başlat
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* test başladı */}
          {(appMode === "test_start_1" || appMode === "test_start_2") && (
            <div>
              <div className="grid grid-cols-12 gap-4 h-[80vh]">
                <div className="h-full bg-orange-200 col-span-4 rounded-xl py-4 px-8">
                  <div>ICON</div>
                  <p className="mt-4 text-base text-orange-700">
                    Uzaktan Eğitim Uygunluk Testi
                  </p>
                  <Steps
                    direction="vertical"
                    className="mt-10 h-48"
                    current={1}
                    items={[
                      {
                        title: "Kişisel Bilgiler",
                      },
                      {
                        title: "Okul Bilgileri",
                      },
                    ]}
                  />
                </div>
                {/* Kişisel Bilgiler Formu */}
                {appMode === "test_start_1" && (
                  <div className="h-full col-span-8">
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Cinsiyet</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Yaş</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Konum</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">
                          Ailenin Mali Durumu
                        </p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">İnternet Tipi</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Ağ Tipi</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>
                    </div>

                    <div className="col-span-12 mt-6">
                      <p className="text-sm text-gray-600">Kullanılan Cihaz</p>
                      <Select
                        options={[]}
                        placeholder="Seçiniz"
                        className="w-full mt-1"
                        size="large"
                      />
                    </div>
                  </div>
                )}

                {/* Okul Bilgileri Formu */}
                {appMode === "test_start_2" && (
                  <div className="h-full col-span-8">
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Eğitim Seviyesi</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Okul Tipi</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">IT Öğrencisi</p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">
                          Günlük Ders Süresi
                        </p>
                        <Select
                          options={[]}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                        />
                      </div>
                    </div>

                    <div className="col-span-12 mt-6">
                      <p className="text-sm text-gray-600">
                        Okulun Kendi Sistemi
                      </p>
                      <Select
                        options={[]}
                        placeholder="Seçiniz"
                        className="w-full mt-1"
                        size="large"
                      />
                    </div>
                  </div>
                )}

                <Button
                  className="absolute bottom-8 right-8 font-semibold"
                  size="large"
                  type="primary"
                  onClick={() =>
                    setAppMode(
                      appMode === "test_start_2"
                        ? "test_finish"
                        : "test_start_2"
                    )
                  }
                >
                  {appMode === "test_start_1" ? "Sonraki" : "Testi Tamamla"}
                </Button>
              </div>
            </div>
          )}

          {/* test tamamlandı öğrenci */}
          {appMode === "test_finish" && (
            <div className="w-full">
              <div className="flex justify-center">
                <img
                  src={require("./assets/illustrations/ok.png")}
                  alt=""
                  className="w-24 h-24"
                />
              </div>
              <p className="text-xl mt-8">Uzaktan Eğitim Uygunluk Durumunuz</p>
              <div className="flex justify-center mt-4">
                <div className="rounded-md border border-solid border-emerald-300 text-emerald-600 bg-emerald-100 py-2 px-8 text-center w-min">
                  Yüksek
                </div>
              </div>

              <Button
                type="dashed"
                block
                size="large"
                className="mt-10"
                onClick={() => setAppMode("login")}
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          )}

          {/* test öğretmen tamamlıyor */}
          {appMode === "test_start_teacher" && (
            <div>
              <div className="flex justify-between items-center">
                <div>ICON</div>
                <div className="flex space-x-2 items-center">
                  <p className="text-2xl">S35DX</p>
                  {testCodeCopy ? (
                    <Icon
                      icon={"charm:tick-double"}
                      className="text-gray-400 cursor-pointer text-xl -mt-1"
                    />
                  ) : (
                    <Icon
                      icon={"streamline:copy-paste"}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer text-xl"
                      onClick={async () => {
                        await navigator.clipboard.writeText("code")
                        setTestCodeCopy(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="mt-8">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-start-5 col-span-4">
                    <div className="flex justify-center">
                      <SingleCircleProgress
                        progress={60}
                        color={"#C2410C"}
                        text="%60"
                      />
                    </div>
                    <p className="text-center mt-4">Test Tamamlanma Oranı</p>
                  </div>

                  <div className="col-start-5 col-span-4 mt-10">
                    <div className="flex justify-center">
                      <MultipleCircleProgress
                        progressSegments={progressSegments}
                        colors={colors}
                        text={"8 Kişi"}
                      />
                    </div>
                    <p className="text-center mt-4">Test Tamamlanma Oranı</p>
                  </div>
                </div>
                <Button
                  className="mt-10 font-semibold"
                  block
                  size="large"
                  type="primary"
                  onClick={() => setAppMode("login")}
                >
                  Testi Sonlandır
                </Button>
              </div>
            </div>
          )}
        </div>
        <img
          src={require("./assets/illustrations/main.png")}
          alt=""
          className="h-screen absolute right-10 top-0 z-10"
        />
      </div>
    </div>
  );
}

export default App;
