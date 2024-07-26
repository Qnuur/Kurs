import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Input from './Input';
import { useState } from 'react';
import { getFormattedDate } from '../helper/date';

export default function CourseForm({
cancelHandler,
onSubmit,
buttonLabel,
defaultValues,

}) {
    // input değerlerini ve geçerlilik durumlarını tutan state tanımlaması
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '', // Miktar değeri varsa onu kullan, yoksa boş string
            isValid: true, // Varsayılan olarak miktarın geçerli olduğunu varsayar
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '', // Tarih değeri varsa formatlanmış haliyle kullan, yoksa boş string
            isValid: true, // Varsayılan olarak tarihin geçerli olduğunu varsayar
        },
        description: {
            value: defaultValues ? defaultValues.description : '', // Açıklama değeri varsa onu kullan, yoksa boş string
            isValid: true, // Varsayılan olarak açıklamanın geçerli olduğunu varsayar
        },
    });

    function addOrUpdateHandler() {
        // formdan alınan verilerle yeni kurs verisi oluşturulması
        const courseData = {
            amount: Number(inputs.amount.value), // Miktar değeri sayıya dönüştürülür
            date: new Date(inputs.date.value), // Tarih değeri Date objesine dönüştürülür
            description: inputs.description.value // Açıklama değeri direkt alınır
        };
        console.log(courseData);

        // Girdi değerlerinin geçerlilik kontrolü
        const amountIsValid = courseData.amount > 0; // Miktarın pozitif olup olmadığını kontrol eder
        const dateIsValid = courseData.date.toString() !== 'Invalid Date'; // Tarihin geçerli olup olmadığını kontrol eder
        const descriptionIsValid = courseData.description.trim().length > 0; // Açıklamanın boş olup olmadığını kontrol eder
        // trim() metodu, stringin başındaki ve sonundaki boşlukları kaldırır
        // Böylece yalnızca boşluklardan oluşan açıklamaların geçersiz sayılması sağlanır

        // Eğer herhangi bir giriş geçerli değilse, ilgili alanı güncelleyerek kullanıcıya uyarı gösterir
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInputs) => {
                return {
                    amount: {
                        value: Number(currentInputs.amount.value), // Mevcut miktar değeri
                        isValid: amountIsValid, // Miktarın geçerliliği
                    },
                    date: {
                        value: currentInputs.date.value, // Mevcut tarih değeri
                        isValid: dateIsValid // Tarihin geçerliliği
                    },
                    description: {
                        value: currentInputs.description.value, // Mevcut açıklama değeri
                        isValid: descriptionIsValid, // Açıklamanın geçerliliği
                    },
                };
            });
        return;
    }
    onSubmit(courseData)
  }
    console.log(inputs);
    function inputChange(inputIdentifier, enteredValue) {
        setInputs((currentInput) => {
            return {
                // ...currentInput: Mevcut state değerlerini kopyalar.
                // Böylece, mevcut state'teki diğer alanlar kaybolmaz ve
                // sadece güncellenmek istenen alan değiştirilir.
                ...currentInput, 

                // [inputIdentifier]: enteredValue
                // inputIdentifier değişkeni, güncellenmek istenen alanın adıdır.
                // Örneğin, 'amount', 'date' veya 'description'.
                // enteredValue ise bu alana girilen yeni değerdir.
                [inputIdentifier]: {value:enteredValue,isValid:true} ,
            };
        });
    }
    return (
       <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          style={styles.flexAll}
          label="Tutar"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChange.bind(this, 'amount'),
            value: inputs.amount.value.toString(),
                    // .bind(this, 'amount'): inputChange fonksiyonunu belirli bir bağlam (this) ve
                    // varsayılan argüman ('amount') ile çağırır. Bu, fonksiyonun içinde
                    // 'this' ifadesinin bileşeni (veya fonksiyonu) işaret etmesini sağlar
                    // ve 'amount' argümanı inputChange fonksiyonuna otomatik olarak geçilir.
                }}
            />
            <Input
                style={styles.flexAll}
                label="Tarih"
                invalid={!inputs.date.isValid}
                textInputConfig={{
                placeHolder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChange.bind(this, 'date'),
                value: inputs.date.value,
                }}
            />
            </View>
            <Input
                label="Başlık"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                onChangeText: inputChange.bind(this, 'description'),
                value: inputs.description.value,
                }}
            />
       <View style={styles.error}>
        {!inputs.amount.isValid && (
          <Text>Lütfen tutarı doğru formatta giriniz</Text>
        )}
        {!inputs.date.isValid && (
          <Text>Lütfen tarihi doğru formatta giriniz</Text>
        )}
        {!inputs.description.isValid && (
          <Text>Lütfen başlığı doğru formatta giriniz</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={cancelHandler}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>İptal Et</Text>
          </View>
        </Pressable>
        <Pressable onPress={addOrUpdateHandler}>
          <View style={styles.addOrDelete}>
            <Text style={styles.addOrDeleteText}>{buttonLabel}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginVertical: 20,
  },
  priceAndDate: {
    flexDirection: 'row',
  },
  flexAll: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancel: {
    backgroundColor: 'red',
    minWidth: 120,
    marginRight: 10,
    padding: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
  },
  addOrDelete: {
    backgroundColor: 'blue',
    minWidth: 120,
    marginRight: 10,
    padding: 8,
    alignItems: 'center',
  },
  addOrDeleteText: {
    color: 'white',
  },
  error: {
    alignItems: 'center',
    marginBottom: 10,
  },
});