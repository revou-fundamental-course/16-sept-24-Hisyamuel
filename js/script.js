// Ini Javascript 2 //

// Kata Sambutan //

replaceName();

function replaceName() {
  let name = prompt('Masukkan nama Anda');
  console.log(name);
  document.getElementById('user-name').innerHTML = name;
}

// Form //

const form = document.getElementById('messageForm');
form.addEventListener('submit'), function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const birth = document.getElementById('birth').value;
  const gender = document.getElementById('gender').value;
  const message = document.getElementById('message').value;

  if (!name || !birth || !gender || !message) {
      alert('Pesan Harus Terisi');
      return;
  }

  // Output Form //

  const formOutput = document.getElementById('formOutput'); 
    formOutput.value = 
        Name ; {name}
        Birth ; {birth}
        Gender ; {gender}
        Message ; {message}
    ;
    
  document.getElementById('moreInfoBtn').addEventListener('click', function() {
      const moreInfo = document.getElementById('moreInfo');
      if (moreInfo.style.display === 'none') {
          moreInfo.style.display = 'block';
          this.textContent = 'Sembunyikan Info';
      } else {
          moreInfo.style.display = 'none';
          this.textContent = 'Lebih banyak Info';
      }
  });

  if (!name || !birth || !gender || !message) {
      alert('Pesan Harus Terisi');
      return;
  }
}
  

