const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

$(".my-register-validation").submit(async function () {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nickname = document.getElementById("nickname").value;
  const mbti = document.getElementById("mbti").value;
  const movie = document.getElementById("movie").value;
  const music = document.getElementById("music").value;

  const is_mint = $(":input:radio[name=is_mint]:checked").val();
  const is_boumeok = $(":input:radio[name=is_boumeok]:checked").val();
  const is_earlybird = $(":input:radio[name=is_earlybird]:checked").val();
  const like_drink = $(":input:radio[name=like_drink]:checked").val();

  //const is_boumeok = document.getElementsByName("is_boumeok").value;
  //const is_earlybird = document.getElementsByName("is_earlybird").value;
  //const like_drink = document.getElementsByName("like_drink").value;

  const area = document.getElementById("location").value;

  const school = document.getElementById("school").value;

  const img = await toBase64(
    document.querySelector("input[type=file]").files[0]
  );

  const data = {
    userid: email,
    password: password,
    nickname: nickname,
    mbti: mbti,
    movie: movie,
    music: music,
    location: area,
    is_mint: is_mint,
    is_boumeok: is_boumeok,
    is_earlybird: is_earlybird,
    like_drink: like_drink,
    schoolname: school,
	  image : img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
  };

  const url = "/api/login/signup";

  fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (response !== null) {
      alert("회원가입에 성공했습니다.");
      window.location.href = "login.html";
    } else {
      alert("회원가입에 실패했습니다.");
    }
	});
});
