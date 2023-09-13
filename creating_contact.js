const newContactBtn = document.querySelector("#newContact");
const searchForm = document.querySelector("#search");
const creatingForm = document.querySelector("#creating");

let creatingFormIsActivated = false;

function view_creating_form() {
  const asideContainer = document.querySelector("aside .container > div");
  const btn = document.querySelector("#newContact");

  const searchFormHeight = searchForm.clientHeight;
  const creatingFormHeight = creatingForm.clientHeight;

  if (creatingFormIsActivated) {
    searchForm.style.top = `-${searchFormHeight}px`;
    creatingForm.style.bottom = `${searchFormHeight}px`;
    asideContainer.style.height = `${creatingFormHeight}px`;
    btn.style.cssText = "transform: rotate(135deg)";

    creatingFormIsActivated = false;
  } else {
    searchForm.style.top = `0px`;
    creatingForm.style.bottom = `-${searchFormHeight}px`;
    asideContainer.style.height = `${searchFormHeight}px`;
    btn.style.cssText = "transform: rotate(0deg)";

    creatingFormIsActivated = true;
  }
}

newContactBtn.addEventListener("click", () => {
  view_creating_form();
})

creatingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const name = e.target[0].value;
  const tel = e.target[1].value;

  const contactExist = CONTACTS
    .map((i) => i.tel)
    .includes(tel);
  const telIsValid = tel.length >= 8;

  if (!telIsValid) {
    alert("O telefone digitado não é um telefone valido!");
  }else if (!contactExist) {
    CONTACTS.push({
      name: name,
      tel: tel,
    });

    load_contacts({contacts: CONTACTS});
    view_creating_form();
    form.reset();
    searchForm.reset();
  } else {
    alert("Este contato já está na sua agenda!");
  }
})

creatingForm.style.display = "flex";
view_creating_form();