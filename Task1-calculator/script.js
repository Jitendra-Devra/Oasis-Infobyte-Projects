
document.addEventListener('DOMContentLoaded', () => {
    const operationScreen = document.getElementById('operation-screen');
    const resultScreen = document.getElementById('result-screen');
    let currentOperation = '', result = '', shouldResetScreen = false;
  
    const updateScreens = () => {
      operationScreen.textContent = currentOperation;
      resultScreen.textContent = result;
    };
  
    const handleNumber = (number) => {
      if (shouldResetScreen) result = '', shouldResetScreen = false;
      result += number;
      updateScreens();
    };
  
    const handleOperator = (operator) => {
      if (result === '' && operator !== '-') return;
      currentOperation += shouldResetScreen ? result + ' ' + operator + ' ' : result + ' ' + operator + ' ';
      result = '', shouldResetScreen = false;
      updateScreens();
    };
  
    const clear = () => {
      currentOperation = result = '';
      updateScreens();
    };
  
    const deleteLast = () => {
      result = result.slice(0, -1);
      updateScreens();
    };
  
    const compute = () => {
      try {
        currentOperation += result;
        result = eval(currentOperation);
        shouldResetScreen = true;
        updateScreens();
      } catch {
        result = 'Error';
        updateScreens();
      }
    };
  
    document.querySelectorAll('.key').forEach(key => {
      key.addEventListener('click', () => {
        const { action } = key.dataset;
        if (!action) handleNumber(key.textContent);
        else if (action === 'clear') clear();
        else if (action === 'delete') deleteLast();
        else if (['divide', 'multiply', 'subtract', 'add', 'modulo'].includes(action)) handleOperator(key.textContent);
        else if (action === 'equal') compute();
      });
    });
  });
  