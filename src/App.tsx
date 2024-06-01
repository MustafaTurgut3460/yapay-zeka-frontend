import { Icon } from "@iconify/react";
import { Button, Input, Progress, Select, Steps, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import MultipleCircleProgress from "./components/MultipleCircleProgress";
import SingleCircleProgress from "./components/SingleCircleProgress";
import axios from "axios";
import { generateRandomString } from "./services/helper";
import { CreateTestType, StudentFormType } from "./types";

interface OptionsType {
  gender: { label: string; value: string }[];
  age: { label: string; value: string }[];
  location: { label: string; value: string }[];
  educationLevel: { label: string; value: string }[];
  institutionType: { label: string; value: string }[];
  iTStudent: { label: string; value: string }[];
  financialCondition: { label: string; value: string }[];
  internetType: { label: string; value: string }[];
  networkType: { label: string; value: string }[];
  classDuration: { label: string; value: string }[];
  selfLms: { label: string; value: string }[];
  device: { label: string; value: string }[];
}

const options: OptionsType = {
  gender: [
    {
      label: "Erkek",
      value: "0",
    },
    {
      label: "Kadın",
      value: "1",
    },
  ],
  educationLevel: [
    {
      label: "Kolej",
      value: "0",
    },
    {
      label: "Ortaokul-Lise",
      value: "1",
    },
    {
      label: "Üniversite",
      value: "2",
    },
  ],
  institutionType: [
    {
      label: "Devlet Okulu",
      value: "0",
    },
    {
      label: "Özel Okul",
      value: "1",
    },
  ],
  iTStudent: [
    {
      label: "Evet",
      value: "0",
    },
    {
      label: "Hayır",
      value: "1",
    },
  ],
  age: [
    {
      label: "1-5",
      value: "0",
    },
    {
      label: "6-10",
      value: "5",
    },
    {
      label: "11-15",
      value: "1",
    },
    {
      label: "16-20",
      value: "2",
    },
    {
      label: "21-25",
      value: "3",
    },
    {
      label: "26-30",
      value: "4",
    },
  ],
  location: [
    {
      label: "Şehir Merkezinde",
      value: "0",
    },
    {
      label: "Şehir Merkezine Uzak",
      value: "1",
    },
  ],
  financialCondition: [
    {
      label: "İyi",
      value: "0",
    },
    {
      label: "Orta",
      value: "1",
    },
    {
      label: "Kötü",
      value: "2",
    },
  ],
  internetType: [
    {
      label: "Mobil Veri",
      value: "0",
    },
    {
      label: "Wifi",
      value: "1",
    },
  ],
  networkType: [
    {
      label: "2G",
      value: "0",
    },
    {
      label: "3G",
      value: "1",
    },
    {
      label: "4G",
      value: "2",
    },
  ],
  classDuration: [
    {
      label: "0 saat",
      value: "0",
    },
    {
      label: "1-3 saat",
      value: "1",
    },
    {
      label: "3-6 saat",
      value: "2",
    },
  ],
  selfLms: [
    {
      label: "Var",
      value: "0",
    },
    {
      label: "Yok",
      value: "1",
    },
  ],
  device: [
    {
      label: "Bilgisayar",
      value: "0",
    },
    {
      label: "Telefon",
      value: "1",
    },
    {
      label: "Tablet",
      value: "2",
    },
  ],
};

const httpService = axios.create({
  baseURL: "http://localhost:35000/",
  headers: {
    "Content-Type": "application/json",
  },
});

const results = ["Kötü Seviye", "Orta Seviye", "İyi Seviye"]

function App() {
  const [appMode, setAppMode] = useState("login"); // login, test_student, test_teacher, test_start_1, test_start_2, test_finish, test_start_teacher,
  const [testCodeCopy, setTestCodeCopy] = useState(false);
  const progressSegments = [25, 35, 40]; // Her renk için ilerleme yüzdeleri
  const colors = ["#059669", "#FACC15", "#EF4444"]; // Renkler
  const [randomTestCode, setRandomTestCode] = useState(generateRandomString(6));
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [joinTestCode, setJoinTestCode] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testResult, setTestResult] = useState(0);
  const [surveyData, setSurveyData] = useState<StudentFormType>({
    Age: 0,
    Class_Duration: 0,
    Device: 0,
    Education_Level: 0,
    Financial_Condition: 0,
    Gender: 0,
    Institution_Type: 0,
    Internet_Type: 0,
    IT_Student: 0,
    Load_shedding: 0,
    Location: 0,
    Network_Type: 0,
    Self_Lms: 0,
    test_code: joinTestCode,
  });
  const [surveyStatisticInfo, setSurveyStatisticInfo] = useState({
    high_score: 0,
    moderate_score: 0,
    low_score: 0,
  });

  const joinTest = () => {
    if (name.length < 2 || joinTestCode.length !== 6) {
      messageApi.open({
        type: "warning",
        content: "Lütfen geçerli bir isim ve test kodu giriniz",
      });

      return;
    }

    setLoading(true);

    const data = {
      test_code: joinTestCode,
      student: name,
    };
    httpService
      .put("joinTest", data)
      .then((res) => {
        if (res.status === 200) {
          setSurveyData({ ...surveyData, test_code: joinTestCode });
          setAppMode("test_student");
          messageApi.open({
            type: "success",
            content: "Teste başarıyla katıldın!",
          });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const isTestStartedFunc = () => {
    setLoading(true);
    httpService
      .get(`/isTestStarted/${joinTestCode}`)
      .then((res) => {
        setIsTestStarted(res.data.isStarted);
      })
      .catch((e) => setIsTestStarted(false)).finally(() => setLoading(false));
  };

  const startTest = async () => {
    setLoading(true);
    const res = await httpService.put(`/startTest/${randomTestCode}`);

    if (res.status === 200) {
      setIsTestStarted(true);
      setAppMode("test_start_teacher");
    }

    setLoading(false);

    return setIsTestStarted(false);
  };

  const finishTest = () => {
    if (appMode === "test_start_1") {
      setAppMode("test_start_2");
      return;
    }

    setLoading(true);

    httpService
      .post("survey", surveyData)
      .then((res) => {
        setTestResult(res.data.prediction);
        setAppMode("test_finish");
      })
      .catch((e) => console.log(e)).finally(() => setLoading(false));
  };

  const createTest = () => {
    setLoading(true);
    const data: CreateTestType = {
      high_score: 0,
      isStarted: false,
      low_score: 0,
      moderate_score: 0,
      students: [],
      test_code: randomTestCode,
    };
    httpService
      .post("test", data)
      .then((res) => {
        localStorage.setItem("test_id", res?.data?.test_id);
        setAppMode("test_teacher");
        messageApi.open({
          type: "success",
          content: "Test başarıyla oluşturuldu!",
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  const getStudents = () => {
    setLoading(true);
    httpService
      .get(`/testInfos/${randomTestCode}`)
      .then((res) => {
        setStudents(res.data?.students);
      })
      .catch((e) => console.log(e)).finally(() => setLoading(false));
  };

  const updateStudentStatistics = () => {
    setLoading(true);
    httpService
      .get(`/testInfos/${randomTestCode}`)
      .then((res) => {
        setSurveyStatisticInfo({
          high_score: res.data.high_score,
          low_score: res.data.low_score,
          moderate_score: res.data.moderate_score,
        });
        setStudents(res.data.students);
      })
      .catch((e) => console.log(e)).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (appMode === "test_teacher") {
      const intervalId = setInterval(getStudents, 5000);
      return () => clearInterval(intervalId);
    } else if (appMode === "test_student") {
      const intervalId = setInterval(isTestStartedFunc, 5000);
      return () => clearInterval(intervalId);
    } else if (appMode === "test_start_teacher") {
      const intervalId = setInterval(updateStudentStatistics, 5000);
      return () => clearInterval(intervalId);
    }
  }, [appMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTestCodeCopy(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [testCodeCopy]);

  return (
    <div className="bg-orange-200 w-screen h-screen relative duration-300 transition-all">
      {contextHolder}
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
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p className="text-orange-700 mt-8 font-semibold">Teste Gir</p>
              <Input
                placeholder="Test kodunu giriniz"
                className="mt-1"
                size="large"
                onChange={(e) => setJoinTestCode(e.target.value)}
                value={joinTestCode}
              />
              <Button
                className="mt-4 font-semibold"
                type="primary"
                block
                size="large"
                onClick={joinTest}
                loading={loading}
              >
                Teste Gir
              </Button>

              <p className="text-orange-700 mt-12 font-semibold">
                Test Oluştur
              </p>
              <div className="flex space-x-2 items-center mt-2">
                <p className="text-xl">{randomTestCode}</p>
                <Tooltip title="Yeni Kod Oluştur">
                  <Icon
                    onClick={() => setRandomTestCode(generateRandomString(6))}
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
                onClick={createTest}
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
                disabled={!isTestStarted}
                loading={loading}
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
                  <p className="text-2xl">{randomTestCode}</p>
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
                        await navigator.clipboard.writeText(randomTestCode);
                        setTestCodeCopy(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="mt-8">
                <div className="grid grid-cols-12 gap-4">
                  {students?.map((item) => (
                    <div className="px-4 py-2 rounded-md bg-orange-200 text-orange-700 col-span-4 overflow-hidden flex justify-center items-center">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center text-blue-500 mt-10">
                  Katılımcılar bekleniyor... ({students.length})
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
                  <Button block type="primary" size="large" onClick={startTest} loading={loading}>
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
                          options={options.gender}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Gender: parseInt(value),
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Yaş</p>
                        <Select
                          options={options.age}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Age: parseInt(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Konum</p>
                        <Select
                          options={options.location}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Location: parseInt(value),
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">
                          Ailenin Mali Durumu
                        </p>
                        <Select
                          options={options.financialCondition}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Financial_Condition: parseInt(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">İnternet Tipi</p>
                        <Select
                          options={options.internetType}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Internet_Type: parseInt(value),
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Ağ Tipi</p>
                        <Select
                          options={options.networkType}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Network_Type: parseInt(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-12 mt-6">
                      <p className="text-sm text-gray-600">Kullanılan Cihaz</p>
                      <Select
                        options={options.device}
                        placeholder="Seçiniz"
                        className="w-full mt-1"
                        size="large"
                        onChange={(value) =>
                          setSurveyData({
                            ...surveyData,
                            Device: parseInt(value),
                          })
                        }
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
                          options={options.educationLevel}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Education_Level: parseInt(value),
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">Okul Tipi</p>
                        <Select
                          options={options.institutionType}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Institution_Type: parseInt(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-6">
                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">IT Öğrencisi</p>
                        <Select
                          options={options.iTStudent}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              IT_Student: parseInt(value),
                            })
                          }
                        />
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-600">
                          Günlük Ders Süresi
                        </p>
                        <Select
                          options={options.classDuration}
                          placeholder="Seçiniz"
                          className="w-full mt-1"
                          size="large"
                          onChange={(value) =>
                            setSurveyData({
                              ...surveyData,
                              Class_Duration: parseInt(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-span-12 mt-6">
                      <p className="text-sm text-gray-600">
                        Okulun Kendi Sistemi
                      </p>
                      <Select
                        options={options.selfLms}
                        placeholder="Seçiniz"
                        className="w-full mt-1"
                        size="large"
                        onChange={(value) =>
                          setSurveyData({
                            ...surveyData,
                            Self_Lms: parseInt(value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2 absolute bottom-8 right-8 font-semibold">
                  {appMode === "test_start_2" && (
                    <Button
                      className=""
                      size="large"
                      type="dashed"
                      onClick={() => setAppMode("test_start_1")}
                    >
                      Önceki Form
                    </Button>
                  )}

                  <Button
                    className=""
                    size="large"
                    type="primary"
                    onClick={finishTest}
                    loading={loading}
                  >
                    {appMode === "test_start_1" ? "Sonraki" : "Testi Tamamla"}
                  </Button>
                </div>
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
                  {results[testResult-1]}
                </div>
              </div>

              <Button
                type="dashed"
                block
                size="large"
                className="mt-10"
                onClick={() => setAppMode("login")}
                loading={loading}
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
                  <p className="text-2xl">{randomTestCode}</p>
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
                        await navigator.clipboard.writeText(randomTestCode);
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
                        progress={
                          ((surveyStatisticInfo.high_score +
                            surveyStatisticInfo.low_score +
                            surveyStatisticInfo.moderate_score) /
                            students.length) *
                          100
                        }
                        color={"#C2410C"}
                        text={`%${(
                          ((surveyStatisticInfo.high_score +
                            surveyStatisticInfo.low_score +
                            surveyStatisticInfo.moderate_score) /
                            students.length) *
                          100
                        ).toFixed(2)}`}
                      />
                    </div>
                    <p className="text-center mt-4">Test Tamamlanma Oranı</p>
                  </div>

                  <div className="col-start-5 col-span-4 mt-10">
                    <div className="flex justify-center">
                      <MultipleCircleProgress
                        progressSegments={[
                          (surveyStatisticInfo.high_score /
                            (surveyStatisticInfo.high_score +
                              surveyStatisticInfo.low_score +
                              surveyStatisticInfo.moderate_score)) *
                            100,
                          (surveyStatisticInfo.moderate_score /
                            (surveyStatisticInfo.high_score +
                              surveyStatisticInfo.low_score +
                              surveyStatisticInfo.moderate_score)) *
                            100,
                          (surveyStatisticInfo.low_score /
                            (surveyStatisticInfo.high_score +
                              surveyStatisticInfo.low_score +
                              surveyStatisticInfo.moderate_score)) *
                            100,
                        ]}
                        colors={colors}
                        text={`${
                          surveyStatisticInfo.high_score +
                          surveyStatisticInfo.low_score +
                          surveyStatisticInfo.moderate_score
                        } Kişi`}
                      />
                    </div>
                    <p className="text-center mt-4">Test Sonuç Dağılımı</p>
                    <p className="text-center mt-2 text-emerald-700 font-medium">
                      %
                      {(
                        (surveyStatisticInfo.high_score /
                          (surveyStatisticInfo.high_score +
                            surveyStatisticInfo.low_score +
                            surveyStatisticInfo.moderate_score)) *
                        100
                      ).toFixed(2)}{" "}
                      Uygun
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-10 font-semibold"
                  block
                  size="large"
                  type="primary"
                  onClick={() => setAppMode("login")}
                  loading={loading}
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
