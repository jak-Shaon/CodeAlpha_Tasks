document.getElementById('ageForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
  
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';
  
    if (!day || !month || !year) {
      errorMessage.innerText = 'Please enter a valid date of birth';
      return;
    }
  
    if (day < 1 || day > 31) {
      errorMessage.innerText = 'Invalid day. Enter between 1 and 31.';
      return;
    }
  
    if (month < 1 || month > 12) {
      errorMessage.innerText = 'Invalid month. Enter between 1 and 12.';
      return;
    }
  
    const today = new Date();
    let age = today.getFullYear() - year;
    const birthDate = new Date(year, month - 1, day);
  
    if (today < birthDate) {
      errorMessage.innerText = 'A future date. Enter valid date of birth.';
      return;
    }
  
    const monthDifference = today.getMonth() - (month - 1);
    const dayDifference = today.getDate() - day;
  
    // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  document.getElementById('result').innerText = `You are ${age} years old.`;
});