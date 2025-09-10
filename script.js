// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")

const totalExpenses = document.querySelector("aside header p span")

//usar regex para n aceitar letras no input amount. replace para quando tiver letras ele troca por valores vazios.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")

  //transformar a string em numero, depois em centavos dividindo por 100
  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
};

function formatCurrencyBRL(value) {
  //Formata o valor no padrao BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  event.preventDefault() 

  // Cria um objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  // Chama a função que vai adicionar o item na lista.
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar na lista na (ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Criar a img para adicionar o icone
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Criar div expense-info
    const expenseDiv = document.createElement("div")
    expenseDiv.classList.add("expense-info")

    //Adicionar o nome(strong) e categoria(span)
    const expenseStrong = document.createElement("strong")
    expenseStrong.textContent = newExpense.expense

    const expenseSpan = document.createElement("span")
    expenseSpan.textContent = newExpense.category_name

    //Criar span de valor
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.textContent = newExpense.amount

    //Criar icone de exclusão
    const removeIcon = document.createElement("img")
    removeIcon.setAttribute("src", `img/remove.svg`)
    removeIcon.setAttribute("alt", "remover")
    removeIcon.classList.add("remove-icon")

    //Adicionar strong e span dentro da div
    expenseDiv.append(expenseStrong, expenseSpan)

    //Adicionar as informaçöes no item.
    expenseItem.append(expenseIcon, expenseDiv, expenseAmount, removeIcon)

    //Adiciona o item na lista
    expenseList.append(expenseItem)

    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  }
}

// Atualizar o valor total das despesas
function updateTotals() {
  try{
    const total = expenseList.children
    totalExpenses.textContent = `${total.length} ${total.length > 1 ? "despesas" : "despesa"}`
    console.log(total)

  }catch{
    console.log(error)
    alert("Não foi posssível atualizar os totais")
  }
}
