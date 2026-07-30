(function() {   // Get all elements   const totalEl = document.getElementById('totalBalance');   const setBalanceInput = document.getElementById('setBalanceInput');   const setBalanceBtn = document.getElementById('setBalanceBtn');   const resetBtn = document.getElementById('resetBtn');   const descInput = document.getElementById('descInput');   const amountInput = document.getElementById('amountInput');   const addBtn = document.getElementById('addBtn');   const clearBtn = document.getElementById('clearBtn');   const txList = document.getElementById('txList');   const txCount = document.getElementById('txCount');   const pieSegment = document.getElementById('pieSegment');   const percentageText = document.getElementById('percentageText');   const statusText = document.getElementById('statusText'); 
 
  // State   let transactions = [];   let balance = 0;   let totalBalance = 0; 
 
  // Format money   function formatMoney(amount) {     return '₹ ' + Number(amount); 
  } 
 
 // Update pie chart with colors  function updatePieChart() {    if (totalBalance === 0) {      pieSegment.style.background = '#ecf0f1'; pieSegment.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 
50% 0%)';       percentageText.textContent = '0%';       statusText.textContent = 'Set your balance to start'; 
      return; 
    } 
 
    let totalExpenses = 0;     for (let tx of transactions) {       totalExpenses += tx.amount; 
    } 
 
    const percentage = (totalExpenses / totalBalance) * 100;     const roundedPercentage = Math.min(Math.round(percentage), 100);     percentageText.textContent = roundedPercentage + '%'; 
 
    // Determine color based on percentage 
    let color;     let status; 
     
    if (roundedPercentage < 50) {       // Green - Less than 50%       color = '#2ecc71';       status = '  Good! Less than 50% spent'; 
    } else if (roundedPercentage === 50) { 
      // Orange - Exactly 50%      color = '#f39c12';     status = '  Exactly 50% spent'; 
  } else { 
  // Red - More than 50%   color = '#e74c3c'; 
status = '  Alert! More than 50% spent'; 
}
 
pieSegment.style.background = color; statusText.textContent = status; 
 
    // Update pie chart segment     if (roundedPercentage === 0) { 
      pieSegment.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'; 
    } else if (roundedPercentage <= 50) {       // Show segment up to 50%       const pct = roundedPercentage / 100;       const angle = pct * 360;       const rad = (angle * Math.PI) / 180;       const x = 50 + 50 * Math.sin(rad);       const y = 50 - 50 * Math.cos(rad); 
      pieSegment.style.clipPath = `polygon(50% 50%, 50% 0%, ${x}% ${y}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`; 
    } else { 
      // For > 50%, show full pie 
      pieSegment.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'; 
       
      // Show the actual percentage visually       const pct = roundedPercentage / 100;       const angle = pct * 360;      const rad = (angle * Math.PI) / 180;      const x = 50 + 50 * Math.sin(rad);      const y = 50 - 50 * Math.cos(rad); 
      
     // For > 50%, we need to show from 0 to the angle 
if (roundedPercentage < 100) {      // Keep full pie visible with the color 
      pieSegment.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'; 
      } 
    } 
  } 
 
  // Update display   function updateDisplay() {     // Update balance     totalEl.textContent = formatMoney(balance); 
     
    // Update transaction list     txList.innerHTML = ''; 
     
    if (transactions.length === 0) {       const li = document.createElement('li');       li.className = 'empty-item';       li.innerHTML = '<i class="fas fa-receipt"></i> No transactions yet';       txList.appendChild(li);       txCount.textContent = '0';       updatePieChart(); 
      return; 
    } 
     
   // Show transactions (newest first)   const sorted = [...transactions].reverse();   for (let tx of sorted) {   const li = document.createElement('li'); const desc = document.createElement('span');  desc.className = 'tx-desc';   desc.innerHTML = `<i class="fas fa-utensils"></i> ${escapeHtml(tx.description)}`; 
   
  const amount = document.createElement('span');       amount.className = 'tx-amount';       amount.textContent = formatMoney(tx.amount); 
       
      const delBtn = document.createElement('button');       delBtn.className = 'tx-delete';       delBtn.innerHTML = '<i class="fas fa-times"></i>';       delBtn.onclick = function() {         deleteTransaction(tx.id); 
      }; 
       
      li.appendChild(desc);       li.appendChild(amount);       li.appendChild(delBtn);       txList.appendChild(li); 
    } 
     
    txCount.textContent = transactions.length;     updatePieChart(); 
  } 
 
  function escapeHtml(text) {   const div = document.createElement('div');   div.textContent = text;   return div.innerHTML; 
} 
// Set balance function setBalance() {   const val = parseFloat(setBalanceInput.value); 
   
  if (isNaN(val) || val < 0) {       alert('Please enter a valid positive number.');       return; 
    } 
     
    // Calculate total expenses     let totalExpenses = 0;     for (let tx of transactions) {       totalExpenses += tx.amount; 
    } 
     
    if (val < totalExpenses) { 
      alert(`Cannot set balance lower than total expenses (${formatMoney(totalExpenses)}). Clear transactions first.`);       return; 
    } 
     
    balance = val;     totalBalance = val;     updateDisplay();     setBalanceInput.value = ''; 
  } 
// Add expense function addExpense() { const desc = descInput.value.trim(); const amount = parseFloat(amountInput.value); if (desc === '') {   alert('Please enter a description.');   return; 
} 
     
    if (isNaN(amount) || amount <= 0) {       alert('Please enter a valid positive amount.'); 
      return; 
    } 
     
    if (balance === 0) {       alert('Please set your balance first!');       return; 
    } 
     
    if (amount > balance) {       alert(`Insufficient balance! Current balance is ${formatMoney(balance)}.`); 
      return; 
    } 
     
    // Add transaction 
    const tx = {       id: Date.now(),       description: desc,       amount: amount 
  }; 
   
  transactions.push(tx);   balance = balance - amount; updateDisplay(); 
 
 // Clear inputs   descInput.value = '';   amountInput.value = '';     descInput.focus(); 
  } 
 
  // Delete transaction   function deleteTransaction(id) {     for (let i = 0; i < transactions.length; i++) {       if (transactions[i].id === id) {         const tx = transactions[i];         balance = balance + tx.amount;         transactions.splice(i, 1);         updateDisplay();         break; 
      } 
    } 
  } 
 
  // Clear all transactions   function clearAll() {     if (transactions.length === 0) return; 
     
    if (confirm('Delete all transactions?')) {     // Add back all expenses to balance 
    for (let tx of transactions) {       balance = balance + tx.amount; 
    } 
  transactions = []; 
 updateDisplay(); 
} 
}
// Reset everything 
  function resetAll() {     if (transactions.length > 0) {       if (!confirm('Reset everything?')) return; 
    } 
    transactions = [];     balance = 0;     totalBalance = 0;     setBalanceInput.value = '';     descInput.value = '';     amountInput.value = '';     updateDisplay(); 
  } 
 
  // Event listeners   setBalanceBtn.addEventListener('click', setBalance);   resetBtn.addEventListener('click', resetAll);   addBtn.addEventListener('click', addExpense);   clearBtn.addEventListener('click', clearAll); 
 
  // Enter key support   setBalanceInput.addEventListener('keypress', function(e) {   if (e.key === 'Enter') setBalance(); 
}); 
 
descInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') addExpense(); 
}); 
 
  amountInput.addEventListener('keypress', function(e) {     if (e.key === 'Enter') addExpense(); 
  }); 
 
  // Initialize 
  updateDisplay(); 
 
})(); 
 
