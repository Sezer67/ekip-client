import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { icons } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { setUser } from "../../redux/userSlice/userSlice";
import { userService } from "../../service";
import { PaymentDataType } from "./balance.config";

const Balance = () => {
  const [paymentData, setPaymentData] = useState<PaymentDataType>({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
    focused: "name",
  });

  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;

    setPaymentData({ ...paymentData, number: value.trim(), focused: "number" });
  };

  const handleFinish = async (values: { balance: number }) => {
    try {
      const { data } = await userService.updateUser(userState.user.id, {
        balance: values.balance,
      });
      setPaymentData({
        cvc: "",
        expiry: "",
        name: "",
        number: "",
        focused: "name",
      });
      dispatch(setUser(data));
      dispatch(
        setNotification({
          message: "Tebrikler",
          description: "Bakiyeniz hesabınıza aktarıldı",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "Bakiye Yükleme Başarısız",
          description: error.response.data.message[0],
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  // return (
  //   <div className="p-3">
  //     <div className="w-full flex flex-row flex-wrap">
  //       <div className="flex flex-col justify-start space-y-6">
  //         <Cards
  //           cvc={paymentData.cvc}
  //           expiry={paymentData.expiry}
  //           name={paymentData.name}
  //           number={paymentData.number.replaceAll("-", "")}
  //           placeholders={{ name: "AD SOYAD" }}
  //           focused={paymentData.focused}
  //           locale={{ valid: "Son Kullanma Tarihi" }}
  //         />
  //         <Form
  //           layout="vertical"
  //           className="max-w-[300px]"
  //           onFinish={handleFinish}
  //         >
  //           <Form.Item label="Ad Soyad" required>
  //             <Input
  //               inputMode="text"
  //               maxLength={20}
  //               onFocus={() =>
  //                 setPaymentData({ ...paymentData, focused: "name" })
  //               }
  //               value={paymentData.name}
  //               onChange={(event) =>
  //                 setPaymentData({
  //                   ...paymentData,
  //                   name: event.target.value,
  //                 })
  //               }
  //             />
  //           </Form.Item>
  //           <Form.Item label="Kart Numarası" required>
  //             <Input
  //               onFocus={() =>
  //                 setPaymentData({ ...paymentData, focused: "number" })
  //               }
  //               maxLength={16}
  //               inputMode="text"
  //               value={paymentData.number}
  //               onChange={(event) => handleNumberChange(event)}
  //             />
  //           </Form.Item>
  //           <Form.Item label="Son Kullanma Tarihi" required>
  //             <DatePicker
  //               onFocus={() =>
  //                 setPaymentData({ ...paymentData, focused: "expiry" })
  //               }
  //               className="w-[300px]"
  //               onChange={(val, date) => {
  //                 const bigYearControl =
  //                   Number(date.split("/")[1]) >
  //                   Number(new Date().getFullYear().toString().substring(2, 4));
  //                 const equalYearControl =
  //                   Number(date.split("/")[1]) ===
  //                   Number(new Date().getFullYear().toString().substring(2, 4));
  //                 const monthControl =
  //                   Number(date.split("/")[0]) > Number(new Date().getMonth());
  //                 if (bigYearControl || (equalYearControl && monthControl))
  //                   setPaymentData({
  //                     ...paymentData,
  //                     expiry: date,
  //                   });
  //                 else {
  //                   dispatch(
  //                     setNotification({
  //                       message: "Hatalı Giriş",
  //                       description: "Girdiğiniz tarih ileri bir zaman olmalı",
  //                       isNotification: true,
  //                       placement: "top",
  //                       status: "info",
  //                     })
  //                   );
  //                 }
  //               }}
  //               format={"MM/YY"}
  //               picker="month"
  //             />
  //           </Form.Item>
  //           <Form.Item label="CVC" required>
  //             <Input
  //               maxLength={3}
  //               inputMode="numeric"
  //               value={paymentData.cvc}
  //               onFocus={() => setPaymentData({ ...paymentData })}
  //               onChange={(event) =>
  //                 setPaymentData({
  //                   ...paymentData,
  //                   cvc: event.target.value,
  //                   focused: "cvc",
  //                 })
  //               }
  //             />
  //           </Form.Item>
  //           <Form.Item label="Yüklenecek Bakiye Tutarı" name="balance">
  //             <InputNumber
  //               min={0}
  //               defaultValue={0}
  //               max={10000}
  //               className="w-[300px]"
  //               addonAfter={"₺"}
  //             />
  //           </Form.Item>
  //           <Form.Item className="w-[300px]">
  //             <Button type="primary" htmlType="submit" className="float-right">
  //               BAKİYE YÜKLE
  //             </Button>
  //           </Form.Item>
  //         </Form>
  //       </div>
  //       <div className="sm:ml-6">
  //         <div className="flex flex-row border border-thirdy py-6 justify-center items-center w-[300px]">
  //           <img src={icons.wallet} alt="" className="w-8 h-8" />
  //           <div className="ml-6 flex flex-col items-center">
  //             <h3 className="text-primary text-base font-semibold">
  //               Mevcut Bakiyem
  //             </h3>
  //             <span className="font-mono text-primary text-base">
  //               {userState.user.balance} ₺
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="p-3 w-full h-full flex justify-center items-center">
      <div className="w-full flex flex-col flex-wrap justify-center items-center">
        <div className="flex flex-col justify-start items-center mr-4">
          <Cards
            cvc={paymentData.cvc}
            expiry={paymentData.expiry}
            name={paymentData.name}
            number={paymentData.number.replaceAll("-", "")}
            placeholders={{ name: "AD SOYAD" }}
            focused={paymentData.focused}
            locale={{ valid: "Son Kullanma Tarihi" }}
          />
          <div className="sm:ml-6">
            <div className="flex flex-row py-6 justify-center items-center">
              <img src={icons.wallet} alt="" className="w-6 h-6" />
              <div className="ml-6 flex flex-col items-center">
                <span className=" text-primary text-base">
                  {userState.user.balance} ₺
                </span>
              </div>
            </div>
          </div>
        </div>

        <Form
          layout="vertical"
          className="max-w-[300px]"
          onFinish={handleFinish}
        >
          <Form.Item label="Ad Soyad" required>
            <Input
              inputMode="text"
              maxLength={20}
              onFocus={() =>
                setPaymentData({ ...paymentData, focused: "name" })
              }
              value={paymentData.name}
              onChange={(event) =>
                setPaymentData({
                  ...paymentData,
                  name: event.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Kart Numarası" required>
            <Input
              onFocus={() =>
                setPaymentData({ ...paymentData, focused: "number" })
              }
              maxLength={16}
              inputMode="text"
              value={paymentData.number}
              onChange={(event) => handleNumberChange(event)}
            />
          </Form.Item>
          <Form.Item label="Son Kullanma Tarihi" required>
            <DatePicker
              onFocus={() =>
                setPaymentData({ ...paymentData, focused: "expiry" })
              }
              className="w-[300px]"
              onChange={(val, date) => {
                const bigYearControl =
                  Number(date.split("/")[1]) >
                  Number(new Date().getFullYear().toString().substring(2, 4));
                const equalYearControl =
                  Number(date.split("/")[1]) ===
                  Number(new Date().getFullYear().toString().substring(2, 4));
                const monthControl =
                  Number(date.split("/")[0]) > Number(new Date().getMonth());
                if (bigYearControl || (equalYearControl && monthControl))
                  setPaymentData({
                    ...paymentData,
                    expiry: date,
                  });
                else {
                  dispatch(
                    setNotification({
                      message: "Hatalı Giriş",
                      description: "Girdiğiniz tarih ileri bir zaman olmalı",
                      isNotification: true,
                      placement: "top",
                      status: "info",
                    })
                  );
                }
              }}
              format={"MM/YY"}
              picker="month"
            />
          </Form.Item>
          <Form.Item label="CVC" required>
            <Input
              maxLength={3}
              inputMode="numeric"
              value={paymentData.cvc}
              onFocus={() => setPaymentData({ ...paymentData })}
              onChange={(event) =>
                setPaymentData({
                  ...paymentData,
                  cvc: event.target.value,
                  focused: "cvc",
                })
              }
            />
          </Form.Item>
          <Form.Item label="Yüklenecek Bakiye Tutarı" name="balance">
            <InputNumber
              min={0}
              defaultValue={0}
              max={10000}
              className="w-[300px]"
              addonAfter={"₺"}
            />
          </Form.Item>
          <Form.Item className="w-[300px]">
            <Button type="primary" htmlType="submit" className="float-right">
              BAKİYE YÜKLE
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="sm:ml-6">
          <div className="flex flex-row border border-thirdy py-6 justify-center items-center w-[300px]">
            <img src={icons.wallet} alt="" className="w-8 h-8" />
            <div className="ml-6 flex flex-col items-center">
              <h3 className="text-primary text-base font-semibold">
                Mevcut Bakiyem
              </h3>
              <span className="font-mono text-primary text-base">
                {userState.user.balance} ₺
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Balance;
