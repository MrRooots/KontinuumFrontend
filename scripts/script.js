const numbers = /[0-9]/g;
const lowercaseLetters = /[a-z]/g;
const uppercaseLetters = /[A-Z]/g;
const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g;
const text = ['Я забыл пароль', 'Я вспомнил пароль'];

// Change form fields and link text
function onFormLinkClick() {
  var link = document.querySelector('.formRemember');
  var phoneInput = document.querySelector('.passwordInput');
  var nameInput = document.querySelector('.nameInput');
  var hiddenInput = document.querySelector('.hiddenInput')

  // Change link text
  if (link.innerHTML.trim() == text[0]) {
    link.innerHTML = text[1];
    hiddenInput.value = 0
  } else {
    link.innerHTML = text[0];
    hiddenInput.value = 1
  }

  // Swap input fields and clear errors
  document.getElementById('validationContainerErrors').innerHTML = '';
  phoneInput.classList.toggle('--Hidden')
  nameInput.classList.toggle('--Hidden')
}


// +7 (902) 448-15-45
// 89024481545
// 8902 -> +7 (902)
// Live phone formatter
function formatPhoneNumber(value) {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength <= 4) {
    return phoneNumber;
  } else if (phoneNumberLength <= 7) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}`;
  } else if (phoneNumberLength <= 9) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}`;
  } else {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  }
}

// Format phone number while typing
function phoneNumberFormatter() {
  const inputField = document.getElementById('phoneNumber');
  const formattedInputValue = formatPhoneNumber(inputField.value);
  inputField.value = formattedInputValue;
}


// Validate password input
function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordLength = password.length;
  const errors = document.getElementById('validationContainerErrors');


  if (passwordLength < 8) {
    errors.innerHTML = 'Пароль слишком короткий!';
  } else if (!password.match(numbers)) {
    errors.innerHTML = 'Пароль должен содержать цифры!';
  } else if (!password.match(lowercaseLetters)) {
    errors.innerHTML = 'Пароль должен содержать прописные буквы!';
  } else if (!password.match(uppercaseLetters)) {
    errors.innerHTML = 'Пароль должен содержать заглавные буквы!';
  } else {
    errors.innerHTML = '';
    return true;
  }
}

// Validate phone number
function validatePhoneNumber() {
  const phone = document.getElementById('phoneNumber').value.replace(/[^\d]/g, '');
  const errors = document.getElementById('validationContainerErrors');

  if (phone.match(phoneRegex)) {
    errors.innerHTML = '';
    return true;
  } else {
    errors.innerHTML = 'Неверный номер телефона!';
  }
}

// Validate student initials
function validateStudent() {
  const student = document.getElementById('student').value;
  const errors = document.getElementById('validationContainerErrors');
  const letters = /^[a-zA-Z]+$/;
  var initials = student.split(' ');

  if (initials.length != 2) {
    errors.innerHTML = 'Введите имя и фамилию!';
  } else {
    var name = initials[0];
    var surname = initials[1];

    if (name.match(letters) && surname.match(letters)) {
      errors.innerHTML = '';
      return true;
    } else {
      errors.innerHTML = 'Неверный формат!';
    }
  }
}

// Validate form for any errors { form fields validator onSubmit }
function validateForm() {
  if (validatePhoneNumber() && (validatePassword() || validateStudent())) {
    alert('Logged In!');
    return true;
  } else {
    alert('Failed!');
    return false;
  }
}
