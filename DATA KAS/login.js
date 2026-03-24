// --- LOGIKA TOMBOL MATA (Toggle Password Visibility) ---
const togglePassword = document.getElementById('togglePassword');
const passInput = document.getElementById('p_kredensial');

// Pastikan elemen ada sebelum menambahkan event listener
if (togglePassword && passInput) {
    togglePassword.addEventListener('click', function () {
        // Ganti tipe input antara 'password' dan 'text'
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);

        // Ganti ikon mata
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// --- LOGIKA FORM LOGIN ---
// Dapatkan elemen form, tombol login, input user, input password, dan label error
const loginForm = document.getElementById("loginForm");
const btnLogin = document.getElementById("btnLogin");
const userInput = document.getElementById("u_identiti");
const passInputLogin = document.getElementById("p_kredensial"); // Gunakan nama variabel berbeda agar tidak bentrok dengan passInput di atas
const errorLabel = document.getElementById("errorMessage");

// Pastikan semua elemen form ada sebelum menambahkan event listener
if (loginForm && btnLogin && userInput && passInputLogin && errorLabel) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Mencegah form melakukan submit default (reload halaman)

        const userIn = userInput.value.trim(); // Ambil nilai username dan hapus spasi di awal/akhir
        const passIn = passInputLogin.value;   // Ambil nilai password

        // Tampilkan efek loading pada tombol
        btnLogin.innerText = "Mengecek...";
        btnLogin.style.opacity = "0.7";
        btnLogin.disabled = true; // Nonaktifkan tombol agar tidak bisa diklik lagi saat loading

        // Simulasi delay untuk proses pengecekan (seperti koneksi ke server)
        setTimeout(() => {
            // --- Simulasi Data Akun ---
            // Dalam aplikasi nyata, data ini HARUS diambil dari backend/database yang aman.
            // Menyimpan kredensial di sisi klien sangat TIDAK AMAN.

            // 1. Definisi Akun Admin Utama (Hak Akses Penuh)
            const adminUser = "Admin@45";
            const adminPass = "Perbankan@454";
            const adminRole = "admin";

            // 2. Definisi Akun Tamu (Hanya Lihat)
            const guestUser = "Guest45";
            const guestPass = "Perbankan$45";
            const guestRole = "user";

            // Ambil data yang mungkin tersimpan sebelumnya (simulasi register)
            // Ini juga TIDAK AMAN untuk menyimpan password di localStorage.
            const savedUser = localStorage.getItem("db_user");
            const savedPass = localStorage.getItem("db_pass");
            const savedRole = localStorage.getItem("db_role");

            let loginSuccess = false;
            let userRole = "";

            // --- Logika Pengecekan Kredensial ---
            if (userIn === adminUser && passIn === adminPass) {
                // Login sebagai Admin
                sessionStorage.setItem("current_user", adminUser);
                sessionStorage.setItem("current_role", adminRole);
                loginSuccess = true;
                userRole = adminRole;
            }
            else if (userIn === guestUser && passIn === guestPass) {
                // Login sebagai Tamu
                sessionStorage.setItem("current_user", guestUser);
                sessionStorage.setItem("current_role", guestRole);
                loginSuccess = true;
                userRole = guestRole;
            }
            // Cek login dari data yang tersimpan (simulasi)
            else if (savedUser && savedPass && userIn === savedUser && passIn === savedPass) {
                sessionStorage.setItem("current_user", savedUser);
                sessionStorage.setItem("current_role", savedRole);
                loginSuccess = true;
                userRole = savedRole;
            }

            // --- Hasil Pengecekan ---
            if (loginSuccess) {
                // Jika login berhasil, arahkan ke halaman dashboard
                window.location.href = "dashboard.html";
            } else {
                // Jika login gagal
                errorLabel.style.display = "block"; // Tampilkan pesan error
                userInput.value = ""; // Kosongkan input username
                passInputLogin.value = ""; // Kosongkan input password
                btnLogin.innerText = "Masuk Sekarang"; // Kembalikan teks tombol
                btnLogin.style.opacity = "1"; // Kembalikan opacity tombol
                btnLogin.disabled = false; // Aktifkan kembali tombol
                
                // Jika menggunakan toggle password, pastikan ikon kembali ke default
                if (togglePassword && togglePassword.classList.contains('fa-eye-slash')) {
                    togglePassword.classList.toggle('fa-eye');
                    togglePassword.classList.toggle('fa-eye-slash');
                }
            }
        }, 600); // Simulasi delay 600 milidetik
    });
} else {
    console.error("Beberapa elemen form login tidak ditemukan. Pastikan ID di HTML sudah benar.");
}