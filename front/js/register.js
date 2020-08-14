
	$(".my-register-validation").submit(function () {
		// let values = ($(this).serializeArray());
		// for (let value of values) {
		// 	alert(value);
		// }
		// event.preventDefault();
        const mbti = document.getElementById('mbti').value;
        const movie = document.getElementById('movie').value;
        const music = document.getElementById('music').value;
        const is_mint = document.getElementsByName('is_mint').value;
        const is_boumeok = document.getElementsByName('is_boumeok').value;
        const is_earlybird = document.getElementsByName('is_earlybird').value;
        const like_drink = document.getElementsByName('like_drink').value;
		const location = document.getElementById('location').value;
		const image = document.querySelector('input[type=file]').files[0];
		// while(1);
		//real-input

        const data = { user_id: email, user_pwd: password, mbti: mbti,
        movie: movie, music: music, is_mint: is_mint, is_boumeok: is_boumeok,
        is_earlybird: is_earlybird, like_drink:like_drink, location: location};

        const url = '/api/login/signup';
        
		fetch(`${url}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(response => {
				console.log(response);
				if(response !== null) {
					// 성공
					//localStorage.setItem('token', response);
					location.href="main.html";
				}
				else {
					alert("회원가입에 실패했습니다.")
				}
			});
	});

