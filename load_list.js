const agendaTable = document.querySelector("#agenda tbody");
const searchInput = document.querySelector("#searchInput");

const CONTACTS = [
];

function search_contacts({key, contacts}) {
  const contactsFiltered = contacts
    .filter((item) => {
      const {name, tel} = item;

      if (name.toLocaleUpperCase().includes(key) || tel.includes(key)) {
        return item;
      }
    });

  load_contacts({contacts: contactsFiltered});

}

function load_contacts({contacts}) {
  agendaTable.innerHTML = "";

  if (contacts.length != 0) {
    const groups = Object.entries(contacts
      .reduce((p, c) => {
        let firstLetter = c.name.slice(0, 1).toLocaleUpperCase();
        
        if (p[firstLetter]){
          p[firstLetter].push(c);
        } else {
          p[firstLetter] = [c];
        }
        return p;
      }, []))
    
    groups.sort().map((i) => {
      const groupName = i[0];
      const groupData = i[1];
      
      agendaTable.innerHTML += `
        <tr>
          <th colspan="2">
            ${groupName}
          </th>
        </tr>
        ${
          groupData.reduce((p, contact) => {
            const {name, tel} = contact;
  
            p += `
              <tr>
                <td>
                  ${name}
                </td>
                <td>
                  ${tel}
                </td>
              </tr>
            `
            return p;
          }, '')
        }
      `
    })
  } else {
    agendaTable.innerHTML += `
      <tr>
        <th colspan="2">
          Nada por aqui....
        </th>
      </tr>
    `;
  }
}

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLocaleUpperCase();
  search_contacts({key: value, contacts: CONTACTS});
})

load_contacts({contacts: CONTACTS});