
window.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".media-container");
  if (!container) return;

  const uploads = JSON.parse(localStorage.getItem("uploads") || "[]");

  if (uploads.length === 0) {
    container.innerHTML = "<p style='color: white;'>Belum ada foto atau video.</p>";
    return;
  }

  container.innerHTML = "";

  uploads.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("media-item");

    const menuBtn = document.createElement("div");
    menuBtn.classList.add("media-menu");
    menuBtn.innerHTML = "⋮";

    const menuList = document.createElement("div");
    menuList.classList.add("media-menu-content");
    menuList.innerHTML = `
      <button onclick="editItem(${index})">Edit</button>
      <button onclick="deleteItem(${index})">Hapus</button>
    `;

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuList.classList.toggle("show");
    });

    const title = document.createElement("h3");
    title.textContent = item.judul;

    const desc = document.createElement("p");
    desc.textContent = item.deskripsi;

    let media;
    if (item.type.startsWith("image/")) {
      media = document.createElement("img");
      media.src = item.file;
      media.alt = item.judul;
    } else if (item.type.startsWith("video/")) {
      media = document.createElement("video");
      media.src = item.file;
      media.controls = true;
    }

    wrapper.appendChild(menuBtn);
    wrapper.appendChild(menuList);
    wrapper.appendChild(title);
    wrapper.appendChild(media);
    wrapper.appendChild(desc);

    container.appendChild(wrapper);
  });

  window.editItem = function(index) {
    const uploads = JSON.parse(localStorage.getItem("uploads") || "[]");
    const item = uploads[index];
    const newTitle = prompt("Edit Judul", item.judul);
    const newDesc = prompt("Edit Deskripsi", item.deskripsi);
    if (newTitle !== null && newDesc !== null) {
      item.judul = newTitle;
      item.deskripsi = newDesc;
      uploads[index] = item;
      localStorage.setItem("uploads", JSON.stringify(uploads));
      location.reload();
    }
  };

  window.deleteItem = function(index) {
    if (confirm("Yakin ingin menghapus item ini?")) {
      let uploads = JSON.parse(localStorage.getItem("uploads") || "[]");
      uploads.splice(index, 1);
      localStorage.setItem("uploads", JSON.stringify(uploads));
      location.reload();
    }
  };

  document.body.addEventListener("click", () => {
    document.querySelectorAll(".media-menu-content.show").forEach(menu => menu.classList.remove("show"));
  });
});

const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
